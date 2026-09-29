import React from 'react';

export default function HeaderBanner() {
  return (
    <div className="header-banner">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <h1 className="banner-title" style={{ margin: 0 }}>
            JANAVYUH
          </h1>
          <span className="badge badge-cyan">Sovereign OS</span>
          <span className="badge badge-green">Live v2.4 (Vercel)</span>
        </div>
        <div className="banner-subtitle">
          Sovereign Civic Intelligence & Public Investment Operating System &bull;{' '}
          <span style={{ color: 'var(--cyan)' }}>Every Voice</span> &rarr;{' '}
          <span style={{ color: 'var(--violet)' }}>Evidence</span> &rarr;{' '}
          <span style={{ color: 'var(--amber)' }}>Simulation</span> &rarr;{' '}
          <span style={{ color: 'var(--neon-green)' }}>Verified Impact</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        <span className="badge badge-violet">MANTHAN AI</span>
        <span className="badge badge-cyan">JANAGRAPH</span>
        <span className="badge badge-amber">NIRNAY ARENA</span>
        <span className="badge badge-green">PRAMAN LEDGER</span>
      </div>
    </div>
  );
}
