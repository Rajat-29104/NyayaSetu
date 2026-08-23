// ================================================
// CivicSahayak — ui.js
// Logic Engine & API Integration
// ================================================

// ── 1. SCHEME ELIGIBILITY ENGINE ─────────────────
function runEligibility() {
  const cat = document.getElementById('e-cat').value;
  const gen = document.getElementById('e-gen').value;
  const income = document.getElementById('e-income').value;
  const edu = document.getElementById('e-edu').value;
  const dis = document.getElementById('e-dis').value;

  if (!cat && !gen) {
    alert('Please fill at least Category or Gender to proceed.');
    return;
  }

  const matches = schemeDB.filter(s => {
    const n = s.need;
    if (n.cats && cat && !n.cats.includes(cat)) return false;
    if (n.gen && gen && !n.gen.includes(gen)) return false;
    if (n.income && income && !n.income.includes(income)) return false;
    if (n.edu && edu && !n.edu.includes(edu)) return false;
    if (n.dis && dis && dis !== 'none' && !n.dis.includes(dis)) return false;
    return true;
  });

  const g = document.getElementById('er-grid');
  document.getElementById('er-cnt').textContent = `${matches.length} schemes found`;
  
  if (!matches.length) {
    g.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--t3);">No schemes matched your profile. Try adjusting your filters.</div>';
  } else {
    g.innerHTML = matches.map(s => {
      const cfg = catCfg[s.cat] || { c: 'var(--or)', bg: 'var(--or3)', lbl: s.cat };
      return `<div class="rsch" style="border-left-color:${cfg.c};">
        <div class="rsch-cat" style="background:${cfg.bg};color:${cfg.c};">${cfg.lbl}</div>
        <div class="rsch-name">${s.n}</div>
        <div class="rsch-min">${s.min}</div>
        <div class="rsch-ben">${s.ben}</div>
        <div class="rsch-match" style="background:var(--grnl);color:var(--grn);">✓ You may qualify</div>
        <a class="rsch-apply" href="${s.url}" target="_blank">Apply / Know More →</a>
      </div>`;
    }).join('');
  }
  
  const resultsDiv = document.getElementById('elig-results');
  resultsDiv.style.display = 'block';
  resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── 2. GRIEVANCE & HELPLINES ──────────────────────
function renderGrievance() {
  document.getElementById('griev-list').innerHTML = grievPortals.map(p => `
    <div class="gi-portal">
      <div class="gi-ico" style="background:${p.bg};color:${p.c};"><i data-lucide="${p.ico}"></i></div>
      <div style="flex:1;">
        <div class="gi-name">${p.n}</div>
        <div class="gi-desc">${p.desc}</div>
        <div class="gi-meta">${p.tags.map(t => `<span class="gi-tag" style="background:${p.bg};color:${p.c};">${t}</span>`).join('')}</div>
      </div>
      <a class="gi-link" href="${p.url}" target="_blank">Visit →</a>
    </div>`).join('');
}

function renderHelplines() {
  document.getElementById('hline-grid').innerHTML = helplines.map(h => `
    <div class="hcard">
      <div class="hc-num" style="color:${h.c};">${h.num}</div>
      <div class="hc-name">${h.name}</div>
      <div class="hc-desc">${h.desc}</div>
      <a class="hc-call" style="background:${h.c};" href="tel:${h.num.replace(/[^0-9]/g, '')}">📞 Call Now</a>
    </div>`).join('');
}

// ── 4. COMPLAINT WIZARD ───────────────────────────
let wStep = 1, wIssue = null;

function selIssue(t, el) {
  wIssue = t;
  document.querySelectorAll('.icard').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  document.getElementById('wn1').disabled = false;
}

function wNext() {
  const next = wStep + 1;
  if (next === 3) buildPortals();
  if (next === 4) buildDocs();
  if (next === 5) buildSummary();
  setStep(next);
}

function wPrev() {
  if (wStep > 1) setStep(wStep - 1);
}

function setStep(n) {
  wStep = n;
  document.querySelectorAll('.wp').forEach(p => p.classList.remove('act'));
  document.getElementById('ws' + n).classList.add('act');
  document.querySelectorAll('.ws').forEach(s => {
    const sn = parseInt(s.dataset.s, 10);
    s.classList.remove('act', 'done');
    if (sn === n) s.classList.add('act');
    else if (sn < n) s.classList.add('done');
  });
}

function wReset() {
  wIssue = null;
  setStep(1);
  document.querySelectorAll('.icard').forEach(c => c.classList.remove('sel'));
  document.getElementById('wn1').disabled = true;
}

function buildPortals() {
  document.getElementById('portal-list').innerHTML = (portals[wIssue] || []).map(p => `
    <div class="portal-row">
      <div><div class="pr-name">${p.n}</div><div class="pr-note">${p.note}</div></div>
      ${p.url !== '#' ? `<a class="pr-link" href="${p.url}" target="_blank">Visit →</a>` : '<span class="pr-link" style="opacity:.4">In-person</span>'}
    </div>`).join('');
}

function buildDocs() {
  document.getElementById('doc-list').innerHTML = (docsMap[wIssue] || []).map(d => `
    <div class="docitem"><div class="doc-chk">✓</div><div style="font-size:13px;color:var(--t2);">${d}</div></div>`).join('');
}

function buildSummary() {
  const desc = document.getElementById('w-desc').value || 'Not provided';
  const state = document.getElementById('w-state').value || 'Not specified';
  const pList = portals[wIssue] || [];
  document.getElementById('summary').innerHTML = `<div class="sumbox">
    <div class="sum-row"><div class="sum-key">Issue Type</div><div class="sum-val" style="font-weight:700;color:var(--or);">${issueLabel[wIssue] || 'Unknown'}</div></div>
    <div class="sum-row"><div class="sum-key">State</div><div class="sum-val">${state}</div></div>
    <div class="sum-row"><div class="sum-key">Description</div><div class="sum-val">${desc}</div></div>
    <div class="sum-row"><div class="sum-key">File With</div><div class="sum-val">${pList.map(p => `→ ${p.n}`).join('<br>')}</div></div>
  </div>`;
}

// ── 5. RTI BUILDER ────────────────────────────────
const rtiTemplates = {
  nsp: "Provide the current status and reasons for delay/rejection of my NSP Scholarship Application ID: [Insert ID].",
  caste: "Provide the status and processing details of my Caste Certificate Application No: [Insert Ref No] submitted on [Date].",
  fir: "Provide a certified copy of FIR No: [Insert Number] registered at [Police Station] on [Date].",
  scheme: "Provide detailed reasons for the rejection of my application under [Scheme Name] along with noting sheets.",
  custom: ""
};

function rtiSelectTemplate(key, btn) {
  document.querySelectorAll('.rti-tmpl-btn').forEach(b => b.classList.remove('act'));
  btn.classList.add('act');
  document.getElementById('rti-query-text').value = rtiTemplates[key] || "";
}

function rtiGenerate() {
  const nameEl = document.getElementById('rti-name');
  const authEl = document.getElementById('rti-authority');
  const queryEl = document.getElementById('rti-query-text');

  // Basic validation — required fields must not be empty
  const missing = [nameEl, authEl, queryEl].filter(el => !el.value.trim());
  if (missing.length) {
    missing.forEach(el => el.classList.add('field-error'));
    missing[0].focus();
    return;
  }
  [nameEl, authEl, queryEl].forEach(el => el.classList.remove('field-error'));

  const name = nameEl.value.trim();
  const address = document.getElementById('rti-address').value.trim() || "[Your Address]";
  const auth = authEl.value.trim();
  const sub = "Request for information under Section 6(1) of the RTI Act, 2005";
  const bpl = document.getElementById('rti-bpl').checked;
  const query = queryEl.value.trim();
  const dateStr = new Date().toLocaleDateString('en-IN');

  const letterText = `To,
The Public Information Officer (PIO)
${auth}

Date: ${dateStr}

Subject: ${sub}

Respected Sir/Madam,

I, ${name}, a citizen of India, residing at ${address}, request you to kindly provide me the following information under section 6(1) of the Right to Information Act, 2005:

${query}

I state that the information sought does not fall within the restrictions contained in Section 8 and 9 of the Act and to the best of my knowledge it pertains to your office.

${bpl ? "I belong to the Below Poverty Line (BPL) category, hence the application fee is exempt. (BPL Card copy attached)." : "A fee of Rs. 10/- has been deposited towards the application fee."}

Kindly provide the information within 30 days as mandated by the Act.

Yours faithfully,

${name}
${address}`;

  document.getElementById('rti-letter-text').value = letterText;
  const out = document.getElementById('rti-output');
  out.style.display = 'block';
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function rtiCopy() {
  const text = document.getElementById('rti-letter-text').value;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('rti-copy-btn');
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy to Clipboard', 2000);
  });
}

function rtiPrint() {
  const text = document.getElementById('rti-letter-text').value;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`<pre style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;padding:40px;">${text}</pre>`);
  printWindow.document.close();
  printWindow.print();
}

// ── 6. RIGHTS MODALS ──────────────────────────────
function openModal(key) {
  const d = rData[key];
  if (!d) return;
  document.getElementById('modal-title').textContent = d.title;
  document.getElementById('modal-body').innerHTML = d.blocks.map(b => `
    <div class="mblock" style="background:${b.bg}; border-color:${b.bc}; padding: 15px; border-left: 4px solid; border-radius: 8px; margin-bottom: 12px;">
      <div style="font-weight:700; margin-bottom:5px;">${b.t}</div>
      <div style="font-size:13px; line-height:1.6;">${b.d}</div>
    </div>`).join('');
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

// ── 7. CONVERSATIONAL AI & LIVE API ───────────────
function addMsg(text, role, id = null) {
  const d = document.createElement('div');
  d.className = `amsg ${role}`;
  if (id) d.id = id;
  d.innerHTML = `<div class="abub">${text.replace(/\n/g, '<br>')}</div>`;
  const msgs = document.getElementById('ai-msgs');
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function sendQ(q) {
  document.getElementById('ai-inp').value = q;
  sendMsg();
}

let aiRequestInFlight = false;

async function sendMsg() {
  if (aiRequestInFlight) return; // prevent duplicate submissions

  const inp = document.getElementById('ai-inp');
  const sendBtn = document.getElementById('ai-send-btn');
  const msg = inp.value.trim();
  if (!msg) return;

  if (!navigator.onLine) {
    addMsg('⚠️ <strong>You appear to be offline.</strong><br><br>Checking our offline knowledge base instead.', 'bot');
    runLocalFallback(msg);
    return;
  }

  aiRequestInFlight = true;
  if (sendBtn) sendBtn.disabled = true;
  inp.disabled = true;

  // Show user's message
  addMsg(msg, 'user');
  inp.value = '';

  // Hide quick questions
  const qrBox = document.getElementById('ai-qr');
  if (qrBox) qrBox.style.display = 'none';

  // Show typing indicator
  const typingId = 'typing-' + Date.now();
  addMsg(
    '<div class="typing"><span></span><span></span><span></span></div>',
    'bot',
    typingId
  );

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg }),
      signal: controller.signal
    });

    const data = await response.json().catch(() => ({}));
    document.getElementById(typingId)?.remove();

    if (!response.ok) {
      addMsg(
        `⚠️ <strong>AI Service Error</strong><br><br>${data.error || 'Something went wrong.'} <button class="retry-btn" onclick="retryLastMsg('${msg.replace(/'/g, "\\'")}')">Retry →</button>`,
        'bot'
      );
      runLocalFallback(msg);
      return;
    }

    if (!data.reply) {
      addMsg('⚠️ The AI returned an empty response. Here is what our offline knowledge base has:', 'bot');
      runLocalFallback(msg);
      return;
    }

    addMsg(data.reply, 'bot');

  } catch (error) {
    document.getElementById(typingId)?.remove();
    const isTimeout = error.name === 'AbortError';
    addMsg(
      `⚠️ <strong>${isTimeout ? 'Request Timed Out' : 'Connection Error'}</strong><br><br>${isTimeout ? 'The AI took too long to respond.' : 'Could not reach the server.'} <button class="retry-btn" onclick="retryLastMsg('${msg.replace(/'/g, "\\'")}')">Retry →</button>`,
      'bot'
    );
    runLocalFallback(msg);
  } finally {
    clearTimeout(timeout);
    aiRequestInFlight = false;
    if (sendBtn) sendBtn.disabled = false;
    inp.disabled = false;
    inp.focus();
  }
}

function retryLastMsg(msg) {
  const inp = document.getElementById('ai-inp');
  inp.value = msg;
  sendMsg();
}
function runLocalFallback(msg) {
  const m = msg.toLowerCase();
  let found = false;
  for (const e of kb) {
    if (e.k.some(kw => m.includes(kw))) {
      addMsg(e.r, 'bot');
      found = true;
      break;
    }
  }
  if (!found) {
    addMsg("Offline Knowledge Base limited. For detailed answers, please double-check your Gemini API key configuration.", 'bot');
  }
}

// ── 8. PROFESSIONAL UI HELPERS ─────────────────────
const iconMap = {
  '⚖️':'scale','🏛️':'landmark','🎯':'target','📜':'scroll-text','📁':'file-text','📋':'clipboard-list',
  '🗂️':'folder-search-2','🔍':'search','📞':'phone','🤖':'bot','📖':'book-open','📝':'file-pen-line',
  '📚':'library','🛡️':'shield-check','💼':'briefcase-business','⚠️':'triangle-alert','✅':'check-circle-2',
  '🕌':'landmark','♀️':'venus','♿':'accessibility','📊':'chart-no-axes-combined','🏠':'house','✨':'sparkles',
  '🚫':'ban','👮':'shield','💰':'indian-rupee','🔒':'lock'
};

function hydrateIcons() {
  if (window.lucide) {
    Object.entries(iconMap).forEach(([emoji, name]) => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes=[];
      while (walker.nextNode()) if (walker.currentNode.nodeValue.includes(emoji)) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const parts = node.nodeValue.split(emoji);
        const frag = document.createDocumentFragment();
        parts.forEach((part, i) => {
          if (part) frag.appendChild(document.createTextNode(part));
          if (i < parts.length-1) {
            const icon = document.createElement('i');
            icon.setAttribute('data-lucide', name);
            icon.className = 'inline-icon';
            frag.appendChild(icon);
          }
        });
        node.parentNode?.replaceChild(frag, node);
      });
    });
    lucide.createIcons({ attrs: { 'stroke-width': 1.9 } });
  }
}

const translations = {
  en: { tag:'AI Civic & Legal Empowerment', dashboard:'Dashboard' },
  hl: { tag:'AI Civic & Legal Empowerment', dashboard:'Dashboard' },
  hi: { tag:'AI नागरिक एवं कानूनी सशक्तिकरण', dashboard:'डैशबोर्ड' }
};
function setLang(lang) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  const t = translations[lang] || translations.en;
  const tag = document.getElementById('sb-tag-el');
  const title = document.getElementById('abar-title');
  if (tag) tag.textContent = t.tag;
  if (title && window.currentPanel === 'home') title.textContent = t.dashboard;
  localStorage.setItem('nyayasetu-lang', lang);
}

async function checkAIHealth() {
  const status = document.getElementById('ai-status-txt');
  try {
    const r = await fetch('/api/health');
    const d = await r.json();
    if (status) status.innerHTML = `<span class=\"ai-dot\"></span>${d.aiConfigured ? 'Live AI Ready' : 'AI key not configured'}`;
  } catch {
    if (status) status.innerHTML = '<span class=\"ai-dot\"></span>Start the secure AI server';
  }
}

// Makes clickable divs (nav items, cards, tiles) keyboard-accessible
function makeClickablesKeyboardAccessible() {
  document.querySelectorAll('.ni[onclick], .ftile[onclick], .rcard[onclick], .icard[onclick]').forEach(el => {
    if (el.dataset.a11yBound) return;
    el.dataset.a11yBound = '1';
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
}

async function initProfessionalUI() {
  const saved = localStorage.getItem('nyayasetu-lang') || 'en';
  setLang(saved);
  hydrateIcons();
  makeClickablesKeyboardAccessible();
  if (typeof animCounters === 'function') animCounters();
  checkAIHealth();
}

document.addEventListener('DOMContentLoaded', initProfessionalUI);
const iconObserver = new MutationObserver(() => {
  if (window.__nyayaHydrating) return;
  window.__nyayaHydrating = true;
  requestAnimationFrame(() => { hydrateIcons(); makeClickablesKeyboardAccessible(); window.__nyayaHydrating = false; });
});
iconObserver.observe(document.body, { childList:true, subtree:true });

// ── 9. COUNTER ANIMATION ────────────────────────────
function animCounters() {
  document.querySelectorAll('.stc-val[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const dur = 900 + Math.random() * 400;
    const start = performance.now();
    const run = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(ease * target);
      if (t < 1) requestAnimationFrame(run);
      else el.textContent = target;
    };
    requestAnimationFrame(run);
  });
}