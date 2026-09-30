import React, { useState } from 'react';

const CITIZEN_TICKETS = [
  {
    id: 'SIG-001', ref: 'UTTAR-2026-001', text: 'No bus after 7 PM near our college',
    language: 'Tamil', ward: 'W-03 Velachery', service: 'Public Transport',
    submitted: '2026-09-28 19:32', currentStage: 5, confidence: 0.94,
    stages: [
      { name: 'Received', date: '2026-09-28 19:32', status: 'complete', note: 'Signal captured via WhatsApp voice' },
      { name: 'Understood', date: '2026-09-28 19:33', status: 'complete', note: 'MANTHAN extracted intent: public_transport, place: Velachery' },
      { name: 'Clustered', date: '2026-09-28 20:15', status: 'complete', note: 'Merged into CN-001 (14 supporting signals)' },
      { name: 'Debated', date: '2026-09-29 10:00', status: 'complete', note: 'NIRNAY 6-agent consensus: Scenario A recommended' },
      { name: 'Prioritised', date: '2026-09-29 14:30', status: 'complete', note: 'JANMAT score: 72.4/100 — Top priority for Q4' },
      { name: 'Approved', date: '2026-09-29 16:00', status: 'active', note: 'Pending executive warrant signature' },
      { name: 'Built', date: null, status: 'pending', note: 'Awaiting project initiation' },
      { name: 'Verified', date: null, status: 'pending', note: 'Impact measurement pending' }
    ]
  },
  {
    id: 'SIG-002', ref: 'UTTAR-2026-002', text: 'பள்ளிக்கு அருகில் தண்ணீர் வரவில்லை 3 நாட்களாக',
    language: 'Tamil', ward: 'W-06 Tondiarpet', service: 'Water Supply',
    submitted: '2026-09-28 08:15', currentStage: 3, confidence: 0.91,
    stages: [
      { name: 'Received', date: '2026-09-28 08:15', status: 'complete', note: 'IVR call transcribed' },
      { name: 'Understood', date: '2026-09-28 08:17', status: 'complete', note: 'Intent: water_supply, urgency: critical' },
      { name: 'Clustered', date: '2026-09-28 09:00', status: 'complete', note: 'Merged into CN-002 (9 signals)' },
      { name: 'Debated', date: null, status: 'active', note: 'Scenario analysis in progress' },
      { name: 'Prioritised', date: null, status: 'pending', note: '' },
      { name: 'Approved', date: null, status: 'pending', note: '' },
      { name: 'Built', date: null, status: 'pending', note: '' },
      { name: 'Verified', date: null, status: 'pending', note: '' }
    ]
  },
  {
    id: 'SIG-003', ref: 'UTTAR-2026-003', text: 'Street lights not working on 3rd cross road since last week',
    language: 'English', ward: 'W-01 Adyar', service: 'Street Lighting',
    submitted: '2026-09-27 21:45', currentStage: 6, confidence: 0.97,
    stages: [
      { name: 'Received', date: '2026-09-27 21:45', status: 'complete', note: 'Web portal submission' },
      { name: 'Understood', date: '2026-09-27 21:46', status: 'complete', note: 'Intent: street_lighting, urgency: medium' },
      { name: 'Clustered', date: '2026-09-27 22:30', status: 'complete', note: 'Merged into CN-003 (6 signals)' },
      { name: 'Debated', date: '2026-09-28 09:00', status: 'complete', note: 'Direct intervention — no scenario debate needed' },
      { name: 'Prioritised', date: '2026-09-28 10:00', status: 'complete', note: 'Moderate priority — routine maintenance' },
      { name: 'Approved', date: '2026-09-28 11:00', status: 'complete', note: 'Ward Officer authorized maintenance order' },
      { name: 'Built', date: '2026-09-29 16:00', status: 'active', note: 'Electrical crew dispatched — work in progress' },
      { name: 'Verified', date: null, status: 'pending', note: 'Night survey scheduled post-completion' }
    ]
  },
  {
    id: 'SIG-006', ref: 'UTTAR-2026-006', text: 'Primary health center closed on weekends, no emergency care',
    language: 'English', ward: 'W-05 Sholinganallur', service: 'Healthcare',
    submitted: '2026-09-26 10:30', currentStage: 7, confidence: 0.95,
    stages: [
      { name: 'Received', date: '2026-09-26 10:30', status: 'complete', note: 'Kiosk submission' },
      { name: 'Understood', date: '2026-09-26 10:31', status: 'complete', note: 'Intent: healthcare, urgency: high' },
      { name: 'Clustered', date: '2026-09-26 11:00', status: 'complete', note: 'Silent zone flagged — proactive outreach triggered' },
      { name: 'Debated', date: '2026-09-27 09:00', status: 'complete', note: 'NIRNAY recommended weekend pilot program' },
      { name: 'Prioritised', date: '2026-09-27 14:00', status: 'complete', note: 'High priority — silent zone equity multiplier applied' },
      { name: 'Approved', date: '2026-09-28 10:00', status: 'complete', note: 'District Health Officer approved weekend staffing' },
      { name: 'Built', date: '2026-09-29 08:00', status: 'complete', note: 'Weekend emergency hours started — 2 doctors assigned' },
      { name: 'Verified', date: null, status: 'active', note: 'Patient count tracking in progress for impact receipt' }
    ]
  }
];

export default function CitizenTrackerView({ onSelectPage, triggerNotification }) {
  const [selectedTicket, setSelectedTicket] = useState(CITIZEN_TICKETS[0]);
  const [lookupRef, setLookupRef] = useState('');

  const handleLookup = () => {
    const found = CITIZEN_TICKETS.find(t => t.ref.toLowerCase() === lookupRef.toLowerCase() || t.id.toLowerCase() === lookupRef.toLowerCase());
    if (found) {
      setSelectedTicket(found);
      triggerNotification('🔍 Ticket Located', `Tracking ${found.ref} — currently at stage: ${found.stages[found.currentStage - 1]?.name}`, 'UTTAR Tracker', 'success');
    } else {
      triggerNotification('⚠️ Not Found', `No ticket found for "${lookupRef}". Try UTTAR-2026-001 or SIG-001.`, 'UTTAR Tracker', 'warning');
    }
  };

  const stageColor = (s) => s === 'complete' ? 'var(--neon-green)' : s === 'active' ? 'var(--cyan)' : 'rgba(255,255,255,0.2)';
  const stageIcon = (s) => s === 'complete' ? '✓' : s === 'active' ? '●' : '○';

  return (
    <div>
      <div className="section-tag">CITIZEN LIFECYCLE TRANSPARENCY</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🔍 Citizen Tracker: UTTAR Status Timeline
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Track your submission from Received → Understood → Clustered → Debated → Prioritised → Approved → Built → Verified. No government jargon — clear, honest status updates.
      </div>

      {/* Lookup Bar */}
      <div className="glass-card" style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-end', flexWrap: 'wrap', padding: '0.9rem 1.1rem' }}>
        <div style={{ flex: '1 1 250px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>REFERENCE LOOKUP</div>
          <input
            type="text"
            placeholder="Enter reference ID (e.g. UTTAR-2026-001 or SIG-001)"
            value={lookupRef}
            onChange={e => setLookupRef(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLookup()}
            style={{
              width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '8px', padding: '0.55rem 1rem', color: '#fff', fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)', outline: 'none'
            }}
          />
        </div>
        <button onClick={handleLookup} className="btn btn-primary" style={{ padding: '0.55rem 1.2rem' }}>🔍 Track</button>
        {/* Quick access buttons */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {CITIZEN_TICKETS.map(t => (
            <button key={t.id} onClick={() => setSelectedTicket(t)} className={`btn ${selectedTicket.id === t.id ? 'btn-primary' : ''}`} style={{ fontSize: '0.72rem', padding: '0.35rem 0.6rem' }}>
              {t.id}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
        {/* Timeline */}
        <div>
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div>
                <span className="mono-text" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.78rem' }}>{selectedTicket.ref}</span>
                <h3 style={{ margin: '0.2rem 0 0 0', color: '#fff', fontSize: '1rem' }}>"{selectedTicket.text}"</h3>
              </div>
              <span className="badge badge-cyan">{selectedTicket.language}</span>
            </div>

            <div className="mono-text" style={{ fontSize: '0.74rem', color: '#94A3B8', marginBottom: '1rem', display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <span>Ward: <strong style={{ color: 'var(--cyan)' }}>{selectedTicket.ward}</strong></span>
              <span>Service: <strong>{selectedTicket.service}</strong></span>
              <span>Confidence: <strong style={{ color: 'var(--neon-green)' }}>{(selectedTicket.confidence * 100).toFixed(0)}%</strong></span>
            </div>

            {/* Visual Timeline */}
            {selectedTicket.stages.map((stage, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: i < selectedTicket.stages.length - 1 ? '0' : '0' }}>
                {/* Timeline column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '28px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: stage.status === 'complete' ? 'var(--neon-green)' : stage.status === 'active' ? 'var(--cyan)' : 'rgba(255,255,255,0.1)',
                    color: stage.status !== 'pending' ? '#060913' : '#64748B',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.72rem',
                    boxShadow: stage.status === 'active' ? '0 0 12px var(--cyan)' : 'none'
                  }}>
                    {stageIcon(stage.status)}
                  </div>
                  {i < selectedTicket.stages.length - 1 && (
                    <div style={{ width: '2px', height: '40px', background: stage.status === 'complete' ? 'var(--neon-green)' : 'rgba(255,255,255,0.1)', margin: '2px 0' }} />
                  )}
                </div>
                {/* Stage info */}
                <div style={{ flex: 1, paddingBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: stage.status === 'pending' ? '#64748B' : '#E2E8F0', fontSize: '0.88rem' }}>{stage.name}</strong>
                    {stage.date && <span className="mono-text" style={{ fontSize: '0.68rem', color: '#64748B' }}>{stage.date}</span>}
                  </div>
                  {stage.note && (
                    <div style={{ fontSize: '0.78rem', color: stage.status === 'pending' ? '#475569' : '#94A3B8', marginTop: '0.15rem' }}>{stage.note}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Tickets Summary */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>ALL TRACKED SUBMISSIONS</div>
          {CITIZEN_TICKETS.map(t => {
            const completedStages = t.stages.filter(s => s.status === 'complete').length;
            const activeStage = t.stages.find(s => s.status === 'active');
            const progress = (completedStages / t.stages.length) * 100;
            const isSelected = selectedTicket.id === t.id;

            return (
              <div
                key={t.id}
                className="glass-card"
                style={{ cursor: 'pointer', ...(isSelected ? { border: '1px solid var(--cyan)', boxShadow: '0 0 12px rgba(0,212,255,0.2)' } : {}) }}
                onClick={() => setSelectedTicket(t)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.74rem', fontWeight: 700 }}>{t.ref}</span>
                  <span className={`badge ${progress === 100 ? 'badge-green' : progress >= 50 ? 'badge-cyan' : 'badge-amber'}`} style={{ fontSize: '0.62rem' }}>
                    {activeStage ? activeStage.name.toUpperCase() : 'COMPLETE'}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#E2E8F0', marginBottom: '0.4rem' }}>
                  {t.text.length > 55 ? t.text.slice(0, 55) + '...' : t.text}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '5px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, background: progress >= 75 ? 'var(--neon-green)' : 'var(--cyan)', height: '100%', borderRadius: '9999px' }} />
                  </div>
                  <span className="mono-text" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{completedStages}/{t.stages.length}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
