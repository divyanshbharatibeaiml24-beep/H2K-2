import React, { useState } from 'react';
import { ROLES, FEATURE_OPTIONS } from '../data/seedData';

export default function Sidebar({ 
  userRole, 
  onChangeRole, 
  currentPage, 
  onSelectPage 
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeRoleData = ROLES[userRole] || ROLES["Admin"];
  const allowedModules = activeRoleData.modules || Object.keys(FEATURE_OPTIONS);
  const isAdmin = userRole === "Admin";

  return (
    <aside style={{
      width: '300px',
      background: 'linear-gradient(180deg, #070914 0%, #04060D 100%)',
      borderRight: '1px solid rgba(0, 212, 255, 0.18)',
      padding: '1.1rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflowY: 'auto'
    }}>
      {/* Branding Header */}
      <div style={{
        padding: '0.2rem 0 0.8rem 0',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
        marginBottom: '0.9rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.7rem' }}>⚡</span>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '1.35rem',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #FFFFFF, var(--cyan))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              JANAVYUH
            </h2>
            <div style={{
              fontSize: '0.65rem',
              color: '#94A3B8',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              SOVEREIGN CIVIC OS
            </div>
          </div>
        </div>
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.35rem' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>GOVTECH</span>
          <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>v2.4 ONLINE</span>
        </div>
      </div>

      {/* Operator Profile Selector */}
      <div style={{ marginBottom: '0.8rem' }}>
        <div className="section-tag" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.3rem' }}>
          OPERATOR PROFILE
        </div>
        <select
          value={userRole}
          onChange={(e) => onChangeRole(e.target.value)}
          className="global-select"
          style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.82rem', marginBottom: '0.6rem' }}
        >
          {Object.keys(ROLES).map((role) => (
            <option key={role} value={role} style={{ background: '#070914', color: '#FFFFFF' }}>
              {role}
            </option>
          ))}
        </select>

        {/* Clearance Card */}
        <div style={{
          background: 'rgba(13, 20, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          padding: '0.6rem 0.75rem',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ color: '#94A3B8' }}>Jurisdiction:</span>
            <strong style={{ color: 'var(--cyan)' }}>Zone 13 — CMA</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ color: '#94A3B8' }}>Profile:</span>
            <strong style={{ color: activeRoleData.color }}>{userRole}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <span style={{ color: '#94A3B8' }}>Clearance:</span>
            <span className={`badge ${isAdmin ? 'badge-green' : 'badge-cyan'}`} style={{ fontSize: '0.65rem' }}>
              {isAdmin ? '20 / 20 FULL ACCESS' : `${allowedModules.length} / 20 PERMITTED`}
            </span>
          </div>
          <div style={{
            color: '#94A3B8',
            fontSize: '0.68rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '0.35rem',
            lineHeight: 1.35,
            fontFamily: 'var(--font-ui)'
          }}>
            {activeRoleData.description}
          </div>
        </div>
      </div>

      {/* Quick Dispatch Command Strip */}
      <div style={{ marginBottom: '0.8rem' }}>
        <div className="section-tag" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.35rem' }}>
          QUICK DISPATCH
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem', marginBottom: '0.45rem' }}>
          <button
            onClick={() => onSelectPage("Live Demo")}
            className={`btn ${currentPage === "Live Demo" ? "btn-primary" : ""}`}
            style={{ fontSize: '0.78rem', padding: '0.5rem 0.4rem' }}
          >
            ⚡ Live Demo
          </button>
          <button
            onClick={() => onSelectPage("Dashboard")}
            className={`btn ${currentPage === "Dashboard" ? "btn-primary" : ""}`}
            style={{ fontSize: '0.78rem', padding: '0.5rem 0.4rem' }}
          >
            🏠 Dashboard
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
          <button
            onClick={() => onSelectPage("Simulation Lab")}
            className={`btn ${currentPage === "Simulation Lab" ? "btn-primary" : ""}`}
            style={{ fontSize: '0.78rem', padding: '0.5rem 0.4rem' }}
          >
            🔮 Simulator
          </button>
          <button
            onClick={() => onSelectPage("NIRNAY")}
            className={`btn ${currentPage === "NIRNAY" ? "btn-primary" : ""}`}
            style={{ fontSize: '0.78rem', padding: '0.5rem 0.4rem' }}
          >
            ⚖️ NIRNAY
          </button>
        </div>
      </div>

      {/* Accessible Modules Explorer */}
      <div style={{ marginBottom: 'auto' }}>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--cyan)',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '0.3rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
          className="mono-text"
        >
          <span>📁 ACCESSIBLE MODULES ({allowedModules.length})</span>
          <span>{drawerOpen ? '▲' : '▼'}</span>
        </button>

        {drawerOpen && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            marginTop: '0.35rem',
            maxHeight: '220px',
            overflowY: 'auto'
          }}>
            {allowedModules.map((modName) => {
              const isActive = currentPage === modName;
              return (
                <button
                  key={modName}
                  onClick={() => onSelectPage(modName)}
                  style={{
                    background: isActive ? 'var(--cyan)' : 'rgba(13, 20, 42, 0.6)',
                    color: isActive ? '#060913' : '#CBD5E1',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.72rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: isActive ? 700 : 500,
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isActive ? '● ' : '○ '} {modName}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Sovereign Microservices Health */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '0.8rem',
        marginTop: '0.8rem'
      }}>
        <div className="section-tag" style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.3rem' }}>
          SOVEREIGN HEALTH
        </div>
        <div style={{ fontSize: '0.68rem', color: '#94A3B8', lineHeight: 1.7 }} className="mono-text">
          <div><span className="status-dot dot-green"></span> MANTHAN (ASR): <strong style={{ color: 'var(--neon-green)' }}>ONLINE</strong></div>
          <div><span className="status-dot dot-green"></span> JANAGRAPH: <strong style={{ color: 'var(--neon-green)' }}>HEALTHY</strong></div>
          <div><span className="status-dot dot-green"></span> NIRNAY (6-Agents): <strong style={{ color: 'var(--neon-green)' }}>READY</strong></div>
          <div><span className="status-dot dot-green"></span> PRAMAN: <strong style={{ color: 'var(--neon-green)' }}>SYNCED</strong></div>
        </div>
      </div>
    </aside>
  );
}
