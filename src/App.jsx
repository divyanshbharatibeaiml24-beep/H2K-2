import React, { useState, useEffect } from 'react';
import './styles/cyber.css';
import HeaderBanner from './components/HeaderBanner';
import KpiRibbon from './components/KpiRibbon';
import TopNavigation from './components/TopNavigation';
import Sidebar from './components/Sidebar';
import CornerToast from './components/CornerToast';

import DashboardView from './views/DashboardView';
import SimulationLabView from './views/SimulationLabView';
import NirnayView from './views/NirnayView';
import CitizenSignalsView from './views/CitizenSignalsView';
import CivicNeedsView from './views/CivicNeedsView';
import GenericView from './views/GenericView';

import { INITIAL_SIGNALS, INITIAL_NEEDS, ROLES } from './data/seedData';

export default function App() {
  const [userRole, setUserRole] = useState("Admin");
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [signals, setSignals] = useState(INITIAL_SIGNALS);
  const [needs, setNeeds] = useState(INITIAL_NEEDS);
  const [notification, setNotification] = useState(null);

  // Trigger floating corner notification
  const triggerNotification = (title, body, meta = "Sovereign Kernel", status = "success") => {
    setNotification({
      title,
      body,
      meta,
      status,
      id: Date.now()
    });
  };

  const handleDismissNotification = () => {
    setNotification(null);
  };

  // Add Signal handler
  const handleAddSignal = (sig) => {
    setSignals(prev => [sig, ...prev]);
  };

  // Recluster Needs handler
  const handleRecluster = () => {
    setNeeds(prev => prev.map(n => ({
      ...n,
      evidence_count: n.evidence_count + Math.floor(Math.random() * 3) + 1,
      confidence: Math.min(0.98, +(n.confidence + 0.01).toFixed(2))
    })));
  };

  // Role Switcher with auto-fallback if current page not allowed
  const handleChangeRole = (newRole) => {
    setUserRole(newRole);
    const allowed = ROLES[newRole]?.modules || [];
    if (!allowed.includes(currentPage)) {
      const fallback = allowed.includes("Dashboard") ? "Dashboard" : allowed[0];
      setCurrentPage(fallback);
    }
    triggerNotification(
      `Operator Profile Switched: ${newRole}`,
      ROLES[newRole]?.description || "Clearance updated.",
      "Sovereign RBAC Gateway",
      "success"
    );
  };

  const allowedModules = ROLES[userRole]?.modules || [];
  const isPagePermitted = allowedModules.includes(currentPage);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Left Sidebar */}
      <Sidebar 
        userRole={userRole}
        onChangeRole={handleChangeRole}
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
      />

      {/* Main Viewport Canvas */}
      <main style={{ flex: 1, padding: '1.2rem 2rem 3rem 2rem', overflowX: 'hidden' }}>
        {/* Floating Corner Notification */}
        <CornerToast 
          notification={notification}
          onDismiss={handleDismissNotification}
        />

        {/* 1. Header Banner */}
        <HeaderBanner />

        {/* 2. Persistent KPI Ribbon */}
        <KpiRibbon 
          signalsCount={signals.length}
          needsCount={needs.length}
        />

        {/* 3. Global Navigation Dropdown */}
        <TopNavigation 
          currentPage={currentPage}
          onSelectPage={setCurrentPage}
          userRole={userRole}
        />

        {/* 4. View Router with Sovereign RBAC Security Guard */}
        {!isPagePermitted ? (
          <div className="glass-card" style={{ border: '1px solid var(--neon-red)', background: 'rgba(255, 59, 110, 0.06)', textAlign: 'center', padding: '2.5rem 1.5rem', marginTop: '1rem' }}>
            <span style={{ fontSize: '2.8rem' }}>🔒</span>
            <h3 style={{ color: 'var(--neon-red)', marginTop: '0.6rem', fontSize: '1.3rem' }}>
              CLEARANCE RESTRICTED: {currentPage.toUpperCase()}
            </h3>
            <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '0.6rem auto 1.4rem auto', fontSize: '0.88rem', lineHeight: 1.5 }}>
              The active operator profile <strong style={{ color: ROLES[userRole]?.color }}>{userRole}</strong> does not hold clearance for this sovereign module.
              <br />Clearance required: <strong>{Object.keys(ROLES).filter(r => ROLES[r].modules.includes(currentPage)).join(', ')}</strong>.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => { setUserRole("Admin"); }}
                className="btn btn-primary"
              >
                👑 Switch to Admin Clearance (Full Access)
              </button>
              <button 
                onClick={() => setCurrentPage("Dashboard")}
                className="btn"
              >
                🏠 Return to Sovereign Dashboard
              </button>
            </div>
          </div>
        ) : currentPage === "Dashboard" ? (
          <DashboardView 
            onSelectPage={setCurrentPage}
            triggerNotification={triggerNotification}
            onAddSignal={handleAddSignal}
            onRecluster={handleRecluster}
          />
        ) : currentPage === "Simulation Lab" ? (
          <SimulationLabView 
            onSelectPage={setCurrentPage}
            triggerNotification={triggerNotification}
          />
        ) : currentPage === "NIRNAY" ? (
          <NirnayView 
            onSelectPage={setCurrentPage}
            triggerNotification={triggerNotification}
          />
        ) : currentPage === "Citizen Signals" ? (
          <CitizenSignalsView 
            signals={signals}
            onAddSignal={handleAddSignal}
            triggerNotification={triggerNotification}
          />
        ) : currentPage === "Civic Needs" ? (
          <CivicNeedsView 
            needs={needs}
            onSelectPage={setCurrentPage}
            triggerNotification={triggerNotification}
            onRecluster={handleRecluster}
          />
        ) : (
          <GenericView 
            page={currentPage}
            onSelectPage={setCurrentPage}
            triggerNotification={triggerNotification}
          />
        )}
      </main>
    </div>
  );
}
