import React, { useState } from 'react';
import { ROLES } from '../data/seedData';

const SYSTEM_CONFIG = {
  general: {
    instanceName: 'JANAVYUH Sovereign Civic OS',
    version: 'v2.4.1-beta',
    jurisdiction: 'Zone 13 — Chennai Metropolitan Area',
    deployment: 'Local-First (Competition Demo)',
    demoMode: true,
    language: 'en',
    timezone: 'Asia/Kolkata'
  },
  thresholds: {
    hotspotIntensity: 0.85,
    silentZoneRatio: 0.30,
    clusterMinSignals: 3,
    confidenceFloor: 0.70,
    driftAlertPct: 5.0,
    forecastHorizonMonths: 12,
    nirnayConsensusThreshold: 0.75
  },
  privacy: {
    dataMinimization: true,
    smallCellSuppression: true,
    smallCellThreshold: 5,
    encryptAtRest: true,
    encryptInTransit: true,
    retentionDays: 365,
    purposeBoundConsent: true,
    zkpSimulated: true
  },
  languages: [
    { code: 'ta', name: 'Tamil', status: 'active', asrModel: 'whisper-large-v3' },
    { code: 'hi', name: 'Hindi', status: 'active', asrModel: 'whisper-large-v3' },
    { code: 'en', name: 'English', status: 'active', asrModel: 'whisper-large-v3' },
    { code: 'te', name: 'Telugu', status: 'configured', asrModel: 'whisper-large-v3' },
    { code: 'kn', name: 'Kannada', status: 'planned', asrModel: 'N/A' }
  ]
};

export default function SettingsView({ onSelectPage, triggerNotification }) {
  const [activeTab, setActiveTab] = useState('general');
  const [config, setConfig] = useState(SYSTEM_CONFIG);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    triggerNotification('⚙️ Configuration Saved', 'System settings updated and recorded in audit trail.', 'Settings Engine', 'success');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleThresholdChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      thresholds: { ...prev.thresholds, [key]: parseFloat(value) }
    }));
  };

  const handlePrivacyToggle = (key) => {
    setConfig(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: !prev.privacy[key] }
    }));
  };

  const tabs = [
    { id: 'general', label: '⚙️ General', icon: '⚙️' },
    { id: 'thresholds', label: '🎛️ Thresholds', icon: '🎛️' },
    { id: 'privacy', label: '🔒 Privacy', icon: '🔒' },
    { id: 'languages', label: '🌐 Languages', icon: '🌐' },
    { id: 'roles', label: '👥 Roles & RBAC', icon: '👥' }
  ];

  return (
    <div>
      <div className="section-tag">SYSTEM SETTINGS & GOVERNANCE CONFIGURATION</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        ⚙️ Settings: System Configuration & Governance Controls
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Configure thresholds, privacy controls, language support, role-based access, and operational parameters. All changes are recorded in the audit trail.
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`btn ${activeTab === t.id ? 'btn-primary' : ''}`}
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="glass-card">
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.6rem' }}>GENERAL CONFIGURATION</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {Object.entries(config.general).map(([key, val]) => (
              <div key={key}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                {typeof val === 'boolean' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                      onClick={() => setConfig(prev => ({ ...prev, general: { ...prev.general, [key]: !prev.general[key] } }))}
                      style={{
                        width: '40px', height: '22px', borderRadius: '11px', cursor: 'pointer',
                        background: val ? 'var(--neon-green)' : 'rgba(255,255,255,0.15)',
                        position: 'relative', transition: 'background 0.2s'
                      }}
                    >
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                        position: 'absolute', top: '2px', left: val ? '20px' : '2px',
                        transition: 'left 0.2s'
                      }} />
                    </div>
                    <span style={{ fontSize: '0.82rem', color: val ? 'var(--neon-green)' : '#94A3B8' }}>{val ? 'Enabled' : 'Disabled'}</span>
                  </div>
                ) : (
                  <input
                    value={val}
                    onChange={e => setConfig(prev => ({ ...prev, general: { ...prev.general, [key]: e.target.value } }))}
                    style={{
                      width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,212,255,0.25)',
                      borderRadius: '6px', padding: '0.45rem 0.7rem', color: '#fff', fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)', outline: 'none'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} className="btn btn-primary">{saved ? '✓ Saved' : '💾 Save Changes'}</button>
          </div>
        </div>
      )}

      {/* Thresholds */}
      {activeTab === 'thresholds' && (
        <div className="glass-card">
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.6rem' }}>DETECTION & ANALYSIS THRESHOLDS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            {Object.entries(config.thresholds).map(([key, val]) => {
              const label = key.replace(/([A-Z])/g, ' $1').trim();
              const isPercent = key.includes('Pct') || key.includes('Ratio') || key.includes('Threshold') || key.includes('Floor') || key.includes('Intensity');
              const max = isPercent ? (val > 1 ? 100 : 1) : 50;
              const step = isPercent ? (val > 1 ? 0.5 : 0.01) : 1;

              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                    <span className="mono-text" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--neon-green)' }}>
                      {val > 1 ? val.toFixed(1) : (val * 100).toFixed(0) + '%'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={max}
                    step={step}
                    value={val}
                    onChange={e => handleThresholdChange(key, e.target.value)}
                    style={{ width: '100%', accentColor: 'var(--cyan)' }}
                  />
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} className="btn btn-primary">{saved ? '✓ Saved' : '💾 Save Thresholds'}</button>
          </div>
        </div>
      )}

      {/* Privacy Controls */}
      {activeTab === 'privacy' && (
        <div className="glass-card">
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.6rem' }}>PRIVACY & DATA GOVERNANCE CONTROLS</div>
          {Object.entries(config.privacy).map(([key, val]) => {
            const label = key.replace(/([A-Z])/g, ' $1').trim();
            return (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', color: '#E2E8F0', fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                    {key === 'dataMinimization' && 'Only collect fields required for the declared purpose'}
                    {key === 'smallCellSuppression' && 'Suppress statistics where population counts fall below threshold'}
                    {key === 'smallCellThreshold' && `Minimum count for statistical reporting: ${val}`}
                    {key === 'encryptAtRest' && 'All stored data is encrypted'}
                    {key === 'encryptInTransit' && 'All network traffic is encrypted (TLS)'}
                    {key === 'retentionDays' && `Data retained for ${val} days before deletion review`}
                    {key === 'purposeBoundConsent' && 'Service handling vs optional analytics consent separation'}
                    {key === 'zkpSimulated' && 'Zero-knowledge proofs are simulated in demo mode'}
                  </div>
                </div>
                {typeof val === 'boolean' ? (
                  <div
                    onClick={() => handlePrivacyToggle(key)}
                    style={{
                      width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
                      background: val ? 'var(--neon-green)' : 'rgba(255,255,255,0.15)',
                      position: 'relative', transition: 'background 0.2s', flexShrink: 0
                    }}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
                      position: 'absolute', top: '2px', left: val ? '22px' : '2px',
                      transition: 'left 0.2s'
                    }} />
                  </div>
                ) : (
                  <input
                    type="number"
                    value={val}
                    onChange={e => setConfig(prev => ({ ...prev, privacy: { ...prev.privacy, [key]: parseInt(e.target.value) || 0 } }))}
                    style={{
                      width: '80px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,212,255,0.25)',
                      borderRadius: '6px', padding: '0.3rem 0.5rem', color: '#fff', fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)', outline: 'none', textAlign: 'right'
                    }}
                  />
                )}
              </div>
            );
          })}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} className="btn btn-primary">{saved ? '✓ Saved' : '💾 Save Privacy Config'}</button>
          </div>
        </div>
      )}

      {/* Languages */}
      {activeTab === 'languages' && (
        <div className="glass-card">
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.6rem' }}>LANGUAGE & ASR CONFIGURATION</div>
          {config.languages.map((lang, i) => (
            <div key={lang.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: i < config.languages.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="mono-text" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.82rem', minWidth: '28px' }}>{lang.code}</span>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#E2E8F0', fontWeight: 600 }}>{lang.name}</div>
                  <div className="mono-text" style={{ fontSize: '0.7rem', color: '#64748B' }}>ASR: {lang.asrModel}</div>
                </div>
              </div>
              <span className={`badge ${lang.status === 'active' ? 'badge-green' : lang.status === 'configured' ? 'badge-cyan' : 'badge-amber'}`}>
                {lang.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Roles & RBAC */}
      {activeTab === 'roles' && (
        <div className="glass-card">
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.6rem' }}>ROLE-BASED ACCESS CONTROL (RBAC)</div>
          {Object.entries(ROLES).map(([roleName, roleData], i) => (
            <div key={roleName} style={{ padding: '0.7rem 0', borderBottom: i < Object.keys(ROLES).length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: roleData.color, boxShadow: `0 0 8px ${roleData.color}` }}></span>
                  <strong style={{ color: '#E2E8F0', fontSize: '0.92rem' }}>{roleName}</strong>
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>{roleData.modules.length} MODULES</span>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginBottom: '0.3rem' }}>{roleData.description}</div>
              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                {roleData.modules.map(m => (
                  <span key={m} className="badge badge-violet" style={{ fontSize: '0.58rem', padding: '0.12rem 0.4rem' }}>{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
