import React, { useState } from 'react';

export default function CitizenSignalsView({ signals, onAddSignal, triggerNotification }) {
  const [inputText, setInputText] = useState('');
  const [channel, setChannel] = useState('whatsapp_voice');
  const [ward, setWard] = useState('W-03');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newSig = {
      id: `SIG-${(signals.length + 1).toString().padStart(3, '0')}`,
      text: inputText,
      channel: channel,
      language: "en",
      lang_name: "English",
      ward: ward,
      ward_name: ward === 'W-03' ? 'Velachery' : 'Adyar',
      timestamp: new Date().toISOString(),
      intent: "civic_infrastructure",
      urgency: "high",
      confidence: 0.94,
      status: "verified"
    };

    onAddSignal(newSig);
    setInputText('');
    triggerNotification(
      "🎙️ Signal Logged Successfully!",
      `Signal ${newSig.id} ingested via ${channel}. Intent: ${newSig.intent} | Confidence: 94%`,
      "MANTHAN ASR & Semantic Parser",
      "success"
    );
  };

  return (
    <div>
      <div className="section-tag">MULTIMODAL INTAKE & ASR INGESTION</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        🎙️ Citizen Signals: Universal Voice/Text Intake
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Ingests unstructured public voice, IVR, WhatsApp, SMS, and field survey grievances in 12+ regional languages. Transcribed and tagged with neuro-symbolic intent using MANTHAN AI.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.1rem' }}>
        {/* Signal Ingestion Form */}
        <div className="glass-card">
          <h4 style={{ fontSize: '0.96rem', marginBottom: '0.8rem', color: '#FFFFFF' }}>
            📥 Ingest New Citizen Signal
          </h4>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '0.8rem' }}>
              <label style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'block', marginBottom: '0.3rem' }}>
                Channel Source
              </label>
              <select 
                value={channel} 
                onChange={(e) => setChannel(e.target.value)}
                className="global-select" 
                style={{ width: '100%' }}
              >
                <option value="whatsapp_voice">WhatsApp Voice Note (Audio ASR)</option>
                <option value="ivr">IVR Citizen Helpline (800-CIVIC)</option>
                <option value="whatsapp_text">WhatsApp Text Message</option>
                <option value="kiosk">Assisted Kiosk / Field Surveyor</option>
                <option value="sms">Universal SMS Gateway</option>
              </select>
            </div>

            <div style={{ marginBottom: '0.8rem' }}>
              <label style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'block', marginBottom: '0.3rem' }}>
                Target Ward
              </label>
              <select 
                value={ward} 
                onChange={(e) => setWard(e.target.value)}
                className="global-select" 
                style={{ width: '100%' }}
              >
                <option value="W-03">W-03: Velachery (Zone 13)</option>
                <option value="W-01">W-01: Adyar (Zone 13)</option>
                <option value="W-06">W-06: Tondiarpet (Zone 4)</option>
                <option value="W-04">W-04: Ambattur (Zone 7)</option>
                <option value="W-08">W-08: Perambur (Zone 5)</option>
              </select>
            </div>

            <div style={{ marginBottom: '0.9rem' }}>
              <label style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'block', marginBottom: '0.3rem' }}>
                Signal Transcription / Message
              </label>
              <textarea 
                rows="4" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g. Bus stop roof is broken and no lights on 3rd cross road after 8 PM..."
                className="global-select"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" style={{ padding: '0.65rem' }}>
              ⚡ Ingest & Transcribe via MANTHAN AI
            </button>
          </form>
        </div>

        {/* Live Signals Stream */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', margin: 0 }}>
              📜 Ingested Sovereign Signals ({signals.length})
            </h4>
            <span className="badge badge-green">MANTHAN ASR VERIFIED</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '420px', overflowY: 'auto' }}>
            {signals.map((sig) => (
              <div 
                key={sig.id}
                style={{
                  background: 'rgba(10, 16, 35, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '0.7rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="mono-text" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.78rem' }}>
                      {sig.id}
                    </span>
                    <span className="badge" style={{ background: 'rgba(0, 212, 255, 0.1)', color: 'var(--cyan)', fontSize: '0.62rem' }}>
                      {sig.channel.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.1)', color: 'var(--violet)', fontSize: '0.62rem' }}>
                      {sig.lang_name}
                    </span>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: '0.62rem' }}>
                    {Math.round(sig.confidence * 100)}% CONF
                  </span>
                </div>

                <div style={{ color: '#FFFFFF', fontSize: '0.84rem', margin: '0.3rem 0' }}>
                  "{sig.text}"
                </div>

                <div className="mono-text" style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                  <span>📍 {sig.ward_name} ({sig.ward})</span>
                  <span>Intent: <strong style={{ color: 'var(--amber)' }}>{sig.intent}</strong></span>
                  <span>{new Date(sig.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
