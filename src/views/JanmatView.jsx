import React, { useState } from 'react';

const JANMAT_FACTORS = [
  { id: 'demand', label: 'Demand Intensity', weight: 0.20, value: 0.92, desc: 'Normalized signal density weighted by recency and source diversity', color: 'var(--cyan)' },
  { id: 'equity', label: 'Equity Context', weight: 0.18, value: 0.85, desc: 'Socio-economic vulnerability index for affected population', color: 'var(--neon-green)' },
  { id: 'gap', label: 'Gap Severity', weight: 0.17, value: 0.88, desc: 'Measured service deficit relative to jurisdictional standards', color: 'var(--neon-red)' },
  { id: 'cost', label: 'Cost Effectiveness', weight: 0.12, value: 0.74, desc: 'Projected cost per person-year of service improvement', color: 'var(--amber)' },
  { id: 'resilience', label: 'Resilience Benefit', weight: 0.10, value: 0.68, desc: 'Infrastructure robustness gain against climate/disaster shocks', color: 'var(--violet)' },
  { id: 'readiness', label: 'Implementation Readiness', weight: 0.08, value: 0.81, desc: 'Prerequisites met, land/utility/workforce availability', color: 'var(--cyan)' }
];

const JANMAT_PENALTIES = [
  { id: 'duplication', label: 'Duplication Risk', weight: -0.08, value: 0.15, desc: 'Overlap with existing or planned interventions', color: 'var(--neon-red)' },
  { id: 'uncertainty', label: 'Uncertainty Penalty', weight: -0.07, value: 0.22, desc: 'Data staleness, low confidence, missing evidence sources', color: 'var(--amber)' }
];

const GOV_HISTORY = [
  { id: 'GH-001', action: 'Equity weight increased from 0.15 → 0.18', actor: 'Municipal Commissioner', date: '2026-09-15', reason: 'Policy directive: prioritize under-served silent zones' },
  { id: 'GH-002', action: 'Uncertainty penalty cap set to 0.30', actor: 'Data Governance Board', date: '2026-09-10', reason: 'Prevent excessive penalization of newly monitored areas' },
  { id: 'GH-003', action: 'Demand intensity source-weight: frontline reports upgraded', actor: 'Equity Committee', date: '2026-08-28', reason: 'Reduce bias toward digital-first reporting channels' },
  { id: 'GH-004', action: 'Resilience factor added to scoring model', actor: 'Climate Adaptation Cell', date: '2026-08-12', reason: 'Incorporate infrastructure stress from monsoon/flood events' }
];

export default function JanmatView({ onSelectPage, triggerNotification }) {
  const [factors, setFactors] = useState(JANMAT_FACTORS);
  const [penalties, setPenalties] = useState(JANMAT_PENALTIES);
  const [editMode, setEditMode] = useState(false);
  const [justification, setJustification] = useState('');

  const totalPositive = factors.reduce((s, f) => s + f.weight * f.value, 0);
  const totalNegative = penalties.reduce((s, p) => s + Math.abs(p.weight) * p.value, 0);
  const compositeScore = Math.max(0, Math.min(1, totalPositive - totalNegative));

  const handleWeightChange = (id, newWeight, isPenalty = false) => {
    if (isPenalty) {
      setPenalties(prev => prev.map(p => p.id === id ? { ...p, weight: -Math.abs(parseFloat(newWeight)) } : p));
    } else {
      setFactors(prev => prev.map(f => f.id === id ? { ...f, weight: parseFloat(newWeight) } : f));
    }
  };

  const handlePublish = () => {
    if (!justification.trim()) {
      triggerNotification('⚠️ Justification Required', 'Policy parameter changes require a written justification for audit trail.', 'JANMAT Governance', 'warning');
      return;
    }
    setEditMode(false);
    triggerNotification('🗳️ JANMAT Parameters Published', `Updated scoring model published with justification. Audit event recorded.`, 'JANMAT Governance Engine', 'success');
    setJustification('');
  };

  const scoreColor = compositeScore >= 0.7 ? 'var(--neon-green)' : compositeScore >= 0.5 ? 'var(--amber)' : 'var(--neon-red)';

  return (
    <div>
      <div className="section-tag">PUBLIC PARAMETER GOVERNANCE</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🗳️ JANMAT: Transparent Multi-Factor Priority Scoring
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Transparent configuration of civic priority scoring parameters. Show factor contributions instead of a mysterious "AI score." All weight changes are audited with justification.
      </div>

      {/* Composite Score Banner */}
      <div className="glass-card" style={{ borderLeft: `4px solid ${scoreColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>COMPOSITE PRIORITY SCORE (CN-001: Evening Transport Gap)</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.3rem' }}>
            <span className="mono-text" style={{ fontSize: '2.5rem', fontWeight: 800, color: scoreColor }}>{(compositeScore * 100).toFixed(1)}</span>
            <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>/ 100</span>
          </div>
          <div className="mono-text" style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>
            = Σ(factor_weight × factor_value) − Σ(penalty_weight × penalty_value)
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setEditMode(!editMode)} className={`btn ${editMode ? 'btn-primary' : ''}`}>
            {editMode ? '🔒 Lock Parameters' : '⚙️ Edit Weights'}
          </button>
          {editMode && (
            <button onClick={handlePublish} className="btn btn-primary">
              📤 Publish Changes
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem' }}>
        {/* Factor Breakdown */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>POSITIVE SCORING FACTORS</div>
          {factors.map(f => (
            <div key={f.id} className="glass-card" style={{ padding: '0.8rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ color: f.color, fontSize: '0.9rem' }}>{f.label}</strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="mono-text" style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Weight:</span>
                  {editMode ? (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={f.weight}
                      onChange={e => handleWeightChange(f.id, e.target.value)}
                      style={{ width: '60px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--cyan)', borderRadius: '4px', color: '#fff', padding: '0.2rem 0.4rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}
                    />
                  ) : (
                    <span className="mono-text" style={{ color: 'var(--cyan)', fontWeight: 700 }}>{f.weight.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginBottom: '0.5rem' }}>{f.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${f.value * 100}%`, background: f.color, height: '100%', borderRadius: '9999px' }} />
                </div>
                <span className="mono-text" style={{ fontSize: '0.78rem', color: f.color, fontWeight: 700, minWidth: '40px' }}>{(f.value * 100).toFixed(0)}%</span>
                <span className="mono-text" style={{ fontSize: '0.72rem', color: '#64748B' }}>contrib: +{(f.weight * f.value * 100).toFixed(1)}</span>
              </div>
            </div>
          ))}

          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem', marginTop: '0.3rem' }}>PENALTY FACTORS</div>
          {penalties.map(p => (
            <div key={p.id} className="glass-card" style={{ padding: '0.8rem 1rem', borderLeft: `3px solid ${p.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ color: p.color, fontSize: '0.9rem' }}>⊖ {p.label}</strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="mono-text" style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Weight:</span>
                  {editMode ? (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="0.5"
                      value={Math.abs(p.weight)}
                      onChange={e => handleWeightChange(p.id, e.target.value, true)}
                      style={{ width: '60px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--neon-red)', borderRadius: '4px', color: '#fff', padding: '0.2rem 0.4rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}
                    />
                  ) : (
                    <span className="mono-text" style={{ color: 'var(--neon-red)', fontWeight: 700 }}>−{Math.abs(p.weight).toFixed(2)}</span>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginBottom: '0.4rem' }}>{p.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${p.value * 100}%`, background: p.color, height: '100%', borderRadius: '9999px' }} />
                </div>
                <span className="mono-text" style={{ fontSize: '0.74rem', color: p.color, fontWeight: 700 }}>{(p.value * 100).toFixed(0)}%</span>
                <span className="mono-text" style={{ fontSize: '0.72rem', color: '#64748B' }}>penalty: −{(Math.abs(p.weight) * p.value * 100).toFixed(1)}</span>
              </div>
            </div>
          ))}

          {/* Justification box when editing */}
          {editMode && (
            <div className="glass-card" style={{ borderLeft: '3px solid var(--amber)', padding: '0.8rem 1rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--amber)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>CHANGE JUSTIFICATION (REQUIRED)</div>
              <textarea
                value={justification}
                onChange={e => setJustification(e.target.value)}
                placeholder="Explain why these parameter weights are being changed (recorded in audit trail)..."
                rows={3}
                style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,165,0,0.3)', borderRadius: '6px', color: '#fff', padding: '0.5rem 0.7rem', fontSize: '0.82rem', fontFamily: 'var(--font-ui)', resize: 'vertical', outline: 'none' }}
              />
            </div>
          )}
        </div>

        {/* Governance History */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>GOVERNANCE HISTORY</div>
          <div className="glass-card">
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.8rem' }}>
              Auditable record of every parameter change made to the priority scoring model.
            </div>
            {GOV_HISTORY.map((g, i) => (
              <div key={g.id} style={{ padding: '0.6rem 0', borderBottom: i < GOV_HISTORY.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.74rem', fontWeight: 700 }}>{g.id}</span>
                  <span className="mono-text" style={{ fontSize: '0.7rem', color: '#64748B' }}>{g.date}</span>
                </div>
                <div style={{ fontSize: '0.84rem', color: '#E2E8F0', marginBottom: '0.2rem' }}>{g.action}</div>
                <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                  <strong style={{ color: 'var(--violet)' }}>{g.actor}</strong> — {g.reason}
                </div>
              </div>
            ))}
          </div>

          {/* Formula Display */}
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem', marginTop: '0.3rem' }}>SCORING FORMULA</div>
          <div className="glass-card" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#CBD5E1', lineHeight: 1.8 }}>
            <div style={{ color: 'var(--neon-green)', marginBottom: '0.4rem', fontWeight: 700 }}>Score = Σ(positive) − Σ(penalties)</div>
            {factors.map(f => (
              <div key={f.id}>
                <span style={{ color: f.color }}>+ {f.weight.toFixed(2)}</span> × {f.label} ({(f.value * 100).toFixed(0)}%) = <strong style={{ color: '#fff' }}>+{(f.weight * f.value * 100).toFixed(1)}</strong>
              </div>
            ))}
            {penalties.map(p => (
              <div key={p.id}>
                <span style={{ color: p.color }}>− {Math.abs(p.weight).toFixed(2)}</span> × {p.label} ({(p.value * 100).toFixed(0)}%) = <strong style={{ color: 'var(--neon-red)' }}>−{(Math.abs(p.weight) * p.value * 100).toFixed(1)}</strong>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.5rem', paddingTop: '0.5rem', fontSize: '0.85rem' }}>
              <strong style={{ color: scoreColor }}>TOTAL = {(compositeScore * 100).toFixed(1)} / 100</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
