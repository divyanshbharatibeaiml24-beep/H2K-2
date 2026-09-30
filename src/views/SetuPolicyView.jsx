import React, { useState } from 'react';

const POLICY_DOCS = [
  { id: 'PD-001', title: 'Tamil Nadu Urban Transport Policy 2025', sections: 12, status: 'indexed', date: '2025-08-15', type: 'State Policy' },
  { id: 'PD-002', title: 'Municipal Corporation Budget Allocation Rules', sections: 28, status: 'indexed', date: '2026-04-01', type: 'Financial' },
  { id: 'PD-003', title: 'Smart Cities Mission — Urban Mobility Guidelines', sections: 15, status: 'indexed', date: '2024-12-10', type: 'Central Govt' },
  { id: 'PD-004', title: 'JNNURM Infrastructure Standards for Tier-II Cities', sections: 22, status: 'indexed', date: '2023-06-20', type: 'Standards' },
  { id: 'PD-005', title: 'District Disaster Management Plan — Chennai', sections: 18, status: 'partial', date: '2026-01-08', type: 'Emergency' },
  { id: 'PD-006', title: 'Equity in Public Service Delivery — NITI Aayog Framework', sections: 9, status: 'indexed', date: '2025-03-22', type: 'Framework' }
];

const SAMPLE_QUERIES = [
  "What are the budget allocation rules for evening transport services?",
  "Which policy governs infrastructure in silent zones?",
  "Summarize equity requirements for public transport under TN Urban Policy",
  "What are disaster resilience standards for drainage infrastructure?"
];

export default function SetuPolicyView({ onSelectPage, triggerNotification }) {
  const [query, setQuery] = useState('');
  const [synthesis, setSynthesis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleQuery = (q) => {
    const queryText = q || query;
    if (!queryText.trim()) return;

    setLoading(true);
    setQuery(queryText);

    setTimeout(() => {
      let result;
      const ql = queryText.toLowerCase();

      if (ql.includes('budget') || ql.includes('allocation') || ql.includes('transport')) {
        result = {
          answer: 'Under the Municipal Corporation Budget Allocation Rules (PD-002, Section 14.3), evening transport services are eligible for funding from the "Urban Mobility — Equity Enhancement" budget head. The allocation ceiling is 15% of the quarterly transport budget for new route additions. The TN Urban Transport Policy 2025 (PD-001, Section 7.2) further mandates that at least 30% of transport budget increments must target under-served time windows (post-7PM services).',
          sources: [
            { doc: 'PD-002', section: '§14.3 — Budget Allocation for Transport Equity', relevance: 0.94 },
            { doc: 'PD-001', section: '§7.2 — Evening Service Mandates', relevance: 0.89 },
            { doc: 'PD-003', section: '§4.1 — Smart City Mobility Fund', relevance: 0.72 }
          ],
          confidence: 0.91,
          caveats: 'Budget rules are subject to quarterly revision. Last updated: 2026-04-01. Verify current allocation ceilings with the Finance Department.'
        };
      } else if (ql.includes('silent') || ql.includes('equity')) {
        result = {
          answer: 'The NITI Aayog Equity Framework (PD-006, Section 5) defines silent zones as areas with statistically low reporting activity relative to demographic capacity. The TN Urban Transport Policy (PD-001, Section 9.1) mandates proactive outreach in flagged silent zones before resource allocation decisions. Infrastructure investments in silent zones receive a 1.3x equity multiplier under PD-002 §16.2.',
          sources: [
            { doc: 'PD-006', section: '§5 — Equity in Under-Reported Areas', relevance: 0.96 },
            { doc: 'PD-001', section: '§9.1 — Silent Zone Proactive Mandate', relevance: 0.88 },
            { doc: 'PD-002', section: '§16.2 — Equity Multiplier Rules', relevance: 0.85 }
          ],
          confidence: 0.88,
          caveats: 'Silent zone classification criteria vary by municipal body. Framework guidance is advisory for states; verify local adoption status.'
        };
      } else if (ql.includes('disaster') || ql.includes('drainage') || ql.includes('resilience')) {
        result = {
          answer: 'The District Disaster Management Plan (PD-005, Section 8.4) requires storm drains to handle 120mm/hr rainfall intensity with 15% safety margin. JNNURM standards (PD-004, Section 11.3) mandate quarterly capacity assessments for all drainage infrastructure in flood-prone wards. Current Ambattur Storm Drain (IA-004) is at 22% capacity — well below the 60% minimum threshold specified in PD-005 §8.6.',
          sources: [
            { doc: 'PD-005', section: '§8.4 — Drainage Capacity Standards', relevance: 0.93 },
            { doc: 'PD-004', section: '§11.3 — Quarterly Infrastructure Assessment', relevance: 0.87 },
            { doc: 'PD-005', section: '§8.6 — Minimum Capacity Thresholds', relevance: 0.91 }
          ],
          confidence: 0.85,
          caveats: 'PD-005 is partially indexed (18 of 24 sections). Some recent amendments may not be reflected. Cross-reference with the latest district gazette.'
        };
      } else {
        result = {
          answer: `Policy retrieval completed across ${POLICY_DOCS.length} indexed documents. No high-confidence matches found for "${queryText}". Consider refining your query with specific policy domains (transport, water, health, drainage) or referencing specific ward/infrastructure identifiers.`,
          sources: [
            { doc: 'PD-001', section: 'Full document scan', relevance: 0.45 },
            { doc: 'PD-002', section: 'Full document scan', relevance: 0.38 }
          ],
          confidence: 0.52,
          caveats: 'Low confidence result. The query may reference topics not covered in the current document corpus.'
        };
      }

      setSynthesis(result);
      setHistory(prev => [{ query: queryText, timestamp: new Date().toLocaleTimeString(), confidence: result.confidence }, ...prev.slice(0, 9)]);
      setLoading(false);
      triggerNotification('📄 SETU Retrieval Complete', `Grounded synthesis from ${result.sources.length} policy sources.`, 'SETU Policy Copilot', 'success');
    }, 1500);
  };

  return (
    <div>
      <div className="section-tag">GROUNDED RETRIEVAL-AUGMENTED SYNTHESIS</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        📄 SETU Policy Copilot: Evidence-Grounded Policy Intelligence
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Retrieval from approved policy documents only. SETU never invents policy content — every claim is sourced, versioned, and caveated. AI output is advisory; authorized humans own consequential decisions.
      </div>

      {/* Query Input */}
      <div className="glass-card" style={{ padding: '0.9rem 1.1rem' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>POLICY QUERY</div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <input
            type="text"
            placeholder="Ask a policy question grounded in indexed documents..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && query && handleQuery()}
            style={{
              flex: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '8px', padding: '0.6rem 1rem', color: '#fff', fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)', outline: 'none'
            }}
          />
          <button onClick={() => handleQuery()} disabled={!query || loading} className="btn btn-primary">
            {loading ? '⏳ Retrieving...' : '🔍 Query Policy'}
          </button>
        </div>
        {/* Quick query suggestions */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
          {SAMPLE_QUERIES.map((sq, i) => (
            <button key={i} onClick={() => handleQuery(sq)} className="btn" style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem' }}>
              {sq.length > 50 ? sq.slice(0, 50) + '...' : sq}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
        {/* Synthesis Result */}
        <div>
          {synthesis ? (
            <>
              <div className="glass-card" style={{ borderLeft: `4px solid ${synthesis.confidence >= 0.8 ? 'var(--neon-green)' : synthesis.confidence >= 0.6 ? 'var(--amber)' : 'var(--neon-red)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>GROUNDED SYNTHESIS</span>
                  <span className={`badge ${synthesis.confidence >= 0.8 ? 'badge-green' : synthesis.confidence >= 0.6 ? 'badge-amber' : 'badge-red'}`}>
                    Confidence: {(synthesis.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.7, marginBottom: '0.8rem' }}>
                  {synthesis.answer}
                </div>

                {/* Source References */}
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.7rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--violet)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SOURCE REFERENCES</div>
                  {synthesis.sources.map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0', borderBottom: i < synthesis.sources.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <div>
                        <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.74rem', fontWeight: 700 }}>{s.doc}</span>
                        <span style={{ fontSize: '0.78rem', color: '#CBD5E1', marginLeft: '0.5rem' }}>{s.section}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: '50px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${s.relevance * 100}%`, background: s.relevance >= 0.85 ? 'var(--neon-green)' : 'var(--amber)', height: '100%', borderRadius: '9999px' }} />
                        </div>
                        <span className="mono-text" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{(s.relevance * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Caveats */}
                <div style={{ marginTop: '0.6rem', background: 'rgba(255,165,0,0.08)', border: '1px solid rgba(255,165,0,0.2)', borderRadius: '6px', padding: '0.5rem 0.7rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--amber)' }}>⚠️ CAVEATS: </span>
                  <span style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>{synthesis.caveats}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
              <span style={{ fontSize: '2.5rem' }}>📄</span>
              <h3 style={{ color: '#94A3B8', marginTop: '0.6rem', fontSize: '1rem' }}>Query the Policy Corpus</h3>
              <p style={{ color: '#64748B', fontSize: '0.82rem', maxWidth: '400px', margin: '0.5rem auto' }}>
                Ask questions about transport regulations, budget allocation rules, equity frameworks, or infrastructure standards. All answers are grounded in indexed documents.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Doc Registry + History */}
        <div>
          <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>INDEXED DOCUMENT CORPUS</div>
          <div className="glass-card">
            {POLICY_DOCS.map((d, i) => (
              <div key={d.id} style={{ padding: '0.5rem 0', borderBottom: i < POLICY_DOCS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.72rem', fontWeight: 700 }}>{d.id}</span>
                  <span className={`badge ${d.status === 'indexed' ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '0.6rem' }}>
                    {d.status === 'indexed' ? '✓ INDEXED' : '⚠ PARTIAL'}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#E2E8F0', marginTop: '0.15rem' }}>{d.title}</div>
                <div className="mono-text" style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '0.1rem' }}>
                  {d.sections} sections • {d.type} • {d.date}
                </div>
              </div>
            ))}
          </div>

          {/* Query History */}
          {history.length > 0 && (
            <>
              <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem', marginTop: '0.3rem' }}>QUERY HISTORY</div>
              <div className="glass-card">
                {history.map((h, i) => (
                  <div key={i} style={{ padding: '0.35rem 0', borderBottom: i < history.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', cursor: 'pointer' }} onClick={() => handleQuery(h.query)}>
                    <div style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>{h.query.length > 60 ? h.query.slice(0, 60) + '...' : h.query}</div>
                    <div className="mono-text" style={{ fontSize: '0.66rem', color: '#64748B' }}>
                      {h.timestamp} • Confidence: <span style={{ color: h.confidence >= 0.8 ? 'var(--neon-green)' : 'var(--amber)' }}>{(h.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
