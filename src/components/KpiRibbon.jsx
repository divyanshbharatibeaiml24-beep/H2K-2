import React from 'react';

export default function KpiRibbon({ signalsCount = 6, needsCount = 4 }) {
  return (
    <div className="kpi-ribbon">
      <div className="kpi-item">
        <div className="kpi-label">
          <span className="status-dot dot-cyan"></span> Active Signals
        </div>
        <div className="kpi-value" style={{ color: 'var(--cyan)' }}>
          {signalsCount}
        </div>
        <div className="kpi-sub">&uarr; +14% this week (multilingual)</div>
      </div>

      <div className="kpi-item">
        <div className="kpi-label">
          <span className="status-dot dot-violet"></span> Clustered Needs
        </div>
        <div className="kpi-value" style={{ color: 'var(--violet)' }}>
          {needsCount}
        </div>
        <div className="kpi-sub">HDBSCAN fusion verified</div>
      </div>

      <div className="kpi-item">
        <div className="kpi-label">
          <span className="status-dot dot-amber"></span> Silent Zones Flagged
        </div>
        <div className="kpi-value" style={{ color: 'var(--amber)' }}>
          1
        </div>
        <div className="kpi-sub">High deficit &bull; low reporting</div>
      </div>

      <div className="kpi-item">
        <div className="kpi-label">
          <span className="status-dot dot-green"></span> Capital Pipeline
        </div>
        <div className="kpi-value" style={{ color: 'var(--neon-green)' }}>
          ₹3.8Cr
        </div>
        <div className="kpi-sub">6 interventions active</div>
      </div>

      <div className="kpi-item">
        <div className="kpi-label">
          <span className="status-dot dot-cyan"></span> Decision Velocity
        </div>
        <div className="kpi-value">4.2d</div>
        <div className="kpi-sub">Signal-to-brief benchmark</div>
      </div>

      <div className="kpi-item">
        <div className="kpi-label">
          <span className="status-dot dot-green"></span> Impact Verified
        </div>
        <div className="kpi-value" style={{ color: 'var(--neon-green)' }}>
          87.4%
        </div>
        <div className="kpi-sub">PRAMAN tamper-proof audit</div>
      </div>
    </div>
  );
}
