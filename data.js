// ================================================
// NyayaSetu — data.js  |  All static application data
// Author : Rajat Tailor | B.Tech CSE (2nd Year)
// ================================================

// ── SCHEME DATABASE (23 schemes) ──────────────────
const schemeDB = [
  {n:'Post-Matric Scholarship for SC',cat:'social',min:'Social Justice',ben:'Tuition fees + maintenance',url:'https://scholarships.gov.in',need:{cats:['sc'],edu:['matric','inter','ug','pg','research','professional'],income:['u1','u25']}},
  {n:'Top Class Education Scholarship for SC',cat:'social',min:'Social Justice',ben:'Full fees at premier institutions',url:'https://scholarships.gov.in',need:{cats:['sc'],edu:['ug','pg','research','professional'],income:['u1','u25']}},
  {n:'National Fellowship for SC (UGC)',cat:'social',min:'Social Justice',ben:'₹31,000–₹35,000/month for research',url:'https://ugc.ac.in',need:{cats:['sc'],edu:['research'],income:['u1','u25','u6']}},
  {n:'Dr. Ambedkar Scholarship (EBC/DNT)',cat:'social',min:'Social Justice',ben:'Scholarship for EBC/DNT post-matric students',url:'https://scholarships.gov.in',need:{cats:['ebc','dnt'],edu:['matric','inter','ug','pg'],income:['u1']}},
  {n:'PM-YASASVI Scholarship',cat:'social',min:'Social Justice',ben:'₹75,000–₹1.25 lakh/year',url:'https://yet.nta.ac.in',need:{cats:['obc','ebc','dnt'],edu:['matric','inter'],income:['u1','u25']}},
  {n:'Scholarship for Students with Disabilities',cat:'social',min:'Social Justice',ben:'₹3,500/month for higher studies',url:'https://scholarships.gov.in',need:{cats:['sc','st','obc','minority','general','pwd'],dis:['above40'],edu:['inter','ug','pg'],income:['u1','u25']}},
  {n:'Post-Matric Scholarship for OBC',cat:'social',min:'Social Justice',ben:'Tuition fees + maintenance',url:'https://scholarships.gov.in',need:{cats:['obc'],edu:['matric','inter','ug','pg'],income:['u1']}},
  {n:'Pre-Matric Scholarship for Minorities',cat:'minority',min:'Minority Affairs',ben:'₹1,000–₹10,000/year',url:'https://scholarships.gov.in',need:{cats:['minority'],edu:['school','matric'],income:['u1']}},
  {n:'Post-Matric Scholarship for Minorities',cat:'minority',min:'Minority Affairs',ben:'Tuition + maintenance for post-10th',url:'https://scholarships.gov.in',need:{cats:['minority'],edu:['matric','inter','ug','pg','professional'],income:['u1','u25']}},
  {n:'Merit-cum-Means Scholarship (Minority)',cat:'minority',min:'Minority Affairs',ben:'₹20,000 fees + ₹10,000 maintenance',url:'https://scholarships.gov.in',need:{cats:['minority'],edu:['ug','professional'],income:['u1','u25']}}
];

const catCfg = {
  social:   {c:'var(--or)',   bg:'var(--or3)',   lbl:'Social Justice'},
  minority: {c:'var(--teal)', bg:'var(--teal3)', lbl:'Minority'},
  education:{c:'var(--grn)',  bg:'var(--grnl)',  lbl:'Education'},
  women:    {c:'var(--pur)',  bg:'var(--purl)',  lbl:'Women'},
  tribal:   {c:'var(--yel)',  bg:'var(--yell)',  lbl:'Tribal'},
  labour:   {c:'var(--blu)',  bg:'var(--blu3)',  lbl:'Skill & Labour'}
};

// ── GRIEVANCE PORTALS (12) ──────────────────────
const grievPortals = [
  {n:'CPGRAMS',ico:'landmark',bg:'var(--blu3)',c:'var(--blu)',desc:'Centralised Public Grievance Redress System.',tags:['Central Govt','All Issues'],url:'https://pgportal.gov.in'},
  {n:'NHRC — National Human Rights Commission',ico:'scale',bg:'var(--or3)',c:'var(--or)',desc:'For human rights violations by state authorities.',tags:['Human Rights','State Violence'],url:'https://nhrc.nic.in'},
  {n:'NCW — National Commission for Women',ico:'venus',bg:'var(--purl)',c:'var(--pur)',desc:'Complaints related to domestic violence, dowry.',tags:['Women','Violence'],url:'https://ncw.nic.in'},
  {n:'NCM — National Commission for Minorities',ico:'landmark',bg:'var(--yell)',c:'var(--yel)',desc:'Discrimination or denial of rights to minorities.',tags:['Minorities','Discrimination'],url:'https://ncm.nic.in'},
  {n:'NCSC — National Commission for Scheduled Castes',ico:'shield-check',bg:'var(--grnl)',c:'var(--grn)',desc:'Caste-based atrocities, reservation violations.',tags:['SC Rights','Atrocity'],url:'https://ncsc.nic.in'},
  {n:'SHe-Box — POSH Complaints',ico:'briefcase-business',bg:'var(--purl)',c:'var(--pur)',desc:'Workplace sexual harassment complaints.',tags:['POSH','Workplace'],url:'https://shebox.nic.in'},
  {n:'NSP Grievance Portal',ico:'library',bg:'var(--blu3)',c:'var(--blu)',desc:'For scholarship-related issues and payments.',tags:['NSP','Scholarships'],url:'https://scholarships.gov.in'},
  {n:'NALSA — Free Legal Aid',ico:'scale',bg:'var(--grnl)',c:'var(--grn)',desc:'Request free legal representation.',tags:['Free Legal Aid','Lok Adalat'],url:'https://nalsa.gov.in'}
];

// ── HELPLINES (12) ──────────────────────────────
const helplines = [
  {num:'112',     name:'Emergency',          desc:'Police, fire, ambulance — single emergency number',          c:'var(--or)',   bg:'var(--or3)'},
  {num:'14433',   name:'NHRC Helpline',       desc:'National Human Rights Commission — rights violations',       c:'var(--blu)',  bg:'var(--blu3)'},
  {num:'181',     name:'Women Helpline',      desc:'24/7 support for women in distress or violence',             c:'var(--pur)',  bg:'var(--purl)'},
  {num:'1098',    name:'Childline',           desc:'Children in distress, abuse, or needing care',               c:'var(--or)',   bg:'var(--or3)'},
  {num:'14567',   name:'Senior Citizen',      desc:'Abuse of elderly citizens; labour law grievances',           c:'var(--yel)',  bg:'var(--yell)'},
  {num:'1800-11-0031',name:'Disability',      desc:'Rights and assistance for persons with disabilities',        c:'var(--blu)',  bg:'var(--blu3)'},
  {num:'1930',    name:'Cyber Crime',         desc:'Online fraud, financial cyber crime, digital harassment',    c:'var(--blu)',  bg:'var(--blu3)'},
  {num:'15100',   name:'NALSA Legal Aid',     desc:'Free legal services and Lok Adalat guidance',                c:'var(--grn)',  bg:'var(--grnl)'}
];

// ── COMPLAINT WIZARD DATA ──────────────────────
const portals = {
  discrimination:[{n:'NHRC',url:'https://nhrc.nic.in',note:'Primary body for rights violations'},{n:'NCSC',url:'https://ncsc.nic.in',note:'Caste-based atrocities'}],
  harassment:[{n:'National Commission for Women',url:'https://ncw.nic.in',note:'Gender-based harassment'},{n:'SHe-Box',url:'https://shebox.nic.in',note:'Workplace harassment'}],
  corruption:[{n:'Lokpal of India',url:'https://lokpal.gov.in',note:'Senior central govt officers'},{n:'CPGRAMS',url:'https://pgportal.gov.in',note:'Central public grievance'}],
  police:[{n:'SP/DCP Office',url:'#',note:'Superintendent of Police'},{n:'State SHRC',url:'#',note:'Custodial torture'}],
  scheme:[{n:'CPGRAMS',url:'https://pgportal.gov.in',note:'Most effective central grievance'},{n:'NSP Grievance',url:'https://scholarships.gov.in',note:'Scholarship issues'}],
  rights:[{n:'NHRC',url:'https://nhrc.nic.in',note:'Rights violations'},{n:'High Court',url:'#',note:'Writ petition'}]
};

const docsMap = {
  discrimination:['Aadhaar Card','Evidence (messages, photos)','FIR copy','Caste certificate'],
  harassment:['Aadhaar Card','Evidence (screenshots, CCTV)','Medical report','Witnesses'],
  corruption:['Evidence of bribery','Official receipts','ID proof'],
  police:['FIR copy if available','Medical report','Aadhaar Card'],
  scheme:['Application reference','Bank details','Income/caste certificate'],
  rights:['Aadhaar Card','Documentary proof of violation']
};

const issueLabel = {
  discrimination:'Caste / Religious Discrimination', harassment:'Harassment / Violence',
  corruption:'Corruption / Bribery', police:'Police Misconduct',
  scheme:'Scheme / Scholarship Denied', rights:'Rights Violation'
};

// ── RIGHTS MODAL DATA ──────────────────────────
const rData = {
  fundamental:{title:'⚖️ Fundamental Rights (Art. 12–35)',blocks:[{t:'Right to Equality (Art. 14–18)',d:'Equal before law. No discrimination on religion, race, caste, sex.',bg:'var(--or3)',bc:'var(--or)'},{t:'Right to Freedom (Art. 19–22)',d:'Freedom of speech, assembly, movement, residence.',bg:'var(--blu3)',bc:'var(--blu)'}]},
  minority:{title:'🕌 Minority Rights (Art. 25–30)',blocks:[{t:'Freedom of Religion (Art. 25)',d:'Right to freely profess, practice, and propagate religion.',bg:'var(--yell)',bc:'var(--yel)'}]},
  scst:{title:'🛡️ SC/ST Protections',blocks:[{t:'SC/ST (Prevention of Atrocities) Act, 1989',d:'Stringent law against caste-based atrocities.',bg:'var(--grnl)',bc:'var(--grn)'}]},
  women:{title:"♀️ Women's Rights",blocks:[{t:'Domestic Violence Act, 2005',d:'Covers physical, sexual, verbal, emotional, economic abuse. Call 181.',bg:'var(--purl)',bc:'var(--pur)'}]},
  disability:{title:'♿ Disability Rights (RPwD Act 2016)',blocks:[{t:'RPwD Act 2016',d:'4% reservation in government jobs, 5% in higher education.',bg:'var(--blu3)',bc:'var(--blu)'}]},
  rti:{title:'📁 Right to Information (RTI Act 2005)',blocks:[{t:'What is RTI?',d:'Request information from public authorities. Response within 30 days.',bg:'var(--yell)',bc:'var(--yel)'}]}
};

// ── FULL AI KNOWLEDGE BASE (14 topics) ─────────────
const kb = [
  {k:['nsp','scholarship not received','scholarship payment','stuck'], r:'If your NSP scholarship payment hasn\'t been received:\n1. Check status at scholarships.gov.in\n2. Verify Aadhaar is seeded to your bank account\n3. File NSP Grievance: Login → Services → Grievance Registration.'},
  {k:['caste certificate','sc certificate','obc certificate'], r:'To get a Caste Certificate:\n1. Visit your local SDM/Tehsildar office\n2. Bring: Aadhaar, father\'s caste certificate, residence proof\n⚠️ Critical: Only SDM/Tehsildar signatures are valid. Notary certificates are REJECTED.'},
  {k:['income certificate','how to get income'], r:'Income Certificate procedure:\n1. Apply at SDM/Tehsildar office\n2. Documents needed: salary slips, bank statements, Aadhaar\n3. Valid for 1 year.'},
  {k:['fir','police refuse','police complaint'], r:'If Police Refuse to file an FIR:\n1. Write to the DSP/SP directly\n2. File a complaint to the Magistrate under Section 156(3) CrPC\n3. File a Zero-FIR if the crime occurred in another jurisdiction.'},
  {k:['legal aid','free lawyer','nalsa'], r:'Free Legal Aid through NALSA:\n✅ Eligible: SC/ST, women, children, PwD, income < ₹1 lakh/year\nHow to get it:\n1. Call NALSA helpline: 15100\n2. Apply online at nalsa.gov.in'},
  {k:['rti','right to information','file rti'], r:'Filing an RTI Application:\n1. Write to the PIO of the department\n2. Pay ₹10 (postal order/court fee stamp). BPL = free.\n3. Response must come within 30 days.'},
  {k:['domestic violence','women violence','harassment','women helpline'], r:'Domestic Violence protections:\n1. Get a Protection Order from Magistrate via Protection Officer\n2. Immediate help: Call 181 (Women Helpline)\n3. Free legal aid via NALSA (15100).'},
  {k:['disability','rpwd','udid','pwd'], r:'Disability Rights:\n• 4% reservation in government jobs\n• 5% reservation in higher education\n• UDID card required for benefits — apply at swavlambancard.gov.in'}
];