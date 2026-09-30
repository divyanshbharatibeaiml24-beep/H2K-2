import React, { useState } from 'react';
import { WARDS } from '../data/seedData';

const WARD_SCORECARDS = WARDS.map(w => ({
  ...w,
  satisfaction: Math.round(40 + Math.random() * 50),
  responseTime: Math.round(2 + Math.random() * 20),
  resolutionRate: Math.round(45 + Math.random() * 50),
  activeProjects: Math.floor(1 + Math.random() * 4),
  signalsThisMonth: Math.floor(5 + Math.random() * 25),
  silentFlag: w.silent || false,
  criticalFlag: w.critical || false
}));

const AGGREGATE_METRICS = [
  { label: 'Total Citizen Signals', value: '147', delta: '+23', trend: 'up', color: 'var(--cyan)' },
  { label: 'Needs Clusters Active', value: '12', delta: '+2', trend: 'up', color: 'var(--violet)' },
  { label: 'Avg Resolution Time', value: '8.3d', delta: '-1.2d', trend: 'down', color: 'var(--neon-green)' },
  { label: 'Citizen Satisfaction', value: '72%', delta: '+4%', trend: 'up', color: 'var(--neon-green)' },
  { label: 'Active Projects', value: '9', delta: '+1', trend: 'up', color: 'var(--amber)' },
  { label: 'Impact Receipts Issued', value: '3', delta: '+1', trend: 'up', color: 'var(--neon-green)' }
];

const SERVICE_BREAKDOWN = [
  { service: 'Public Transport', signals: 38, resolved: 24, pending: 14, pct: 63, color: 'var(--cyan)' },
  { service: 'Water Supply', signals: 27, resolved: 18, pending: 9, pct: 67, color: 'var(--violet)' },
  { service: 'Drainage & Sanitation', signals: 22, resolved: 11, pending: 11, pct: 50, color: 'var(--amber)' },
  { service: 'Street Lighting', signals: 19, resolved: 16, pending: 3, pct: 84, color: 'var(--neon-green)' },
  { service: 'Road Maintenance', signals: 24, resolved: 15, pending: 9, pct: 63, color: 'var(--cyan)' },
  { service: 'Healthcare', signals: 17, resolved: 8, pending: 9, pct: 47, color: 'var(--neon-red)' }
];

export default function PublicInsightsView({ onSelectPage, triggerNotification }) {
  const [selectedWard, setSelectedWard] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div>
      <div className="section-tag">AGGREGATED COMMUNITY SCORECARDS</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        📊 Public Insights: Privacy-Preserved Civic Performance
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Aggregated statistics only — no individual-level data exposed. Small-cell suppression applied. All metrics represent community-level outcomes.
      </div>

      {/* Time Range Selector */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
        {['7d', '30d', '90d', '12m'].map(t => (
          <button key={t} onClick={() => setTimeRange(t)} className={`btn ${timeRange === t ? 'btn-primary' : ''}`} style={{ fontSize: '0.78rem', padding: '0.35rem 0.8rem' }}>
            {t === '7d' ? '7 Days' : t === '30d' ? '30 Days' : t === '90d' ? '90 Days' : '12 Months'}
          </button>
        ))}
      </div>

      {/* Aggregate Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem', marginBottom: '1.2rem' }}>
        {AGGREGATE_METRICS.map((m, i) => (
          <div key={i} className="glass-card" style={{ padding: '0.8rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>{m.label}</div>
            <div className="mono-text" style={{ fontSize: '1.8rem', fontWeight: 800, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: '0.74rem', color: m.trend === 'down' ? 'var(--neon-green)' : 'var(--amber)', marginTop: '0.2rem' }}>
              {m.trend === 'up' ? '↑' : '↓'} {m.delta} vs prev period
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
        {/* Service Category Breakdown */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>SERVICE CATEGORY PERFORMANCE</div>
          <div className="glass-card">
            {SERVICE_BREAKDOWN.map((s, i) => (
              <div key={i} style={{ padding: '0.6rem 0', borderBottom: i < SERVICE_BREAKDOWN.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <strong style={{ color: '#E2E8F0', fontSize: '0.88rem' }}>{s.service}</strong>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <span className="mono-text" style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{s.resolved}/{s.signals} resolved</span>
                    <span className={`badge ${s.pct >= 70 ? 'badge-green' : s.pct >= 50 ? 'badge-amber' : 'badge-red'}`} style={{ fontSize: '0.62rem' }}>
                      {s.pct}%
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${s.pct}%`, background: s.color, height: '100%', borderRadius: '9999px', transition: 'width 0.5s ease' }} />
                  </div>
                  <span className="mono-text" style={{ fontSize: '0.7rem', color: '#64748B', minWidth: '55px' }}>{s.pending} pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ward Scorecards */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>WARD-LEVEL SCORECARDS</div>
          {WARD_SCORECARDS.map(w => {
            const isSelected = selectedWard === w.id;
            return (
              <div
                key={w.id}
                className="glass-card"
                style={{
                  cursor: 'pointer', padding: '0.7rem 0.9rem',
                  ...(w.criticalFlag ? { borderLeft: '3px solid var(--neon-red)' } : w.silentFlag ? { borderLeft: '3px solid var(--amber)' } : {}),
                  ...(isSelected ? { border: '1px solid var(--cyan)' } : {})
                }}
                onClick={() => setSelectedWard(isSelected ? null : w.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <div>
                    <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.72rem', fontWeight: 700 }}>{w.id}</span>
                    <span style={{ color: '#E2E8F0', fontSize: '0.88rem', marginLeft: '0.5rem', fontWeight: 600 }}>{w.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {w.criticalFlag && <span className="badge badge-red" style={{ fontSize: '0.58rem' }}>HOTSPOT</span>}
                    {w.silentFlag && <span className="badge badge-amber" style={{ fontSize: '0.58rem' }}>SILENT</span>}
                  </div>
                </div>

                {isSelected && (
                  <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.6rem' }} className="mono-text">
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                      Satisfaction: <strong style={{ color: w.satisfaction >= 70 ? 'var(--neon-green)' : 'var(--amber)' }}>{w.satisfaction}%</strong>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                      Avg Response: <strong style={{ color: w.responseTime <= 5 ? 'var(--neon-green)' : 'var(--amber)' }}>{w.responseTime}d</strong>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                      Resolution: <strong style={{ color: w.resolutionRate >= 70 ? 'var(--neon-green)' : 'var(--amber)' }}>{w.resolutionRate}%</strong>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                      Signals: <strong style={{ color: 'var(--cyan)' }}>{w.signalsThisMonth}</strong> this month
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                      Projects: <strong>{w.activeProjects}</strong> active
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                      Population: <strong>{w.population.toLocaleString()}</strong>
                    </div>
                  </div>
                )}

                {!isSelected && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }} className="mono-text">
                    <span>Satisfaction: {w.satisfaction}%</span>
                    <span>Signals: {w.signalsThisMonth}</span>
                    <span>Resolution: {w.resolutionRate}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy Notice */}
      <div style={{ marginTop: '0.8rem', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '8px', padding: '0.6rem 1rem', fontSize: '0.76rem', color: '#94A3B8', textAlign: 'center' }}>
        🔒 All data displayed is aggregated at ward level. Individual citizen submissions are not exposed. Small-cell suppression is applied where population counts fall below statistical thresholds.
      </div>
    </div>
  );
}
