import React, { useState } from 'react';
import { NIRNAY_AGENTS } from '../data/seedData';

export default function NirnayView({ onSelectPage, triggerNotification }) {
  const [deliberating, setDeliberating] = useState(false);

  const handleTransmit = () => {
    triggerNotification(
      "📑 Transmitted to Decision Desk",
      "Scenario A decision package forwarded to authorized executive queue for warrant signing.",
      "NIRNAY Arena Dispatcher",
      "success"
    );
    onSelectPage("Decision Desk");
  };

  const handleDeliberate = () => {
    setDeliberating(true);
    setTimeout(() => {
      setDeliberating(false);
      triggerNotification(
        "⚖️ NIRNAY Deliberation Complete!",
        "All 6 autonomous agents (Equity, Impact, Budget, Resilience, Infra, Evidence) reached structured consensus on Scenario A.",
        "NIRNAY Multi-Agent Arena",
        "success"
      );
    }, 400);
  };

  return (
    <div>
      <div className="section-tag">NIRNAY MULTI-AGENT ARENA & SYNTHESIS</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        ⚖️ Multi-Agent Deliberation & Evidence-Grounded Synthesis
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Rejecting black-box monolithic AI decisions. NIRNAY deploys specialized adversarial analytical agents inspecting the same civic evidence across distinct sovereign objectives. Consequential decisions remain strictly under human authority.
      </div>

      {/* Control Strip */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
            Deliberation Target: <span style={{ color: 'var(--cyan)' }}>CN-001 &bull; Evening Bus Service Gap (Velachery)</span>
          </div>
          <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
            Simulated Alternative: <strong>Scenario A (3 Additional Evening Routes &bull; ₹45 Lakhs)</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button onClick={handleDeliberate} className="btn">
            🔄 Re-run Multi-Agent Deliberation
          </button>
          <button onClick={handleTransmit} className="btn btn-primary">
            Transmit to Decision Desk for Human Signing &rarr;
          </button>
        </div>
      </div>

      {/* 6-Agent Perspectives Grid */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '1.1rem 0 0.8rem 0', color: '#FFFFFF' }}>
        🤖 Adversarial Perspectives (6 Distinct Objectives)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
        {NIRNAY_AGENTS.map((agent, i) => (
          <div key={i} className="glass-card" style={{ borderLeft: `4px solid ${agent.color}`, marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>{agent.icon}</span>
              <h4 style={{ margin: 0, fontSize: '0.95rem', color: agent.color }}>
                {agent.role}
              </h4>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.55rem', borderRadius: '6px', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '0.6rem', lineHeight: 1.4 }}>
              <strong style={{ color: '#FFFFFF' }}>Perspective Claim:</strong> {agent.claim}
            </div>

            <div style={{ background: 'rgba(255, 59, 110, 0.08)', borderLeft: '2px solid var(--neon-red)', padding: '0.45rem', borderRadius: '4px', fontSize: '0.74rem', color: '#CBD5E1', lineHeight: 1.35 }}>
              <strong style={{ color: 'var(--neon-red)' }}>Counter-Argument / Risk:</strong> {agent.counter}
            </div>
          </div>
        ))}
      </div>

      {/* Structured Synthesis Card */}
      <div className="glass-card" style={{ border: '1px solid var(--neon-green)', background: 'rgba(0, 255, 136, 0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>📑</span>
            <h4 style={{ margin: 0, fontSize: '1rem', color: '#FFFFFF' }}>
              Consensus Synthesis & Recommendation Package
            </h4>
          </div>
          <span className="badge badge-green">NIRNAY CONVERGED (0.88 CONFIDENCE)</span>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '0.8rem' }}>
          Scenario A demonstrates the highest marginal utility per rupee invested (₹243/resident reached), addresses a severe gender equity deficit (68% women commuters affected), and fits comfortably within existing quarterly unallocated capital. Depot capacity is confirmed without construction overhead. Road resurfacing on Route 21B is recommended as an immediate pre-requisite.
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleTransmit} className="btn btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
            Proceed to Decision Desk to Sign Expenditure Warrant &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
