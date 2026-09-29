// Master Seed Data for JANAVYUH Sovereign Civic Intelligence OS

export const FEATURE_OPTIONS = {
  "Live Demo": "⚡ Live Demo (Flagship Golden Path Walkthrough)",
  "Dashboard": "🏠 Dashboard (Executive Operations & Real-time Pulse)",
  "Citizen Signals": "🎙️ Citizen Signals (Universal Multilingual Voice/Text Intake)",
  "Civic Needs": "🧩 Civic Needs (HDBSCAN Clustered Problem Fusion)",
  "Hotspots & Silent Zones": "🚨 Hotspots & Silent Zones (Discovery Radar & Equity)",
  "Civic Twin": "🌐 Civic Digital Twin (Living Regional State Model)",
  "Prediction": "📈 Prediction (Spatiotemporal Demand Forecasting)",
  "Simulation Lab": "🔮 Simulation Lab (Policy Time Machine & Monte-Carlo)",
  "NIRNAY": "⚖️ NIRNAY Workspace (Multi-Agent Policy Arena)",
  "JANMAT": "🗳️ JANMAT Governance (Bounded Public Equity Parameter)",
  "Projects": "🏗️ Capital Projects (Public Intervention Portfolio)",
  "Decision Desk": "🏛️ Decision Desk (Executive Review & Warrant Signing)",
  "SETU Policy Copilot": "📄 SETU Policy Copilot (Grounded Retrieval Synthesis)",
  "PRAMAN": "📜 PRAMAN Ledger (Causal Impact Verification & Receipts)",
  "Citizen Tracker": "🔍 Citizen Tracker (UTTAR Lifecycle Transparency)",
  "Public Insights": "📊 Public Insights (Aggregated Community Scorecards)",
  "Audit & Provenance": "🔒 Audit & Provenance (Cryptographic Ledger Explorer)",
  "Data Sources": "🗄️ Sovereign Data Sources (Verified Registry & Feeds)",
  "Model Monitor": "🧠 Model Monitor (Responsible AI & Telemetry)",
  "Settings": "⚙️ System Settings & Governance Configuration"
};

export const ALL_MODULES = Object.keys(FEATURE_OPTIONS);

export const ROLES = {
  "Admin": {
    title: "System Administrator (Full Sovereign Access)",
    modules: ALL_MODULES,
    color: "#00D4FF",
    description: "Unrestricted administrative clearance across all infrastructure, ML models, and policy desks."
  },
  "Planner": {
    title: "Urban & Capital Planner",
    modules: [
      "Live Demo", "Dashboard", "Civic Needs", "Hotspots & Silent Zones", 
      "Civic Twin", "Prediction", "Simulation Lab", "NIRNAY", "JANMAT", 
      "Projects", "SETU Policy Copilot", "Decision Desk", "Public Insights"
    ],
    color: "#A855F7",
    description: "Formulate policy interventions, run Monte-Carlo simulations, and review analytical syntheses."
  },
  "Approver": {
    title: "Authorizing Executive Official",
    modules: [
      "Live Demo", "Dashboard", "Decision Desk", "NIRNAY", 
      "Projects", "PRAMAN", "Audit & Provenance", "Public Insights"
    ],
    color: "#FF3B6E",
    description: "Adjudicate policy trade-offs, sign expenditure warrants, and inspect causal verification receipts."
  },
  "Auditor": {
    title: "Sovereign Compliance & Provenance Auditor",
    modules: [
      "Live Demo", "Dashboard", "PRAMAN", "Audit & Provenance", 
      "Model Monitor", "Data Sources", "Public Insights", "SETU Policy Copilot"
    ],
    color: "#00FF88",
    description: "Cryptographic ledger verification, algorithmic fairness monitoring, and impact receipt audits."
  },
  "Local Officer": {
    title: "Zonal Officer & Field Administrator",
    modules: [
      "Live Demo", "Dashboard", "Citizen Signals", "Civic Needs", 
      "Hotspots & Silent Zones", "Projects", "Citizen Tracker", "Public Insights"
    ],
    color: "#FFA500",
    description: "Ward-level operations, grievance triage, proactive mobile unit dispatch, and project tracking."
  },
  "Frontline Worker": {
    title: "Assisted Intake & Field Surveyor",
    modules: [
      "Live Demo", "Dashboard", "Citizen Signals", "Civic Needs", "Citizen Tracker"
    ],
    color: "#38BDF8",
    description: "Multimodal voice intake, on-the-ground verification, and citizen ticket status lookup."
  },
  "Citizen": {
    title: "Resident & Civic Stakeholder",
    modules: [
      "Live Demo", "Dashboard", "Citizen Signals", "Citizen Tracker", "Public Insights"
    ],
    color: "#94A3B8",
    description: "Submit voice/text civic feedback, track submission lifecycle, and view privacy-preserved scorecards."
  }
};

export const WARDS = [
  { id: "W-01", name: "Adyar", lat: 13.0012, lon: 80.2565, population: 48200, intensity: 0.45, deficit: "Street Lighting" },
  { id: "W-02", name: "T. Nagar", lat: 13.0418, lon: 80.2341, population: 62500, intensity: 0.60, deficit: "Traffic & Peak Transport" },
  { id: "W-03", name: "Velachery", lat: 12.9815, lon: 80.2180, population: 55000, intensity: 0.92, deficit: "Late Evening Transport", critical: true },
  { id: "W-04", name: "Ambattur", lat: 13.1143, lon: 80.1548, population: 72000, intensity: 0.85, deficit: "Drainage & Overflow" },
  { id: "W-05", name: "Sholinganallur", lat: 12.9010, lon: 80.2279, population: 41000, intensity: 0.78, deficit: "Healthcare Coverage", silent: true },
  { id: "W-06", name: "Tondiarpet", lat: 13.1270, lon: 80.2890, population: 58000, intensity: 0.88, deficit: "Water Supply & School Roof" },
  { id: "W-07", name: "Mylapore", lat: 13.0368, lon: 80.2676, population: 35000, intensity: 0.50, deficit: "Waste Management" },
  { id: "W-08", name: "Perambur", lat: 13.1100, lon: 80.2400, population: 67000, intensity: 0.75, deficit: "Road Resurfacing" }
];

export const INITIAL_SIGNALS = [
  { id: "SIG-001", text: "There is no bus after 7 PM near our college", channel: "whatsapp_voice", language: "ta", lang_name: "Tamil", ward: "W-03", ward_name: "Velachery", timestamp: "2026-09-28T19:32:00", intent: "public_transport", urgency: "high", confidence: 0.94, status: "verified" },
  { id: "SIG-002", text: "பள்ளிக்கு அருகில் தண்ணீர் வரவில்லை 3 நாட்களாக", channel: "ivr", language: "ta", lang_name: "Tamil", ward: "W-06", ward_name: "Tondiarpet", timestamp: "2026-09-28T08:15:00", intent: "water_supply", urgency: "critical", confidence: 0.91, status: "clustered" },
  { id: "SIG-003", text: "Street lights not working on 3rd cross road since last week", channel: "web", language: "en", lang_name: "English", ward: "W-01", ward_name: "Adyar", timestamp: "2026-09-27T21:45:00", intent: "street_lighting", urgency: "medium", confidence: 0.97, status: "prioritised" },
  { id: "SIG-004", text: "Drainage overflow near market area causing health hazard", channel: "sms", language: "en", lang_name: "English", ward: "W-04", ward_name: "Ambattur", timestamp: "2026-09-28T06:20:00", intent: "drainage", urgency: "critical", confidence: 0.89, status: "received" },
  { id: "SIG-005", text: "सड़क पर गड्ढे हैं, बाइक से जाना खतरनाक है", channel: "whatsapp_text", language: "hi", lang_name: "Hindi", ward: "W-08", ward_name: "Perambur", timestamp: "2026-09-27T14:10:00", intent: "road_maintenance", urgency: "high", confidence: 0.92, status: "clustered" },
  { id: "SIG-006", text: "Primary health center closed on weekends, no emergency care", channel: "kiosk", language: "en", lang_name: "English", ward: "W-05", ward_name: "Sholinganallur", timestamp: "2026-09-26T10:30:00", intent: "healthcare", urgency: "high", confidence: 0.95, status: "approved" }
];

export const INITIAL_NEEDS = [
  { id: "CN-001", category: "Public Transport", severity: "critical", evidence_count: 14, confidence: 0.92, trend: "rising", ward: "W-03", ward_name: "Velachery", description: "Late-evening transport gap affecting students and workers", icon: "🚍" },
  { id: "CN-002", category: "Water Supply", severity: "critical", evidence_count: 9, confidence: 0.89, trend: "stable", ward: "W-06", ward_name: "Tondiarpet", description: "Intermittent water supply near schools and residential blocks", icon: "💧" },
  { id: "CN-003", category: "Street Lighting", severity: "moderate", evidence_count: 6, confidence: 0.95, trend: "rising", ward: "W-01", ward_name: "Adyar", description: "Non-functional street lights creating safety concerns", icon: "💡" },
  { id: "CN-004", category: "Drainage & Sanitation", severity: "critical", evidence_count: 11, confidence: 0.87, trend: "rising", ward: "W-04", ward_name: "Ambattur", description: "Drainage overflow near market causing health risks", icon: "🚰" }
];

export const NIRNAY_AGENTS = [
  { role: "Equity Advocate", icon: "⚖️", color: "#00FF88", claim: "Velachery evening transport gap disproportionately affects women students (68% of evening commuters). W-05 silent zone has 0 evening coverage.", counter: "W-03 has 3x unmet per-capita need compared to volume-first ranking." },
  { role: "Impact Optimizer", icon: "📊", color: "#00D4FF", claim: "Scenario A yields ₹243/person-reached vs ₹350 for Scenario B. Service gap reduction of 72% within 6 months.", counter: "Lifecycle cost of Scenario C is 3x higher but serves 2x population over 10y." },
  { role: "Budget Guardian", icon: "💰", color: "#FFA500", claim: "Current quarterly transport allocation has ₹52L unallocated. Scenario A fits within existing budget.", counter: "Scenario B reduces spend but risks emergency supplementary requests." },
  { role: "Resilience Analyst", icon: "🛡️", color: "#A855F7", claim: "Route redundancy improves from 0.2 to 0.7 with Scenario A. Climate resilience score: 0.65.", counter: "Scenario B has single-point-of-failure risk if private partner withdraws." },
  { role: "Infrastructure Auditor", icon: "🔍", color: "#FF3B6E", claim: "Bus depot at Velachery can accommodate 3 additional vehicles without expansion. Road condition: 72% serviceable.", counter: "Route 21B requires 2.3km of resurfacing before heavy bus deployment." },
  { role: "Evidence Auditor", icon: "📋", color: "#CBD5E1", claim: "14 citizen signals corroborate transport gap. 3 independent data feeds confirm. Confidence: 0.88.", counter: "2 of 14 signals may be duplicate submissions from same household." }
];

export const INITIAL_PROJECTS = [
  { id: "PRJ-001", name: "Evening Bus Service Extension — Velachery", budget: "₹45L", ward: "W-03", status: "proposed", progress: 0, approver: "Pending" },
  { id: "PRJ-002", name: "Tondiarpet Water Pipeline Rehabilitation", budget: "₹1.2Cr", ward: "W-06", status: "approved", progress: 25, approver: "District Collector" },
  { id: "PRJ-003", name: "Adyar Smart Street Light Installation", budget: "₹32L", ward: "W-01", status: "active", progress: 60, approver: "Ward Officer" },
  { id: "PRJ-004", name: "Perambur Road Resurfacing Phase-II", budget: "₹85L", ward: "W-08", status: "completed", progress: 100, approver: "Commissioner" }
];
