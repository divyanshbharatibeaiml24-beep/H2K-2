import React, { useState } from 'react';

const MODELS = [
  {
    id: 'MDL-001', name: 'MANTHAN ASR (Whisper-Large-v3)', service: 'JANASRUTI',
    version: 'v3.2.1', accuracy: 0.94, latency: '42ms', status: 'healthy',
    calls_24h: 1247, errors_24h: 3, drift: 0.02, fairness: 0.91,
    languages: ['Tamil', 'Hindi', 'English', 'Telugu'],
    lastCalibrated: '2026-09-28', nextCalibration: '2026-10-05',
    biasMetrics: { gender: 0.96, age: 0.89, dialect: 0.82, literacy: 0.87 }
  },
  {
    id: 'MDL-002', name: 'Civic Intent Classifier', service: 'MANTHAN',
    version: 'v2.1.0', accuracy: 0.91, latency: '18ms', status: 'healthy',
    calls_24h: 1247, errors_24h: 7, drift: 0.04, fairness: 0.88,
    languages: ['Multi-lingual'],
    lastCalibrated: '2026-09-25', nextCalibration: '2026-10-02',
    biasMetrics: { gender: 0.94, age: 0.91, dialect: 0.78, literacy: 0.85 }
  },
  {
    id: 'MDL-003', name: 'HDBSCAN Civic Clusterer', service: 'JANAGRAPH',
    version: 'v1.4.2', accuracy: 0.89, latency: '78ms', status: 'healthy',
    calls_24h: 48, errors_24h: 0, drift: 0.01, fairness: 0.93,
    languages: ['N/A'],
    lastCalibrated: '2026-09-20', nextCalibration: '2026-09-30',
    biasMetrics: { gender: 0.98, age: 0.95, dialect: 0.92, literacy: 0.94 }
  },
  {
    id: 'MDL-004', name: 'Gradient Boosted Demand Forecaster', service: 'FORECAST',
    version: 'v3.0.0', accuracy: 0.89, latency: '120ms', status: 'degraded',
    calls_24h: 96, errors_24h: 5, drift: 0.08, fairness: 0.84,
    languages: ['N/A'],
    lastCalibrated: '2026-09-15', nextCalibration: '2026-09-30',
    biasMetrics: { gender: 0.92, age: 0.86, dialect: 0.90, literacy: 0.81 }
  },
  {
    id: 'MDL-005', name: 'NIRNAY Multi-Agent Synthesizer', service: 'NIRNAY',
    version: 'v6.0.1', accuracy: 0.88, latency: '250ms', status: 'healthy',
    calls_24h: 12, errors_24h: 0, drift: 0.03, fairness: 0.90,
    languages: ['Multi-lingual'],
    lastCalibrated: '2026-09-22', nextCalibration: '2026-10-06',
    biasMetrics: { gender: 0.95, age: 0.88, dialect: 0.85, literacy: 0.90 }
  },
  {
    id: 'MDL-006', name: 'Monte Carlo Scenario Engine', service: 'SIMULATION',
    version: 'v2.3.0', accuracy: 0.85, latency: '340ms', status: 'healthy',
    calls_24h: 24, errors_24h: 1, drift: 0.05, fairness: 0.87,
    languages: ['N/A'],
    lastCalibrated: '2026-09-18', nextCalibration: '2026-10-02',
    biasMetrics: { gender: 0.93, age: 0.90, dialect: 0.88, literacy: 0.86 }
  }
];

const AI_PRINCIPLES = [
  { rule: 'AI output is advisory', desc: 'Authorized humans own consequential decisions. No autonomous public spending.', status: 'enforced' },
  { rule: 'No volume = need assumption', desc: 'Complaint volume is not equated with need without denominator/context analysis.', status: 'enforced' },
  { rule: 'Expose data gaps', desc: 'Uncertainty, missing data, and confidence limitations are always surfaced.', status: 'enforced' },
  { rule: 'No hidden reasoning', desc: 'Evidence-backed claims, assumptions, and counter-arguments are shown.', status: 'enforced' },
  { rule: 'Correlation ≠ causality', desc: 'Effect ranges used where causal analysis is attempted.', status: 'enforced' },
  { rule: 'Structured output only', desc: 'No free-form LLM output directly into the database. JSON schema validation required.', status: 'enforced' }
];

export default function ModelMonitorView({ onSelectPage, triggerNotification }) {
  const [selectedModel, setSelectedModel] = useState(null);
  const [recalibrating, setRecalibrating] = useState(null);

  const handleRecalibrate = (id) => {
    setRecalibrating(id);
    setTimeout(() => {
      setRecalibrating(null);
      triggerNotification('🧠 Model Recalibrated', `${id} recalibration complete. Drift metrics reset, accuracy validated.`, 'Model Monitor', 'success');
    }, 2000);
  };

  const driftColor = (d) => d <= 0.03 ? 'var(--neon-green)' : d <= 0.06 ? 'var(--amber)' : 'var(--neon-red)';

  return (
    <div>
      <div className="section-tag">RESPONSIBLE AI & MODEL TELEMETRY</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🧠 Model Monitor: AI Governance & Fairness Telemetry
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Monitor model accuracy, drift, fairness, and bias metrics. Every model-backed action records model_version. AI output is advisory — authorized humans own consequential decisions.
      </div>

      {/* Aggregate Model Health */}
      <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.8rem', padding: '0.9rem 1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Active Models</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cyan)' }}>{MODELS.length}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Avg Accuracy</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-green)' }}>{(MODELS.reduce((s, m) => s + m.accuracy, 0) / MODELS.length * 100).toFixed(0)}%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Avg Fairness</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--violet)' }}>{(MODELS.reduce((s, m) => s + m.fairness, 0) / MODELS.length * 100).toFixed(0)}%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>24h Calls</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cyan)' }}>{MODELS.reduce((s, m) => s + m.calls_24h, 0).toLocaleString()}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>24h Errors</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--amber)' }}>{MODELS.reduce((s, m) => s + m.errors_24h, 0)}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Drift Alerts</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: MODELS.filter(m => m.drift > 0.05).length > 0 ? 'var(--neon-red)' : 'var(--neon-green)' }}>{MODELS.filter(m => m.drift > 0.05).length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1rem' }}>
        {/* Model Cards */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>MODEL REGISTRY</div>
          {MODELS.map(m => {
            const isExpanded = selectedModel === m.id;
            const statusBadge = m.status === 'healthy' ? 'badge-green' : m.status === 'degraded' ? 'badge-amber' : 'badge-red';
            return (
              <div
                key={m.id}
                className="glass-card"
                style={{ cursor: 'pointer', borderLeft: `3px solid ${m.status === 'healthy' ? 'var(--neon-green)' : 'var(--amber)'}` }}
                onClick={() => setSelectedModel(isExpanded ? null : m.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <div>
                    <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.72rem', fontWeight: 700 }}>{m.id}</span>
                    <h4 style={{ margin: '0.1rem 0 0 0', color: '#fff', fontSize: '0.9rem' }}>{m.name}</h4>
                  </div>
                  <span className={`badge ${statusBadge}`} style={{ fontSize: '0.6rem' }}>{m.status.toUpperCase()}</span>
                </div>

                <div className="mono-text" style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                  <span>Accuracy: <strong style={{ color: 'var(--neon-green)' }}>{(m.accuracy * 100).toFixed(0)}%</strong></span>
                  <span>Drift: <strong style={{ color: driftColor(m.drift) }}>{(m.drift * 100).toFixed(1)}%</strong></span>
                  <span>Latency: <strong>{m.latency}</strong></span>
                  <span>Version: <strong style={{ color: 'var(--violet)' }}>{m.version}</strong></span>
                </div>

                {/* Accuracy bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', minWidth: '55px' }}>Accuracy</span>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${m.accuracy * 100}%`, background: 'var(--neon-green)', height: '100%', borderRadius: '9999px' }} />
                  </div>
                </div>

                {/* Expanded: Bias Metrics */}
                {isExpanded && (
                  <div style={{ marginTop: '0.6rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.6rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--violet)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>FAIRNESS & BIAS METRICS</div>
                    {Object.entries(m.biasMetrics).map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <span style={{ fontSize: '0.74rem', color: '#94A3B8', minWidth: '60px', textTransform: 'capitalize' }}>{key}</span>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '5px', overflow: 'hidden' }}>
                          <div style={{ width: `${val * 100}%`, background: val >= 0.9 ? 'var(--neon-green)' : val >= 0.8 ? 'var(--amber)' : 'var(--neon-red)', height: '100%', borderRadius: '9999px' }} />
                        </div>
                        <span className="mono-text" style={{ fontSize: '0.72rem', color: val >= 0.9 ? 'var(--neon-green)' : val >= 0.8 ? 'var(--amber)' : 'var(--neon-red)', fontWeight: 700, minWidth: '35px' }}>{(val * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                    <div className="mono-text" style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.4rem' }}>
                      <div>Service: <strong style={{ color: 'var(--cyan)' }}>{m.service}</strong></div>
                      <div>Languages: {m.languages.join(', ')}</div>
                      <div>Calibrated: {m.lastCalibrated} | Next: <strong style={{ color: 'var(--amber)' }}>{m.nextCalibration}</strong></div>
                      <div>24h: {m.calls_24h} calls, {m.errors_24h} errors ({((m.errors_24h / m.calls_24h) * 100).toFixed(2)}% error rate)</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRecalibrate(m.id); }}
                      className="btn btn-primary"
                      disabled={recalibrating === m.id}
                      style={{ marginTop: '0.5rem', fontSize: '0.74rem', padding: '0.3rem 0.8rem' }}
                    >
                      {recalibrating === m.id ? '⏳ Recalibrating...' : '🔄 Recalibrate Model'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Responsible AI Principles */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>RESPONSIBLE AI PRINCIPLES</div>
          <div className="glass-card">
            {AI_PRINCIPLES.map((p, i) => (
              <div key={i} style={{ padding: '0.5rem 0', borderBottom: i < AI_PRINCIPLES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <strong style={{ color: '#E2E8F0', fontSize: '0.86rem' }}>{p.rule}</strong>
                  <span className="badge badge-green" style={{ fontSize: '0.6rem' }}>✓ {p.status.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94A3B8' }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Drift Alert Panel */}
          {MODELS.filter(m => m.drift > 0.05).length > 0 && (
            <>
              <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem', marginTop: '0.3rem' }}>DRIFT ALERTS</div>
              {MODELS.filter(m => m.drift > 0.05).map(m => (
                <div key={m.id} className="glass-card" style={{ borderLeft: '3px solid var(--neon-red)', padding: '0.7rem 0.9rem' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--neon-red)', fontWeight: 700, marginBottom: '0.2rem' }}>
                    ⚠️ {m.name} — Drift: {(m.drift * 100).toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8' }}>
                    Model drift exceeds 5% threshold. Recalibration due: <strong style={{ color: 'var(--amber)' }}>{m.nextCalibration}</strong>. Current accuracy may be degraded.
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
