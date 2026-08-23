# NyayaSetu — AI Civic & Legal Empowerment

A deploy-ready civic-tech app for scheme eligibility, rights navigation, RTI drafting, grievance routing, helplines, and a Gemini-powered conversational AI assistant.

## Project structure

- `index.html` — application shell and page panels
- `style.css` — design system, responsive layout, motion
- `data.js` — civic scheme/portal/knowledge data
- `ui.js` — application logic, navigation, eligibility engine, RTI generator, AI client
- `server.js` — secure Gemini API proxy (rate-limited, timeout-protected)
- `.env.example` — environment configuration template
- `package.json` — Node/Express runtime

## Run locally

1. Install Node.js 18+
2. Copy `.env.example` to `.env`
3. Put your Gemini API key ([aistudio.google.com](https://aistudio.google.com/app/apikey)) in `GEMINI_API_KEY`
4. Run `npm install`
5. Run `npm start`
6. Open `http://localhost:3000`

The browser never receives the API key — all Gemini calls go through `/api/chat` on the server.

> **Note on the model name:** this project previously pinned `GEMINI_MODEL=gemini-3.6-flash`, which isn't a model name that can be verified as of this update. The default has been changed to `gemini-2.5-flash`, a known, currently available model. Check your Google AI Studio console for the latest model name and update `GEMINI_MODEL` in `.env` if a newer one is available to you.

## Deploying (Render, Railway, or any Node host)

These steps apply to any platform that runs `npm install` + `npm start` (Render, Railway, Fly.io, a VM, etc.):

1. Push this project to a GitHub repo (`.env` is git-ignored — never commit it).
2. Create a new **Web Service** on your platform, pointing at the repo.
3. Build command: `npm install`  ·  Start command: `npm start`
4. Add environment variables in the platform's dashboard (not in code):
   - `GEMINI_API_KEY` — your real key
   - `GEMINI_MODEL` — e.g. `gemini-3.6-flash`
   - `NODE_ENV` — `production`
   - `PORT` — most platforms set this automatically; the app reads `process.env.PORT`
5. Deploy. The app serves both the frontend and `/api/chat` from the same Express server, so there's no separate frontend deployment step and no CORS setup needed.
6. Visit `/api/health` on your deployed URL to confirm `aiConfigured: true`.

## What changed in this pass

- Fixed the Scheme Eligibility form and RTI Drafting form referencing fields that didn't exist in the page (both were silently breaking on click).
- Added a request timeout, duplicate-submit guard, offline detection, and a retry button to the AI chat.
- Added a lightweight in-memory rate limiter, request timeout, and basic security headers to `/api/chat` on the backend — no new dependencies.
- Removed dead/unused JS (a document-guide feature with no matching page).
- Added keyboard access (Tab + Enter) and screen-reader labels to clickable cards, nav items, and the chat log.
- Cleaned up `.env.example` and documented deployment steps above.

## Important

If the API key that was previously embedded anywhere in frontend source was a real key, revoke and regenerate it — frontend source is public to every browser visitor.

## Upgrade path

The frontend is intentionally kept close to the original design. The API layer is separated so authentication, per-user rate limiting, logging, a real database, and official-data ingestion can be added later without rewriting the UI.
