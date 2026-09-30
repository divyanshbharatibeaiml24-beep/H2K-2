import React, { useState } from 'react';
import { WARDS, INITIAL_NEEDS, INITIAL_PROJECTS } from '../data/seedData';

const TWIN_LAYERS = [
  { id: 'current', label: 'Current State', icon: '📍', color: 'var(--cyan)', desc: 'What is true now across all wards' },
  { id: 'change', label: 'Change Detection', icon: '🔄', color: 'var(--amber)', desc: 'What is shifting — rising needs, degrading assets' },
  { id: 'future', label: 'Future Projection', icon: '🔮', color: 'var(--violet)', desc: 'Forecasted demand pressure over next 6–12 months' },
  { id: 'dependency', label: 'Dependency Graph', icon: '🔗', color: 'var(--neon-green)', desc: 'Infrastructure prerequisites & causal chains' },
  { id: 'outcome', label: 'Outcome Layer', icon: '📊', color: 'var(--neon-red)', desc: 'Post-intervention measured impact deltas' }
];

const INFRA_ASSETS = [
  { id: 'IA-001', name: 'Velachery Bus Depot', type: 'Transport', ward: 'W-03', health: 0.72, capacity: '68%', deps: ['Road Network W-03', 'Power Grid S-Zone'], status: 'degraded' },
  { id: 'IA-002', name: 'Tondiarpet Water Main', type: 'Water', ward: 'W-06', health: 0.41, capacity: '35%', deps: ['Reservoir R-04', 'Pump Station PS-02'], status: 'critical' },
  { id: 'IA-003', name: 'Adyar Street Light Grid', type: 'Electrical', ward: 'W-01', health: 0.85, capacity: '82%', deps: ['Power Grid S-Zone', 'Transformer T-11'], status: 'healthy' },
  { id: 'IA-004', name: 'Ambattur Storm Drain', type: 'Drainage', ward: 'W-04', health: 0.33, capacity: '22%', deps: ['Canal C-03', 'Pump Station PS-05', 'Sluice Gate SG-02'], status: 'critical' },
  { id: 'IA-005', name: 'Sholinganallur PHC', type: 'Healthcare', ward: 'W-05', health: 0.60, capacity: '45%', deps: ['Road Access R-21', 'Power Grid E-Zone', 'Ambulance Bay AB-3'], status: 'degraded' },
  { id: 'IA-006', name: 'Perambur Arterial Road', type: 'Transport', ward: 'W-08', health: 0.55, capacity: '71%', deps: ['Drainage Sub-line D-08', 'Traffic Signal TS-14'], status: 'degraded' }
];

const GRAPH_EDGES = [
  { from: 'SIG-001', to: 'CN-001', rel: 'supports', color: 'var(--cyan)' },
  { from: 'SIG-002', to: 'CN-002', rel: 'supports', color: 'var(--cyan)' },
  { from: 'CN-001', to: 'W-03', rel: 'occurs_in', color: 'var(--amber)' },
  { from: 'CN-002', to: 'W-06', rel: 'occurs_in', color: 'var(--amber)' },
  { from: 'W-03', to: 'IA-001', rel: 'served_by', color: 'var(--violet)' },
  { from: 'W-06', to: 'IA-002', rel: 'served_by', color: 'var(--violet)' },
  { from: 'PRJ-001', to: 'CN-001', rel: 'targets', color: 'var(--neon-green)' },
  { from: 'PRJ-002', to: 'CN-002', rel: 'targets', color: 'var(--neon-green)' },
  { from: 'IA-001', to: 'Transport', rel: 'delivers', color: 'var(--neon-red)' },
  { from: 'IA-002', to: 'Water Supply', rel: 'delivers', color: 'var(--neon-red)' }
];

export default function CivicTwinView({ onSelectPage, triggerNotification }) {
  const [activeLayer, setActiveLayer] = useState('current');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [twinQuery, setTwinQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);

  const handleQuery = () => {
    const q = twinQuery.toLowerCase();
    let result;
    if (q.includes('velachery') || q.includes('transport') || q.includes('bus')) {
      result = { answer: 'Velachery (W-03) has a critical evening transport gap. Bus Depot IA-001 is at 68% capacity with 0.72 health score. CN-001 cluster has 14 supporting signals. PRJ-001 targets this need with ₹45L allocation.', confidence: 0.91, sources: 3 };
    } else if (q.includes('water') || q.includes('tondiarpet')) {
      result = { answer: 'Tondiarpet (W-06) water main IA-002 is in CRITICAL state — 35% capacity, 0.41 health. 9 citizen signals support need CN-002. PRJ-002 (₹1.2Cr) is approved with 25% milestone progress.', confidence: 0.88, sources: 4 };
    } else if (q.includes('depend') || q.includes('prereq')) {
      result = { answer: 'Infrastructure dependency analysis: 4 of 6 tracked assets have unresolved prerequisites. Ambattur Storm Drain (IA-004) has the deepest chain (3 dependencies). Sholinganallur PHC requires road access before ambulance service can function.', confidence: 0.85, sources: 6 };
    } else {
      result = { answer: `Twin query processed across 8 wards, 6 infrastructure assets, and 4 active needs. No critical findings match "${twinQuery}". Try querying specific wards, services, or infrastructure assets.`, confidence: 0.72, sources: 2 };
    }
    setQueryResult(result);
    triggerNotification('🌐 Twin Query Executed', `Civic Twin returned ${result.sources} evidence sources.`, 'JANAGRAPH Twin Engine', 'success');
  };

  const layer = TWIN_LAYERS.find(l => l.id === activeLayer);
  const healthColor = (h) => h >= 0.7 ? 'var(--neon-green)' : h >= 0.5 ? 'var(--amber)' : 'var(--neon-red)';
  const statusBadge = (s) => s === 'healthy' ? 'badge-green' : s === 'degraded' ? 'badge-amber' : 'badge-red';

  return (
    <div>
      <div className="section-tag">LIVING REGIONAL STATE MODEL</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🌐 Civic Digital Twin: Multi-Dimensional Regional Intelligence
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Query the living state of your jurisdiction. The twin maintains relationships between people, needs, places, services, assets, projects, investments, and outcomes over time.
      </div>

      {/* Layer Selector Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
        {TWIN_LAYERS.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveLayer(l.id)}
            className={`btn ${activeLayer === l.id ? 'btn-primary' : ''}`}
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
          >
            {l.icon} {l.label}
          </button>
        ))}
      </div>

      {/* Active Layer Description */}
      <div className="glass-card" style={{ borderLeft: `4px solid ${layer.color}`, padding: '0.8rem 1.1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '1.3rem', marginRight: '0.5rem' }}>{layer.icon}</span>
            <strong style={{ color: layer.color }}>{layer.label}</strong>
            <span style={{ color: '#94A3B8', fontSize: '0.82rem', marginLeft: '0.8rem' }}>{layer.desc}</span>
          </div>
          <span className="badge badge-cyan">ACTIVE LAYER</span>
        </div>
      </div>

      {/* Twin Natural Language Query */}
      <div className="glass-card" style={{ marginBottom: '1rem' }}>
        <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>TWIN QUERY ENGINE</div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <input
            type="text"
            placeholder='Ask the twin: "What depends on the Velachery bus depot?" or "Show water infrastructure health"'
            value={twinQuery}
            onChange={e => setTwinQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && twinQuery && handleQuery()}
            style={{
              flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '8px', padding: '0.6rem 1rem', color: '#fff', fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)', outline: 'none'
            }}
          />
          <button onClick={handleQuery} disabled={!twinQuery} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem' }}>
            🔍 Query Twin
          </button>
        </div>
        {queryResult && (
          <div style={{ marginTop: '0.8rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.8rem', borderLeft: '3px solid var(--neon-green)' }}>
            <div style={{ fontSize: '0.84rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '0.5rem' }}>{queryResult.answer}</div>
            <div className="mono-text" style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', gap: '1.5rem' }}>
              <span>Confidence: <strong style={{ color: queryResult.confidence >= 0.85 ? 'var(--neon-green)' : 'var(--amber)' }}>{(queryResult.confidence * 100).toFixed(0)}%</strong></span>
              <span>Evidence Sources: <strong style={{ color: 'var(--cyan)' }}>{queryResult.sources}</strong></span>
              <span>Layer: <strong style={{ color: layer.color }}>{layer.label}</strong></span>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1rem' }}>
        {/* Infrastructure Asset Registry */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>INFRASTRUCTURE ASSET REGISTRY</div>
          {INFRA_ASSETS.map(a => (
            <div
              key={a.id}
              className="glass-card"
              style={{ cursor: 'pointer', borderLeft: `3px solid ${healthColor(a.health)}`, ...(selectedAsset === a.id ? { border: `1px solid ${healthColor(a.health)}` } : {}) }}
              onClick={() => setSelectedAsset(selectedAsset === a.id ? null : a.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div>
                  <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.75rem', fontWeight: 700 }}>{a.id}</span>
                  <h4 style={{ margin: '0.15rem 0 0 0', color: '#fff', fontSize: '0.92rem' }}>{a.name}</h4>
                </div>
                <span className={`badge ${statusBadge(a.status)}`}>{a.status.toUpperCase()}</span>
              </div>
              <div className="mono-text" style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'flex', gap: '1.2rem', marginBottom: '0.5rem' }}>
                <span>Type: <strong>{a.type}</strong></span>
                <span>Ward: <strong style={{ color: 'var(--cyan)' }}>{a.ward}</strong></span>
                <span>Capacity: <strong style={{ color: healthColor(a.health) }}>{a.capacity}</strong></span>
              </div>
              {/* Health Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', minWidth: '40px' }}>Health</span>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${a.health * 100}%`, background: healthColor(a.health), height: '100%', borderRadius: '9999px' }} />
                </div>
                <span className="mono-text" style={{ fontSize: '0.74rem', color: healthColor(a.health), fontWeight: 700, minWidth: '35px' }}>{(a.health * 100).toFixed(0)}%</span>
              </div>
              {/* Dependencies Expansion */}
              {selectedAsset === a.id && (
                <div style={{ marginTop: '0.7rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.6rem' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--violet)', fontWeight: 700, marginBottom: '0.3rem' }}>DEPENDENCY CHAIN</div>
                  {a.deps.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.76rem', color: '#CBD5E1', marginBottom: '0.2rem' }}>
                      <span style={{ color: 'var(--violet)' }}>→</span> {d}
                      <span className="badge badge-green" style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>RESOLVED</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Graph Relationship Explorer */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>JANAGRAPH RELATIONSHIP EDGES</div>
          <div className="glass-card">
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.8rem' }}>
              Live entity relationships linking signals, needs, places, assets, services, and projects.
            </div>
            {GRAPH_EDGES.map((e, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 0.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.78rem'
              }}>
                <span className="mono-text" style={{ color: 'var(--cyan)', fontWeight: 600, minWidth: '55px' }}>{e.from}</span>
                <span style={{ color: e.color, fontWeight: 700, fontSize: '0.72rem' }}>—{e.rel}→</span>
                <span className="mono-text" style={{ color: '#E2E8F0', fontWeight: 600 }}>{e.to}</span>
              </div>
            ))}
          </div>

          {/* Ward Health Summary */}
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}>WARD HEALTH MATRIX</div>
          <div className="glass-card">
            {WARDS.slice(0, 6).map(w => {
              const wardAssets = INFRA_ASSETS.filter(a => a.ward === w.id);
              const avgHealth = wardAssets.length > 0 ? wardAssets.reduce((sum, a) => sum + a.health, 0) / wardAssets.length : 0.5;
              return (
                <div key={w.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.74rem', fontWeight: 700, minWidth: '38px' }}>{w.id}</span>
                  <span style={{ flex: 1, fontSize: '0.82rem', color: '#E2E8F0' }}>{w.name}</span>
                  <div style={{ width: '80px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${avgHealth * 100}%`, background: healthColor(avgHealth), height: '100%', borderRadius: '9999px' }} />
                  </div>
                  <span className="mono-text" style={{ fontSize: '0.72rem', color: healthColor(avgHealth), fontWeight: 700, minWidth: '35px' }}>{(avgHealth * 100).toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
