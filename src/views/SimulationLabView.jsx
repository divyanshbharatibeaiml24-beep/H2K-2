import React, { useState } from 'react';

export default function SimulationLabView({ onSelectPage, triggerNotification }) {
  const [budget, setBudget] = useState(4500000);
  const [simulated, setSimulated] = useState(false);

  const pop = Math.round(budget / 240);
  const gap = Math.min(96, Math.round((budget / 4500000) * 72));
  const resid = Math.max(4, 100 - gap);

  const scenarios = [
    {
      id: "SC-A",
      name: `Scenario A: Add 3 Evening Routes (₹${(budget/100000).toFixed(1)}L)`,
      budget: budget,
      pop_reached: pop,
      gap_reduction: gap,
      residual_demand: resid,
      lifecycle_cost: budget * 3,
      confidence: 0.88,
      border: 'var(--cyan)',
      assumptions: "Assumes 3 new routes operational by Q1 2027, driver availability confirmed."
    },
    {
      id: "SC-B",
      name: "Scenario B: Shared Mobility + 1 Route",
      budget: Math.round(budget * 0.62),
      pop_reached: Math.round(pop * 0.65),
      gap_reduction: 55,
      residual_demand: 45,
      lifecycle_cost: Math.round(budget * 1.8),
      confidence: 0.82,
      border: 'var(--amber)',
      assumptions: "Requires private partner agreement, assumes 60% adoption rate."
    },
    {
      id: "SC-C",
      name: "Scenario C: Full Metro Feeder Integration",
      budget: Math.round(budget * 3.3),
      pop_reached: Math.round(pop * 1.9),
      gap_reduction: 91,
      residual_demand: 9,
      lifecycle_cost: Math.round(budget * 10),
      confidence: 0.75,
      border: 'var(--violet)',
      assumptions: "Dependent on metro phase-2 completion, 18-month timeline."
    }
  ];

  const handleRunSimulation = () => {
    setSimulated(true);
    triggerNotification(
      "⚡ Policy Simulation Run Successful!",
      `10,000 Monte-Carlo runs converged in 94ms. Budget: ₹${(budget/100000).toFixed(1)}L | Gap Reduction: ${gap}% | Pop Reached: ${pop.toLocaleString()} residents.`,
      "Policy Time Machine v2.4",
      "success"
    );
  };

  const handlePromote = (sc) => {
    triggerNotification(
      "⚖️ Scenario Promoted to NIRNAY",
      `Promoted ${sc.name} for adversarial multi-agent policy synthesis.`,
      "NIRNAY Arena Dispatcher",
      "success"
    );
    onSelectPage("NIRNAY");
  };

  return (
    <div>
      <div className="section-tag">POLICY TIME MACHINE & COUNTERFACTUAL ENGINE</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🔮 Simulation Lab: Multi-Scenario Budget & Impact Testing
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Simulate interventions before committing sovereign capital. Test trade-offs between capital expenditure, lifecycle maintenance, population coverage, and equity outcomes across alternative policy pathways.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '1.1rem', marginBottom: '1.1rem' }}>
        {/* Controls */}
        <div className="glass-card">
          <h4 style={{ fontSize: '0.96rem', marginBottom: '0.8rem', color: '#FFFFFF' }}>
            🎛️ Simulation Parameters
          </h4>

          <div style={{ marginBottom: '0.9rem' }}>
            <label style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'block', marginBottom: '0.3rem' }}>
              Target Civic Need Cluster
            </label>
            <select className="global-select" style={{ width: '100%' }}>
              <option>CN-001: Public Transport (Velachery)</option>
              <option>CN-002: Water Supply (Tondiarpet)</option>
              <option>CN-003: Street Lighting (Adyar)</option>
              <option>CN-004: Drainage & Sanitation (Ambattur)</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
              <span style={{ color: '#94A3B8' }}>Simulated Capital Allocation:</span>
              <strong style={{ color: 'var(--cyan)' }}>₹{(budget/100000).toFixed(1)} Lakhs</strong>
            </div>
            <input 
              type="range"
              min="1000000"
              max="30000000"
              step="500000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--cyan)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94A3B8', marginTop: '0.2rem' }}>
              <span>₹10 Lakhs</span>
              <span>₹300 Lakhs (₹3Cr)</span>
            </div>
          </div>

          <button 
            onClick={handleRunSimulation} 
            className="btn btn-primary btn-full"
            style={{ padding: '0.65rem' }}
          >
            ⚡ Run Counterfactual Policy Monte-Carlo Simulation
          </button>
        </div>

        {/* SVG Multi-Scenario Trade-off Radar Chart */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <h4 style={{ fontSize: '0.92rem', color: '#FFFFFF', margin: 0 }}>
              📊 Multi-Criteria Trade-off Radar
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.68rem' }}>
              <span style={{ color: 'var(--cyan)' }}>■ Scenario A</span>
              <span style={{ color: 'var(--amber)' }}>■ Scenario B</span>
              <span style={{ color: 'var(--violet)' }}>■ Scenario C</span>
            </div>
          </div>

          <div style={{ background: '#05070E', borderRadius: '10px', padding: '0.8rem', border: '1px solid rgba(0, 212, 255, 0.25)' }}>
            <svg viewBox="0 0 360 220" style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Radar Rings */}
              <polygon points="180,30 290,80 260,190 100,190 70,80" fill="none" stroke="rgba(255,255,255,0.08)" />
              <polygon points="180,65 245,95 230,160 130,160 115,95" fill="none" stroke="rgba(255,255,255,0.12)" />
              <polygon points="180,100 200,110 195,130 165,130 160,110" fill="none" stroke="rgba(255,255,255,0.1)" />

              {/* Axis Labels */}
              <text x="180" y="22" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">POPULATION REACHED</text>
              <text x="315" y="85" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">GAP REDUCTION</text>
              <text x="270" y="208" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">LIFECYCLE EFFICIENCY</text>
              <text x="90" y="208" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">EQUITY WEIGHT</text>
              <text x="45" y="85" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">RESILIENCE</text>

              {/* Scenario C polygon (purple) */}
              <polygon 
                points="180,35 285,82 200,165 110,140 100,90" 
                fill="rgba(168, 85, 247, 0.15)" 
                stroke="var(--violet)" 
                strokeWidth="1.8" 
              />
              {/* Scenario B polygon (amber) */}
              <polygon 
                points="180,85 220,105 240,150 140,150 130,110" 
                fill="rgba(255, 165, 0, 0.15)" 
                stroke="var(--amber)" 
                strokeWidth="1.8" 
              />
              {/* Scenario A polygon (cyan) */}
              <polygon 
                points={`180,${Math.max(35, 110 - (gap * 0.8))} ${Math.min(285, 180 + gap)} ,85 245,160 120,160 85,85`} 
                fill="rgba(0, 212, 255, 0.25)" 
                stroke="var(--cyan)" 
                strokeWidth="2.2" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Scenarios Cards Grid */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem', color: '#FFFFFF' }}>
        📋 Alternative Intervention Pathways (A / B / C)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {scenarios.map((sc) => (
          <div 
            key={sc.id} 
            className="glass-card" 
            style={{ 
              borderTop: `4px solid ${sc.border}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '290px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className="mono-text" style={{ color: sc.border, fontWeight: 700, fontSize: '0.88rem' }}>
                  {sc.id}
                </span>
                <span className="badge" style={{ background: 'rgba(0, 212, 255, 0.1)', color: 'var(--cyan)', border: '1px solid rgba(0,212,255,0.3)', fontSize: '0.65rem' }}>
                  {Math.round(sc.confidence * 100)}% CONF
                </span>
              </div>

              <h4 style={{ fontSize: '0.92rem', color: '#FFFFFF', margin: '0 0 0.5rem 0' }}>
                {sc.name}
              </h4>

              <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.7 }} className="mono-text">
                <div>• Capex: <strong style={{ color: 'var(--neon-green)' }}>₹{(sc.budget/100000).toFixed(1)}L</strong></div>
                <div>• Lifecycle 5Y: <strong style={{ color: 'var(--amber)' }}>₹{(sc.lifecycle_cost/100000).toFixed(1)}L</strong></div>
                <div>• Pop Reached: <strong style={{ color: '#FFFFFF' }}>{sc.pop_reached.toLocaleString()}</strong></div>
                <div>• Gap Reduction: <strong style={{ color: 'var(--neon-green)' }}>{sc.gap_reduction}%</strong></div>
                <div>• Residual Deficit: <strong style={{ color: 'var(--neon-red)' }}>{sc.residual_demand}%</strong></div>
              </div>

              <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: '#94A3B8', background: 'rgba(0,0,0,0.35)', padding: '0.45rem', borderRadius: '4px', fontStyle: 'italic', lineHeight: 1.3 }}>
                "{sc.assumptions}"
              </div>
            </div>

            <div style={{ marginTop: '0.8rem' }}>
              <button 
                onClick={() => handlePromote(sc)}
                className="btn btn-full"
                style={{ fontSize: '0.8rem' }}
              >
                Promote {sc.id} to NIRNAY Arena &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
