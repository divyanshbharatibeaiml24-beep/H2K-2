import React, { useState } from 'react';
import { WARDS, INITIAL_NEEDS } from '../data/seedData';
import SovereignMap from '../components/SovereignMap';

export default function DashboardView({ onSelectPage, triggerNotification, onAddSignal, onRecluster }) {
  const [selectedWard, setSelectedWard] = useState(WARDS[2]); // Default Velachery
  const [events, setEvents] = useState([
    { time: '21:05:12', stage: 'MANTHAN', msg: 'Neuro-symbolic intent verified for W-03 (Velachery)', ms: '42ms', color: 'var(--cyan)' },
    { time: '21:05:18', stage: 'JANAGRAPH', msg: 'Graph edge linked: CN-001 -> IA-001 (Velachery Bus Stop)', ms: '18ms', color: 'var(--cyan)' },
    { time: '21:05:25', stage: 'HOTSPOT', msg: 'Velachery cluster density threshold exceeded (0.92 critical)', ms: '65ms', color: 'var(--neon-red)' },
    { time: '21:05:30', stage: 'NIRNAY', msg: 'Multi-agent consensus synthesis generated for CN-001', ms: '120ms', color: 'var(--amber)' },
    { time: '21:05:40', stage: 'PRAMAN', msg: 'Impact Receipt IR-001 verified on tamper-evident ledger', ms: '35ms', color: 'var(--neon-green)' }
  ]);

  const handleIngest = () => {
    onAddSignal({
      id: `SIG-${Date.now().toString().slice(-3)}`,
      text: "Evening bus service delay at Velachery main junction. Commuters waiting >45 mins.",
      channel: "whatsapp_text",
      language: "en",
      lang_name: "English",
      ward: "W-03",
      ward_name: "Velachery",
      timestamp: new Date().toISOString(),
      intent: "public_transport",
      urgency: "high",
      confidence: 0.96,
      status: "verified"
    });
    setEvents(prev => [
      { time: new Date().toTimeString().slice(0, 8), stage: 'INGEST', msg: 'Signal SIG-011 ingested & linked to CN-001', ms: '28ms', color: 'var(--neon-green)' },
      ...prev
    ]);
    triggerNotification("⚡ Citizen Signal Ingested!", "Multilingual voice/text signal verified for Velachery (W-03).", "MANTHAN Ingestion Gateway", "success");
  };

  const handleRecluster = () => {
    onRecluster();
    setEvents(prev => [
      { time: new Date().toTimeString().slice(0, 8), stage: 'JANAGRAPH', msg: 'HDBSCAN graph weights recomputed across 8 wards', ms: '78ms', color: 'var(--violet)' },
      ...prev
    ]);
    triggerNotification("🔄 HDBSCAN Clusters Recomputed!", "Re-indexed 4 civic clusters across all active signals.", "JANAGRAPH Engine", "success");
  };

  return (
    <div>
      <div className="section-tag">EXECUTIVE INTELLIGENCE COMMAND</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🌐 Sovereign Civic Pulse & Decision Desk Overview
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Real-time fusion of citizen voice, infrastructure health, spatial deficit anomalies, and active public investments across the sovereign jurisdiction.
      </div>

      {/* Quick Action Strip */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>⚡ Real-time Operating Controls</div>
          <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Execute end-to-end ingestion and autonomous cluster recalibration.</div>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button onClick={handleIngest} className="btn btn-primary">
            ⚡ Ingest Live Citizen Signal
          </button>
          <button onClick={handleRecluster} className="btn">
            🔄 Recalibrate HDBSCAN Clusters
          </button>
        </div>
      </div>

      {/* Main Grid: Map & Needs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '1.1rem' }}>
        {/* Interactive Detailed Black GIS Map */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>🗺️ Sovereign Regional Need & Silent Zone Topography</div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>● CRITICAL HOTSPOT</span>
              <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>● SILENT ZONE</span>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>● STABLE</span>
            </div>
          </div>

          {/* Real Detailed Black Tile Map Component */}
          <SovereignMap 
            selectedWard={selectedWard} 
            onSelectWard={setSelectedWard} 
          />

          {/* Selected Ward Detail Footer Bar */}
          <div style={{
            marginTop: '0.8rem',
            padding: '0.65rem 0.85rem',
            background: 'rgba(13, 20, 42, 0.9)',
            borderRadius: '8px',
            border: '1px solid rgba(0, 212, 255, 0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span className="mono-text" style={{ fontSize: '0.78rem', color: 'var(--cyan)', fontWeight: 700 }}>
                {selectedWard.id} &bull; {selectedWard.name}
              </span>
              <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '0.15rem' }}>
                Primary Deficit: <strong style={{ color: selectedWard.critical ? 'var(--neon-red)' : 'var(--amber)' }}>{selectedWard.deficit}</strong>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="mono-text" style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                Pop: {selectedWard.population?.toLocaleString()}
              </span>
              <div style={{ marginTop: '0.2rem' }}>
                <span className={`badge ${selectedWard.critical ? 'badge-red' : (selectedWard.silent ? 'badge-amber' : 'badge-cyan')}`} style={{ fontSize: '0.65rem' }}>
                  INTENSITY: {selectedWard.intensity}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Needs & Live Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Civic Needs Summary */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>🧩 Clustered Civic Needs</div>
              <button 
                onClick={() => onSelectPage("Civic Needs")} 
                className="btn" 
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}
              >
                View All &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {INITIAL_NEEDS.slice(0, 3).map((need) => (
                <div key={need.id} style={{ background: 'rgba(10, 16, 35, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '6px', padding: '0.5rem 0.7rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#FFFFFF' }}>
                      {need.icon} {need.category}
                    </div>
                    <span className="badge badge-red" style={{ fontSize: '0.62rem' }}>
                      {need.severity.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                    {need.description}
                  </div>
                  <div className="mono-text" style={{ fontSize: '0.68rem', color: 'var(--cyan)', marginTop: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>📍 {need.ward_name} ({need.ward})</span>
                    <span>Corroboration: <strong>{need.evidence_count} signals</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Terminal Stream */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>⚡ Real-time Kernel Stream</div>
              <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>HEALTHY 100%</span>
            </div>
            <div className="terminal-window" style={{ height: '170px' }}>
              {events.map((e, idx) => (
                <div key={idx} className="log-entry">
                  <span style={{ color: '#94A3B8', fontSize: '0.7rem' }}>{e.time}</span>
                  <span style={{ color: e.color, fontWeight: 700 }}>[{e.stage}]</span>
                  <span style={{ color: '#CBD5E1' }}>{e.msg}</span>
                  <span style={{ color: 'var(--neon-green)', marginLeft: 'auto', fontSize: '0.68rem' }}>{e.ms}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
