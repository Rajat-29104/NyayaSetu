import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const NODE_ENV = process.env.NODE_ENV || 'development';
const MAX_MESSAGE_LENGTH = 2000;
const AI_TIMEOUT_MS = 15000;

// Deploying behind a platform proxy (Render/Railway/etc) needs this
// so req.ip reflects the real client IP for rate limiting.
app.set('trust proxy', 1);

// ── Basic security headers (no extra dependency needed) ──────
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
  next();
});

app.use(express.json({ limit: '64kb' }));
app.use(express.static(__dirname));

// ── Minimal in-memory rate limiter for /api/chat ──────────────
// Fine for a single-instance hackathon deployment. For multi-instance
// production, swap this for a shared store (Redis, etc).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 12;
const hitLog = new Map();

function rateLimit(req, res, next) {
  const key = req.ip || 'unknown';
  const now = Date.now();
  const timestamps = (hitLog.get(key) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
  }
  timestamps.push(now);
  hitLog.set(key, timestamps);
  next();
}

// Periodically clear stale rate-limit entries so the map doesn't grow forever
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamps] of hitLog.entries()) {
    const fresh = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length) hitLog.set(key, fresh);
    else hitLog.delete(key);
  }
}, RATE_LIMIT_WINDOW_MS).unref();

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(GEMINI_API_KEY), model: GEMINI_MODEL, env: NODE_ENV });
});

app.post('/api/chat', rateLimit, async (req, res) => {
  const rawMessage = req.body?.message;
  if (typeof rawMessage !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }
  const message = rawMessage.trim();
  if (!message) return res.status(400).json({ error: 'Message is required.' });
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(413).json({ error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).` });
  }
  if (!GEMINI_API_KEY) {
    return res.status(503).json({ error: 'AI is not configured. Add GEMINI_API_KEY to .env.' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: 'You are NyayaSetu, a civic and legal information assistant for India. Give concise, practical, non-alarmist guidance. Clearly distinguish general information from legal advice. Prefer official Indian government portals when suggesting next steps. Do not claim to be a government authority.' }]
        },
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: { maxOutputTokens: 700 }
      })
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      const detail = data?.error?.message || 'Gemini request failed.';
      // Never leak the API key or raw upstream body to the client.
      return res.status(upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502)
        .json({ error: detail });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('')?.trim();
    if (!reply) return res.status(502).json({ error: 'The AI returned an empty response.' });
    res.json({ reply });
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('AI proxy timeout for message length', message.length);
      return res.status(504).json({ error: 'The AI took too long to respond. Please try again.' });
    }
    console.error('AI proxy error:', error);
    res.status(502).json({ error: 'Could not reach the AI service.' });
  } finally {
    clearTimeout(timeout);
  }
});

// Fallback: unknown API routes get a clean JSON 404 instead of an HTML page
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NyayaSetu running on port ${PORT}`);
});
  if (!GEMINI_API_KEY) {
    console.warn('⚠️  GEMINI_API_KEY is not set — /api/chat will return 503 until it is configured.');
  }
});
