import React from 'react';

export default function CivicNeedsView({ needs, onSelectPage, triggerNotification, onRecluster }) {
  const handleReclusterClick = () => {
    onRecluster();
    triggerNotification(
      "🔄 HDBSCAN Clusters Recomputed!",
      "Recalibrated graph weights across all active citizen signals. Semantic fusion synchronized.",
      "JANAGRAPH Engine",
      "success"
    );
  };

  return (
    <div>
      <div className="section-tag">JANAGRAPH FUSION & CLUSTER INTELLIGENCE</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🧩 Civic Need Clusters & Evidence Provenance
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Synthesizing thousands of fragmented citizen complaints into coherent, actionable civic needs using HDBSCAN semantic-spatial-temporal embeddings, while preserving 100% of raw submissions as sovereign evidence.
      </div>

      {/* Ribbon */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <div className="kpi-label">Active Need Clusters</div>
            <div className="kpi-value" style={{ color: 'var(--violet)' }}>{needs.length}</div>
          </div>
          <div>
            <div className="kpi-label">Total Corroborating Signals</div>
            <div className="kpi-value" style={{ color: 'var(--cyan)' }}>
              {needs.reduce((acc, n) => acc + (n.evidence_count || 10), 0)}
            </div>
          </div>
        </div>

        <div>
          <button onClick={handleReclusterClick} className="btn btn-primary">
            🔄 Recompute HDBSCAN Clusters & Graph Weights
          </button>
        </div>
      </div>

      {/* Grid of Clusters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        {needs.map((need) => (
          <div 
            key={need.id} 
            className="glass-card" 
            style={{ 
              borderLeft: `4px solid ${need.severity === 'critical' ? 'var(--neon-red)' : 'var(--amber)'}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <div>
                  <span className="mono-text" style={{ color: 'var(--violet)', fontWeight: 700, fontSize: '0.8rem' }}>
                    {need.id}
                  </span>
                  <h4 style={{ margin: '0.2rem 0', fontSize: '1.05rem', color: '#FFFFFF' }}>
                    {need.icon} {need.category}
                  </h4>
                </div>
                <span className={`badge ${need.severity === 'critical' ? 'badge-red' : 'badge-amber'}`}>
                  {need.severity.toUpperCase()}
                </span>
              </div>

              <p style={{ color: '#CBD5E1', fontSize: '0.84rem', margin: '0.4rem 0 0.8rem 0' }}>
                {need.description}
              </p>

              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '0.6rem', fontSize: '0.74rem' }} className="mono-text">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>Ward: <strong style={{ color: 'var(--cyan)' }}>{need.ward_name} ({need.ward})</strong></span>
                  <span>Confidence: <strong style={{ color: 'var(--neon-green)' }}>{Math.round(need.confidence * 100)}%</strong></span>
                </div>
                <div>
                  Supporting Raw Signals: <strong style={{ color: '#FFFFFF' }}>{need.evidence_count} submissions</strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '0.9rem' }}>
              <button 
                onClick={() => onSelectPage("Simulation Lab")}
                className="btn btn-full"
                style={{ fontSize: '0.8rem' }}
              >
                ⚡ Evaluate Scenarios in Simulation Lab &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
