import React from 'react';
import { FEATURE_OPTIONS, ROLES } from '../data/seedData';

export default function TopNavigation({ currentPage, onSelectPage, userRole }) {
  const roleInfo = ROLES[userRole] || ROLES["Admin"];
  const allowedKeys = roleInfo.modules || Object.keys(FEATURE_OPTIONS);
  
  // Filter features based on user profile clearance
  const permittedOptions = allowedKeys.filter(key => FEATURE_OPTIONS[key]);
  
  const currentIndex = permittedOptions.indexOf(currentPage) !== -1 
    ? permittedOptions.indexOf(currentPage) 
    : 0;

  const isAdmin = userRole === "Admin" || permittedOptions.length === Object.keys(FEATURE_OPTIONS).length;
  const badgeCls = isAdmin ? "badge-green" : "badge-cyan";
  const statusText = isAdmin ? "FULL ACCESS" : `${permittedOptions.length} / ${Object.keys(FEATURE_OPTIONS).length} PERMITTED`;

  return (
    <div className="glass-card" style={{ marginBottom: '1.2rem', padding: '0.85rem 1.1rem' }}>
      <div className="global-nav-container">
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '220px' }}>
          <span 
            className="mono-text" 
            style={{ 
              fontSize: '0.68rem', 
              fontWeight: 700, 
              letterSpacing: '0.12em', 
              color: roleInfo.color || 'var(--cyan)' 
            }}
          >
            GLOBAL NAVIGATION &bull; {userRole.toUpperCase()}
          </span>
          <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.96rem' }}>
            Select Platform Feature:
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <select 
            id="global-feature-select"
            className="global-select"
            value={currentPage}
            onChange={(e) => onSelectPage(e.target.value)}
          >
            {permittedOptions.map((key) => (
              <option key={key} value={key} style={{ background: '#070A17', color: '#FFFFFF' }}>
                {FEATURE_OPTIONS[key]}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '150px' }}>
          <span className={`badge ${badgeCls}`} style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem' }}>
            FEATURE #{currentIndex + 1} OF {permittedOptions.length}
          </span>
          <span style={{ fontSize: '0.62rem', color: '#94A3B8', fontWeight: 600, letterSpacing: '0.05em', marginTop: '0.2rem' }}>
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
}
