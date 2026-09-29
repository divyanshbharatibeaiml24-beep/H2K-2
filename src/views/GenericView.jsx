import React, { useState } from 'react';
import { INITIAL_PROJECTS, WARDS } from '../data/seedData';

export default function GenericView({ page, onSelectPage, triggerNotification }) {
  const [signed, setSigned] = useState(false);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  // 1. Decision Desk
  if (page === "Decision Desk") {
    const handleSign = () => {
      setSigned(true);
      triggerNotification(
        "🏛️ Sovereign Expenditure Warrant Signed!",
        "Warrant #EXEC-2026-0929 authorized for PRJ-001 (₹45 Lakhs). Transmitted to PRAMAN ledger.",
        "Sovereign Decision Desk",
        "success"
      );
    };

    return (
      <div>
        <div className="section-tag">EXECUTIVE ADJUDICATION & WARRANT SIGNING</div>
        <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          🏛️ Decision Desk: Executive Review & Expenditure Authorization
        </h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
          Consequential public investment decisions require explicit human authority. Review evidence dossiers, verify statutory compliance, and sign cryptographic expenditure warrants.
        </div>

        <div className="glass-card" style={{ border: signed ? '1px solid var(--neon-green)' : '1px solid var(--cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <div>
              <span className="mono-text" style={{ color: 'var(--cyan)', fontWeight: 700 }}>DOSSIER: DOS-2026-09-01</span>
              <h3 style={{ margin: '0.2rem 0', color: '#FFFFFF' }}>Evening Bus Service Extension — Velachery (PRJ-001)</h3>
            </div>
            <span className={`badge ${signed ? 'badge-green' : 'badge-amber'}`}>
              {signed ? 'WARRANT SIGNED' : 'PENDING EXECUTIVE SIGNATURE'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem' }} className="mono-text">
            <div>Allocation: <strong style={{ color: 'var(--neon-green)' }}>₹45,00,000 (₹45L)</strong></div>
            <div>Ward: <strong style={{ color: 'var(--cyan)' }}>W-03 (Velachery)</strong></div>
            <div>Population Reached: <strong style={{ color: '#FFFFFF' }}>18,500 residents</strong></div>
            <div>NIRNAY Consensus: <strong style={{ color: 'var(--neon-green)' }}>Scenario A (88%)</strong></div>
          </div>

          <p style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '1rem' }}>
            Authorization commits ₹45L from unallocated quarterly municipal transport accounts to procure 3 additional depot shifts. Corroborated by 14 citizen signals and verified through counterfactual simulation.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono-text" style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
              Statutory Authority: <strong>Principal Planning Commissioner</strong>
            </span>
            {signed ? (
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <span className="badge badge-green" style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}>
                  ✓ Cryptographic Warrant Dispatched
                </span>
                <button onClick={() => onSelectPage("PRAMAN")} className="btn btn-primary">
                  View PRAMAN Impact Receipt &rarr;
                </button>
              </div>
            ) : (
              <button onClick={handleSign} className="btn btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
                ✍️ Sign Sovereign Expenditure Warrant
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Projects View
  if (page === "Projects") {
    return (
      <div>
        <div className="section-tag">CAPITAL INTERVENTION PORTFOLIO</div>
        <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          🏗️ Capital Projects: Public Investment Portfolio
        </h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
          Track active civic interventions, allocated capital expenditures, physical milestone progress, and responsible authorizing officials.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {projects.map((p) => (
            <div key={p.id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className="mono-text" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.82rem' }}>{p.id}</span>
                <span className="badge badge-green">{p.status.toUpperCase()}</span>
              </div>
              <h4 style={{ color: '#FFFFFF', margin: '0.3rem 0 0.6rem 0', fontSize: '0.96rem' }}>{p.name}</h4>
              <div className="mono-text" style={{ fontSize: '0.76rem', color: '#CBD5E1', marginBottom: '0.8rem' }}>
                <div>• Budget: <strong style={{ color: 'var(--neon-green)' }}>{p.budget}</strong></div>
                <div>• Location: <strong style={{ color: 'var(--cyan)' }}>{p.ward}</strong></div>
                <div>• Sign-off: <strong>{p.approver}</strong></div>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94A3B8', marginBottom: '0.2rem' }}>
                  <span>Milestone Completion</span>
                  <span>{p.progress}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.progress}%`, background: 'var(--cyan)', height: '100%', borderRadius: '9999px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. PRAMAN Ledger View
  if (page === "PRAMAN") {
    return (
      <div>
        <div className="section-tag">TAMPER-PROOF IMPACT PROVENANCE</div>
        <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          📜 PRAMAN: Causal Impact Verification Ledger
        </h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
          Cryptographic receipts proving predicted vs measured civic outcomes. Closes the sovereign accountability loop by comparing pre-intervention simulations against post-delivery reality.
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid var(--neon-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <div>
              <span className="mono-text" style={{ color: 'var(--neon-green)', fontWeight: 700 }}>RECEIPT #IR-001</span>
              <h3 style={{ margin: '0.2rem 0', color: '#FFFFFF' }}>Perambur Road Resurfacing Phase-II (PRJ-005)</h3>
            </div>
            <span className="badge badge-green">✓ CAUSAL IMPACT VERIFIED</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '8px', marginBottom: '0.8rem' }} className="mono-text">
            <div>
              <div style={{ color: 'var(--amber)', fontSize: '0.78rem', marginBottom: '0.3rem' }}>PREDICTED (Simulation Lab)</div>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>• Accident Reduction: 40%</div>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>• Travel Time: -15 mins</div>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>• Public Satisfaction: 75%</div>
            </div>
            <div>
              <div style={{ color: 'var(--neon-green)', fontSize: '0.78rem', marginBottom: '0.3rem' }}>MEASURED (Traffic Sensor Feeds)</div>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>• Accident Reduction: 38%</div>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>• Travel Time: -12 mins</div>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>• Public Satisfaction: 82%</div>
            </div>
          </div>

          <div className="mono-text" style={{ fontSize: '0.72rem', color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Merkle Root Hash: <code style={{ color: 'var(--violet)' }}>0x7f2a9918bca48210...9d1</code></span>
            <span>Confidence: <strong style={{ color: 'var(--neon-green)' }}>91.4%</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Hotspots & Silent Zones View
  if (page === "Hotspots & Silent Zones") {
    return (
      <div>
        <div className="section-tag">EQUITY & ANOMALY DISCOVERY RADAR</div>
        <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          🚨 Hotspots & Silent Zones: Spatial Deficit Discovery
        </h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
          Identifies critical distress clusters alongside under-reported "Silent Zones"—preventing algorithmic bias where vocal areas receive disproportionate municipal funding.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {WARDS.map((w) => {
            const isCrit = w.critical;
            const isSil = w.silent;
            const color = isCrit ? 'var(--neon-red)' : (isSil ? 'var(--amber)' : 'var(--cyan)');
            return (
              <div key={w.id} className="glass-card" style={{ borderLeft: `4px solid ${color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono-text" style={{ color, fontWeight: 700 }}>{w.id} &bull; {w.name}</span>
                  <span className={`badge ${isCrit ? 'badge-red' : (isSil ? 'badge-amber' : 'badge-cyan')}`}>
                    {isCrit ? 'CRITICAL HOTSPOT' : (isSil ? 'SILENT ZONE' : 'STABLE')}
                  </span>
                </div>
                <div style={{ margin: '0.6rem 0', fontSize: '0.84rem', color: '#CBD5E1' }}>
                  Dominant Deficit: <strong style={{ color: '#FFFFFF' }}>{w.deficit}</strong>
                </div>
                <div className="mono-text" style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                  <div>Population: {w.population.toLocaleString()}</div>
                  <div>Deficit Intensity: <strong style={{ color }}>{w.intensity}</strong></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 5. Live Demo Golden Path View
  if (page === "Live Demo") {
    return (
      <div>
        <div className="section-tag">FLAGSHIP GOLDEN PATH WALKTHROUGH</div>
        <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
          ⚡ Live Demo: Sovereign Civic Intelligence Journey
        </h2>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
          Experience the 5-step closed-loop lifecycle from raw citizen signal to cryptographic impact verification.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { step: '1', title: 'Citizen Voice Intake', desc: 'Tamil voice note ingested: "No bus after 7 PM near college" (SIG-001).', page: 'Citizen Signals', color: 'var(--cyan)' },
            { step: '2', title: 'HDBSCAN Need Clustering', desc: '14 fragmented signals fused into civic need cluster CN-001.', page: 'Civic Needs', color: 'var(--violet)' },
            { step: '3', title: 'Counterfactual Simulation', desc: 'Tested 3 route extensions; Scenario A achieved 72% gap reduction for ₹45L.', page: 'Simulation Lab', color: 'var(--amber)' },
            { step: '4', title: 'NIRNAY Multi-Agent Arena', desc: '6 adversarial agents converged on Scenario A equity-first recommendation.', page: 'NIRNAY', color: 'var(--cyan)' },
            { step: '5', title: 'PRAMAN Impact Verification', desc: 'Executive signed warrant; post-delivery sensor feeds verified 38% accident reduction.', page: 'PRAMAN', color: 'var(--neon-green)' }
          ].map((s) => (
            <div key={s.step} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: s.color, color: '#060913', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {s.step}
                </div>
                <div>
                  <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: '0.96rem' }}>{s.title}</h4>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '0.2rem' }}>{s.desc}</div>
                </div>
              </div>
              <button onClick={() => onSelectPage(s.page)} className="btn">
                Launch Step {s.step} &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default Fallback for other 15 modules
  return (
    <div>
      <div className="section-tag">SOVEREIGN GOVTECH MODULE</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🌐 {page}
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Operating under sovereign clearance &bull; Unified multi-agency data pipelines synced.
      </div>

      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <span style={{ fontSize: '3rem' }}>⚡</span>
        <h3 style={{ color: '#FFFFFF', marginTop: '0.6rem' }}>{page} Active & Online</h3>
        <p style={{ color: '#94A3B8', maxWidth: '550px', margin: '0.6rem auto 1.5rem auto', fontSize: '0.88rem' }}>
          This sovereign module is integrated with the JANAVYUH core runtime. Telemetry, security logging, and tamper-proof verification are fully operational.
        </p>
        <button onClick={() => onSelectPage("Dashboard")} className="btn btn-primary">
          Return to Sovereign Dashboard &rarr;
        </button>
      </div>
    </div>
  );
}
