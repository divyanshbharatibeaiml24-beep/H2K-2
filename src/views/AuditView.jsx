import React, { useState } from 'react';

const AUDIT_EVENTS = [
  { id: 'AE-001', event: 'CITIZEN_SIGNAL_CREATED', timestamp: '2026-09-28T19:32:14Z', actor: 'citizen/anon-w03-001', service: 'JANASRUTI', object: 'SIG-001', jurisdiction: 'Zone-13', model: null, correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-002', event: 'SIGNAL_NORMALIZED', timestamp: '2026-09-28T19:32:18Z', actor: 'service/manthan-asr', service: 'MANTHAN', object: 'SIG-001', jurisdiction: 'Zone-13', model: 'whisper-large-v3', correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-003', event: 'INTENT_EXTRACTED', timestamp: '2026-09-28T19:32:22Z', actor: 'service/manthan-nlp', service: 'MANTHAN', object: 'SIG-001', jurisdiction: 'Zone-13', model: 'civic-intent-v2.1', correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-004', event: 'GRAPH_EDGE_CREATED', timestamp: '2026-09-28T19:32:25Z', actor: 'service/janagraph', service: 'JANAGRAPH', object: 'SIG-001→CN-001', jurisdiction: 'Zone-13', model: null, correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-005', event: 'NEED_CLUSTER_UPDATED', timestamp: '2026-09-28T20:15:00Z', actor: 'service/janagraph-cluster', service: 'JANAGRAPH', object: 'CN-001', jurisdiction: 'Zone-13', model: 'hdbscan-civic-v1', correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-006', event: 'HOTSPOT_FLAGGED', timestamp: '2026-09-28T20:15:05Z', actor: 'service/discovery', service: 'DISCOVERY', object: 'W-03', jurisdiction: 'Zone-13', model: null, correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-007', event: 'FORECAST_UPDATED', timestamp: '2026-09-29T06:00:00Z', actor: 'service/forecast', service: 'FORECAST', object: 'W-03/transport', jurisdiction: 'Zone-13', model: 'gbm-demand-v3', correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-008', event: 'SCENARIO_GENERATED', timestamp: '2026-09-29T10:00:00Z', actor: 'service/scenario-engine', service: 'SIMULATION', object: 'SC-A/SC-B/SC-C', jurisdiction: 'Zone-13', model: 'monte-carlo-v2', correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-009', event: 'NIRNAY_CONSENSUS', timestamp: '2026-09-29T10:30:00Z', actor: 'service/nirnay-agents', service: 'NIRNAY', object: 'CN-001→SC-A', jurisdiction: 'Zone-13', model: 'nirnay-multi-v6', correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-010', event: 'DECISION_RECORDED', timestamp: '2026-09-29T16:00:00Z', actor: 'user/commissioner', service: 'DECISION_DESK', object: 'WARRANT-2026-0929', jurisdiction: 'Zone-13', model: null, correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-011', event: 'PROJECT_CREATED', timestamp: '2026-09-29T16:05:00Z', actor: 'service/project-mgr', service: 'PROJECTS', object: 'PRJ-001', jurisdiction: 'Zone-13', model: null, correlation: 'COR-2026-0928-001', status: 'complete' },
  { id: 'AE-012', event: 'IMPACT_RECEIPT_PENDING', timestamp: '2026-09-30T09:00:00Z', actor: 'service/praman', service: 'PRAMAN', object: 'IR-PENDING-001', jurisdiction: 'Zone-13', model: null, correlation: 'COR-2026-0928-001', status: 'active' }
];

const eventColor = (evt) => {
  if (evt.includes('CITIZEN') || evt.includes('SIGNAL')) return 'var(--cyan)';
  if (evt.includes('GRAPH') || evt.includes('CLUSTER') || evt.includes('HOTSPOT')) return 'var(--violet)';
  if (evt.includes('FORECAST') || evt.includes('SCENARIO')) return 'var(--amber)';
  if (evt.includes('NIRNAY') || evt.includes('DECISION')) return 'var(--neon-green)';
  if (evt.includes('PROJECT') || evt.includes('IMPACT')) return 'var(--neon-red)';
  return 'var(--cyan)';
};

export default function AuditView({ onSelectPage, triggerNotification }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCorrelation, setFilterCorrelation] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const filteredEvents = filterCorrelation
    ? AUDIT_EVENTS.filter(e => e.correlation === filterCorrelation)
    : AUDIT_EVENTS;

  const handleVerifyChain = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      triggerNotification('🔒 Chain Verified', 'All 12 audit events in correlation COR-2026-0928-001 form a complete, tamper-evident decision chain.', 'Audit Provenance Engine', 'success');
    }, 2000);
  };

  const handleTraceBack = (eventId) => {
    const event = AUDIT_EVENTS.find(e => e.id === eventId);
    setFilterCorrelation(event?.correlation || '');
    setSelectedEvent(eventId);
    triggerNotification('🔍 Trace Initiated', `Tracing decision chain from ${eventId} back to original citizen signal.`, 'Audit Engine', 'success');
  };

  return (
    <div>
      <div className="section-tag">CRYPTOGRAPHIC LEDGER EXPLORER</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🔒 Audit & Provenance: Immutable Event History
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Every consequential action creates an audit event. Trace any decision back to the original citizen signals. Model-backed actions record model_version.
      </div>

      {/* Controls */}
      <div className="glass-card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', padding: '0.8rem 1rem' }}>
        <div style={{ flex: '1 1 250px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>CORRELATION FILTER</div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <input
              value={filterCorrelation}
              onChange={e => setFilterCorrelation(e.target.value)}
              placeholder="COR-2026-0928-001"
              style={{
                flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,212,255,0.3)',
                borderRadius: '6px', padding: '0.4rem 0.7rem', color: '#fff', fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)', outline: 'none'
              }}
            />
            {filterCorrelation && (
              <button onClick={() => setFilterCorrelation('')} className="btn" style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}>Clear</button>
            )}
          </div>
        </div>
        <button onClick={handleVerifyChain} disabled={verifying} className="btn btn-primary" style={{ padding: '0.5rem 1.2rem' }}>
          {verifying ? '⏳ Verifying...' : '🔗 Verify Chain Integrity'}
        </button>
        <button onClick={() => handleTraceBack('AE-012')} className="btn" style={{ padding: '0.5rem 1rem' }}>
          🔍 Trace from Latest
        </button>
      </div>

      {/* Chain Verification Result */}
      {verified && (
        <div className="glass-card" style={{ borderLeft: '4px solid var(--neon-green)', padding: '0.7rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-green" style={{ fontSize: '0.72rem', marginRight: '0.6rem' }}>✓ CHAIN INTEGRITY VERIFIED</span>
            <span style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>All {AUDIT_EVENTS.length} events form a complete, unbroken provenance chain.</span>
          </div>
          <div className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--violet)' }}>
            Hash: <code style={{ color: 'var(--violet)' }}>0x3a8f7c2d...e91b</code>
          </div>
        </div>
      )}

      {/* Event Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
            EVENT CHAIN ({filteredEvents.length} events)
          </div>
          {filteredEvents.map((e, i) => {
            const isSelected = selectedEvent === e.id;
            return (
              <div
                key={e.id}
                className="glass-card"
                style={{
                  cursor: 'pointer', padding: '0.7rem 0.9rem',
                  borderLeft: `3px solid ${eventColor(e.event)}`,
                  ...(isSelected ? { border: `1px solid ${eventColor(e.event)}`, boxShadow: `0 0 10px ${eventColor(e.event)}33` } : {})
                }}
                onClick={() => setSelectedEvent(isSelected ? null : e.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="mono-text" style={{ color: eventColor(e.event), fontSize: '0.74rem', fontWeight: 700 }}>{e.id}</span>
                    <span className="mono-text" style={{ color: '#E2E8F0', fontSize: '0.78rem', fontWeight: 600 }}>{e.event}</span>
                  </div>
                  <span className={`badge ${e.status === 'complete' ? 'badge-green' : 'badge-cyan'}`} style={{ fontSize: '0.6rem' }}>
                    {e.status === 'complete' ? '✓' : '●'} {e.status.toUpperCase()}
                  </span>
                </div>

                <div className="mono-text" style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span>Service: <strong style={{ color: 'var(--cyan)' }}>{e.service}</strong></span>
                  <span>Object: <strong>{e.object}</strong></span>
                  <span>{new Date(e.timestamp).toLocaleString()}</span>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <div style={{ marginTop: '0.6rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.6rem', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#CBD5E1', lineHeight: 1.8 }}>
                    <div>Actor: <strong style={{ color: 'var(--cyan)' }}>{e.actor}</strong></div>
                    <div>Jurisdiction: <strong>{e.jurisdiction}</strong></div>
                    <div>Correlation: <strong style={{ color: 'var(--violet)' }}>{e.correlation}</strong></div>
                    {e.model && <div>Model Version: <strong style={{ color: 'var(--amber)' }}>{e.model}</strong></div>}
                    <div>Event Hash: <code style={{ color: 'var(--violet)' }}>0x{e.id.replace('AE-', '')}a7f3c2d9...{e.id.slice(-3)}</code></div>
                    <div style={{ marginTop: '0.4rem' }}>
                      <button onClick={() => handleTraceBack(e.id)} className="btn" style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
                        🔍 Trace Full Chain
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Decision Chain Visualization */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>DECISION CHAIN FLOW</div>
          <div className="glass-card">
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '0.8rem' }}>
              Trace from any event back to the original citizen signal.
            </div>
            {[
              { stage: 'Citizen Signal', events: ['AE-001'], color: 'var(--cyan)', icon: '🎙️' },
              { stage: 'AI Processing', events: ['AE-002', 'AE-003'], color: 'var(--cyan)', icon: '🧠' },
              { stage: 'Graph & Clustering', events: ['AE-004', 'AE-005', 'AE-006'], color: 'var(--violet)', icon: '🔗' },
              { stage: 'Forecasting', events: ['AE-007'], color: 'var(--amber)', icon: '📈' },
              { stage: 'Simulation', events: ['AE-008'], color: 'var(--amber)', icon: '🔮' },
              { stage: 'Decision Support', events: ['AE-009'], color: 'var(--neon-green)', icon: '⚖️' },
              { stage: 'Human Decision', events: ['AE-010'], color: 'var(--neon-green)', icon: '🏛️' },
              { stage: 'Implementation', events: ['AE-011'], color: 'var(--neon-red)', icon: '🏗️' },
              { stage: 'Impact Verification', events: ['AE-012'], color: 'var(--neon-red)', icon: '📜' }
            ].map((stage, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.15rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '24px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: stage.color, color: '#060913', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                    {stage.icon}
                  </div>
                  {i < arr.length - 1 && <div style={{ width: '2px', height: '20px', background: 'rgba(255,255,255,0.15)' }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: '0.3rem' }}>
                  <strong style={{ color: stage.color, fontSize: '0.82rem' }}>{stage.stage}</strong>
                  <div className="mono-text" style={{ fontSize: '0.68rem', color: '#64748B' }}>
                    {stage.events.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Audit Statistics */}
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem', marginTop: '0.3rem' }}>AUDIT STATISTICS</div>
          <div className="glass-card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }} className="mono-text">
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Total Events: <strong style={{ color: 'var(--cyan)' }}>{AUDIT_EVENTS.length}</strong></div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Correlations: <strong style={{ color: 'var(--violet)' }}>1</strong></div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Model-backed: <strong style={{ color: 'var(--amber)' }}>{AUDIT_EVENTS.filter(e => e.model).length}</strong></div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Human actions: <strong style={{ color: 'var(--neon-green)' }}>{AUDIT_EVENTS.filter(e => e.actor.startsWith('user')).length}</strong></div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Active: <strong style={{ color: 'var(--cyan)' }}>{AUDIT_EVENTS.filter(e => e.status === 'active').length}</strong></div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Integrity: <strong style={{ color: verified ? 'var(--neon-green)' : '#64748B' }}>{verified ? 'VERIFIED' : 'UNVERIFIED'}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
