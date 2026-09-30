import React, { useState } from 'react';

const DATA_SOURCES = [
  {
    id: 'DS-001', name: 'Citizen Signal Intake Pipeline', type: 'Real-time Stream',
    feeds: ['WhatsApp Voice', 'WhatsApp Text', 'IVR Calls', 'Web Portal', 'SMS Gateway', 'Kiosk Terminals'],
    records: 147, freshness: '< 1 min', quality: 0.94, status: 'healthy',
    schema: { fields: 8, validated: 8, issues: 0 },
    lastSync: '2026-09-30T09:28:00Z'
  },
  {
    id: 'DS-002', name: 'Municipal Infrastructure Registry', type: 'Batch Sync',
    feeds: ['GIS Asset Database', 'Maintenance Logs', 'Capacity Reports'],
    records: 342, freshness: '4h', quality: 0.87, status: 'healthy',
    schema: { fields: 14, validated: 13, issues: 1 },
    lastSync: '2026-09-30T05:00:00Z'
  },
  {
    id: 'DS-003', name: 'Census & Demographic Context', type: 'Static Reference',
    feeds: ['Census 2021', 'Ward Population Estimates', 'Socio-Economic Indicators'],
    records: 8, freshness: '30d', quality: 0.82, status: 'stale',
    schema: { fields: 22, validated: 20, issues: 2 },
    lastSync: '2026-08-30T00:00:00Z'
  },
  {
    id: 'DS-004', name: 'Transport Network Feeds', type: 'API Feed',
    feeds: ['MTC Bus Schedule API', 'CMRL Metro Data', 'Traffic Signal Network'],
    records: 1240, freshness: '15 min', quality: 0.91, status: 'healthy',
    schema: { fields: 11, validated: 11, issues: 0 },
    lastSync: '2026-09-30T09:15:00Z'
  },
  {
    id: 'DS-005', name: 'Weather & Climate Risk', type: 'API Feed',
    feeds: ['IMD Weather Station', 'Flood Risk Model', 'Rainfall Gauge Network'],
    records: 520, freshness: '1h', quality: 0.88, status: 'degraded',
    schema: { fields: 9, validated: 8, issues: 1 },
    lastSync: '2026-09-30T08:30:00Z'
  },
  {
    id: 'DS-006', name: 'Financial & Budget Systems', type: 'Batch Sync',
    feeds: ['Municipal Budget Ledger', 'Expenditure Tracking', 'Fund Allocation Reports'],
    records: 89, freshness: '24h', quality: 0.95, status: 'healthy',
    schema: { fields: 16, validated: 16, issues: 0 },
    lastSync: '2026-09-29T18:00:00Z'
  }
];

const QUALITY_CHECKS = [
  { check: 'Schema Validation', passed: 74, failed: 4, status: 'pass', desc: 'All fields conform to expected types and constraints' },
  { check: 'Freshness Compliance', passed: 5, failed: 1, status: 'warn', desc: 'DS-003 exceeds 7-day freshness threshold' },
  { check: 'Completeness', passed: 6, failed: 0, status: 'pass', desc: 'No null values in required fields across all sources' },
  { check: 'Referential Integrity', passed: 6, failed: 0, status: 'pass', desc: 'All foreign keys resolve to valid records' },
  { check: 'Duplicate Detection', passed: 5, failed: 1, status: 'warn', desc: 'Potential duplicates in citizen signals (2 flagged)' },
  { check: 'Synthetic Data Flag', passed: 6, failed: 0, status: 'pass', desc: 'All demo data marked with synthetic/demo flag' }
];

export default function DataSourcesView({ onSelectPage, triggerNotification }) {
  const [selectedSource, setSelectedSource] = useState(null);
  const [refreshing, setRefreshing] = useState(null);

  const handleRefresh = (id) => {
    setRefreshing(id);
    setTimeout(() => {
      setRefreshing(null);
      triggerNotification('🗄️ Data Source Refreshed', `${id} sync completed. Schema validated, quality checks passed.`, 'Data Pipeline', 'success');
    }, 1500);
  };

  const statusColor = (s) => s === 'healthy' ? 'var(--neon-green)' : s === 'degraded' ? 'var(--amber)' : 'var(--neon-red)';
  const statusBadge = (s) => s === 'healthy' ? 'badge-green' : s === 'degraded' ? 'badge-amber' : 'badge-red';

  return (
    <div>
      <div className="section-tag">VERIFIED DATA REGISTRY & PIPELINE FEEDS</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🗄️ Sovereign Data Sources: Provenance & Quality
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        All data sources carry provenance metadata: origin, freshness, schema version, and quality scores. Demo data is explicitly flagged as synthetic.
      </div>

      {/* Aggregate Health */}
      <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.8rem', padding: '0.9rem 1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Total Sources</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cyan)' }}>{DATA_SOURCES.length}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Healthy</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-green)' }}>{DATA_SOURCES.filter(d => d.status === 'healthy').length}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Degraded</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--amber)' }}>{DATA_SOURCES.filter(d => d.status === 'degraded').length}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Stale</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-red)' }}>{DATA_SOURCES.filter(d => d.status === 'stale').length}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Total Records</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--violet)' }}>{DATA_SOURCES.reduce((s, d) => s + d.records, 0).toLocaleString()}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Avg Quality</div>
          <div className="mono-text" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--neon-green)' }}>{(DATA_SOURCES.reduce((s, d) => s + d.quality, 0) / DATA_SOURCES.length * 100).toFixed(0)}%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1rem' }}>
        {/* Data Source Cards */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>DATA SOURCE REGISTRY</div>
          {DATA_SOURCES.map(d => {
            const isExpanded = selectedSource === d.id;
            return (
              <div
                key={d.id}
                className="glass-card"
                style={{ cursor: 'pointer', borderLeft: `3px solid ${statusColor(d.status)}` }}
                onClick={() => setSelectedSource(isExpanded ? null : d.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <div>
                    <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.74rem', fontWeight: 700 }}>{d.id}</span>
                    <h4 style={{ margin: '0.1rem 0 0 0', color: '#fff', fontSize: '0.92rem' }}>{d.name}</h4>
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                    <span className={`badge ${statusBadge(d.status)}`} style={{ fontSize: '0.6rem' }}>{d.status.toUpperCase()}</span>
                    <span className="badge badge-violet" style={{ fontSize: '0.6rem' }}>{d.type}</span>
                  </div>
                </div>

                <div className="mono-text" style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                  <span>Records: <strong style={{ color: 'var(--cyan)' }}>{d.records.toLocaleString()}</strong></span>
                  <span>Freshness: <strong style={{ color: d.status === 'stale' ? 'var(--neon-red)' : 'var(--neon-green)' }}>{d.freshness}</strong></span>
                  <span>Quality: <strong style={{ color: d.quality >= 0.9 ? 'var(--neon-green)' : 'var(--amber)' }}>{(d.quality * 100).toFixed(0)}%</strong></span>
                </div>

                {/* Quality Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', minWidth: '45px' }}>Quality</span>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${d.quality * 100}%`, background: d.quality >= 0.9 ? 'var(--neon-green)' : 'var(--amber)', height: '100%', borderRadius: '9999px' }} />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ marginTop: '0.6rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.6rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--violet)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>FEED CHANNELS</div>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                      {d.feeds.map((f, i) => (
                        <span key={i} className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>{f}</span>
                      ))}
                    </div>
                    <div className="mono-text" style={{ fontSize: '0.72rem', color: '#94A3B8', lineHeight: 1.7 }}>
                      <div>Schema Fields: {d.schema.validated}/{d.schema.fields} validated {d.schema.issues > 0 && <span style={{ color: 'var(--amber)' }}>({d.schema.issues} issue{d.schema.issues > 1 ? 's' : ''})</span>}</div>
                      <div>Last Sync: {new Date(d.lastSync).toLocaleString()}</div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRefresh(d.id); }}
                      className="btn btn-primary"
                      disabled={refreshing === d.id}
                      style={{ marginTop: '0.4rem', fontSize: '0.74rem', padding: '0.3rem 0.8rem' }}
                    >
                      {refreshing === d.id ? '⏳ Syncing...' : '🔄 Force Refresh'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quality Checks */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>AUTOMATED QUALITY CHECKS</div>
          <div className="glass-card">
            {QUALITY_CHECKS.map((q, i) => (
              <div key={i} style={{ padding: '0.55rem 0', borderBottom: i < QUALITY_CHECKS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <strong style={{ color: '#E2E8F0', fontSize: '0.86rem' }}>{q.check}</strong>
                  <span className={`badge ${q.status === 'pass' ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '0.6rem' }}>
                    {q.status === 'pass' ? '✓ PASS' : '⚠ WARN'}
                  </span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginBottom: '0.3rem' }}>{q.desc}</div>
                <div className="mono-text" style={{ fontSize: '0.7rem', color: '#64748B' }}>
                  Passed: <strong style={{ color: 'var(--neon-green)' }}>{q.passed}</strong> |
                  Failed: <strong style={{ color: q.failed > 0 ? 'var(--neon-red)' : 'var(--neon-green)' }}>{q.failed}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Data Provenance Note */}
          <div className="glass-card" style={{ borderLeft: '3px solid var(--violet)', padding: '0.7rem 0.9rem', marginTop: '0.3rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--violet)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PROVENANCE POLICY</div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.6 }}>
              Every data record carries: source origin, ingestion timestamp, schema version, quality score, and synthetic/demo flag. Public surfaces aggregate statistics and suppress small cells. Data retention and deletion rules are configured per-source.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
