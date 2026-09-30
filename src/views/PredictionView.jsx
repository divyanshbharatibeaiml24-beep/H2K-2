import React, { useState } from 'react';
import { WARDS, INITIAL_NEEDS } from '../data/seedData';

const FORECAST_MODELS = [
  { id: 'arima', name: 'ARIMA Baseline', color: 'var(--cyan)', accuracy: 0.82 },
  { id: 'gbm', name: 'Gradient Boosted', color: 'var(--neon-green)', accuracy: 0.89 },
  { id: 'stgnn', name: 'Spatiotemporal GNN', color: 'var(--violet)', accuracy: 0.93 }
];

const FORECAST_DATA = [
  { ward: 'W-03', name: 'Velachery', service: 'Public Transport', current: 142, forecast_3m: 185, forecast_6m: 231, forecast_12m: 310, trend: 'rising', confidence: 0.88, freshness: '2h ago' },
  { ward: 'W-06', name: 'Tondiarpet', service: 'Water Supply', current: 98, forecast_3m: 112, forecast_6m: 128, forecast_12m: 155, trend: 'rising', confidence: 0.85, freshness: '4h ago' },
  { ward: 'W-04', name: 'Ambattur', service: 'Drainage', current: 76, forecast_3m: 105, forecast_6m: 148, forecast_12m: 201, trend: 'accelerating', confidence: 0.82, freshness: '1h ago' },
  { ward: 'W-01', name: 'Adyar', service: 'Street Lighting', current: 45, forecast_3m: 52, forecast_6m: 58, forecast_12m: 62, trend: 'stable', confidence: 0.91, freshness: '3h ago' },
  { ward: 'W-05', name: 'Sholinganallur', service: 'Healthcare', current: 34, forecast_3m: 61, forecast_6m: 89, forecast_12m: 130, trend: 'accelerating', confidence: 0.78, freshness: '6h ago' },
  { ward: 'W-08', name: 'Perambur', service: 'Road Maintenance', current: 67, forecast_3m: 74, forecast_6m: 80, forecast_12m: 88, trend: 'stable', confidence: 0.90, freshness: '2h ago' }
];

export default function PredictionView({ onSelectPage, triggerNotification }) {
  const [selectedModel, setSelectedModel] = useState('gbm');
  const [horizon, setHorizon] = useState('6m');
  const [showGaps, setShowGaps] = useState(false);
  const [runningForecast, setRunningForecast] = useState(false);

  const model = FORECAST_MODELS.find(m => m.id === selectedModel);
  const trendColor = (t) => t === 'accelerating' ? 'var(--neon-red)' : t === 'rising' ? 'var(--amber)' : 'var(--neon-green)';
  const trendIcon = (t) => t === 'accelerating' ? '🔺' : t === 'rising' ? '📈' : '➡️';
  const horizonKey = `forecast_${horizon}`;

  const handleRunForecast = () => {
    setRunningForecast(true);
    setTimeout(() => {
      setRunningForecast(false);
      setShowGaps(true);
      triggerNotification('📈 Forecast Cycle Complete', `${FORECAST_DATA.length} demand trajectories updated using ${model.name} (accuracy: ${(model.accuracy * 100).toFixed(0)}%).`, 'Forecast Engine', 'success');
    }, 1800);
  };

  return (
    <div>
      <div className="section-tag">SPATIOTEMPORAL DEMAND FORECASTING</div>
      <h2 style={{ fontSize: '1.55rem', fontWeight: 700, marginBottom: '0.3rem' }}>
        📈 Prediction Engine: Future Need & Infrastructure Stress
      </h2>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.1rem' }}>
        Forecasts expose horizon, training window, confidence, and known data gaps. Transparent time-series baselines with configurable model selection.
      </div>

      {/* Controls Row */}
      <div className="glass-card" style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', alignItems: 'flex-end', padding: '0.9rem 1.1rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>MODEL</div>
          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            className="global-select"
            style={{ width: '100%', maxWidth: '100%', padding: '0.45rem 0.7rem', fontSize: '0.82rem' }}
          >
            {FORECAST_MODELS.map(m => (
              <option key={m.id} value={m.id} style={{ background: '#070914', color: '#fff' }}>
                {m.name} (Accuracy: {(m.accuracy * 100).toFixed(0)}%)
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: '1 1 180px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>HORIZON</div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['3m', '6m', '12m'].map(h => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                className={`btn ${horizon === h ? 'btn-primary' : ''}`}
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.8rem' }}
              >
                {h === '3m' ? '3 Month' : h === '6m' ? '6 Month' : '12 Month'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button onClick={handleRunForecast} disabled={runningForecast} className="btn btn-primary" style={{ padding: '0.5rem 1.3rem' }}>
            {runningForecast ? '⏳ Computing...' : '🚀 Run Forecast Cycle'}
          </button>
        </div>
      </div>

      {/* Progress Bar during forecast */}
      {runningForecast && (
        <div className="glass-card" style={{ padding: '0.7rem 1rem', borderLeft: '3px solid var(--violet)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#94A3B8', marginBottom: '0.3rem' }}>
            <span className="mono-text">Forecasting with {model.name}...</span>
            <span className="mono-text">Training window: 24 months</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '6px', overflow: 'hidden' }}>
            <div style={{ width: '65%', background: 'var(--violet)', height: '100%', borderRadius: '9999px', animation: 'pulse 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      )}

      {/* Forecast Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
        {FORECAST_DATA.map(f => {
          const forecastVal = f[horizonKey];
          const delta = forecastVal - f.current;
          const deltaPct = ((delta / f.current) * 100).toFixed(0);
          const pressureColor = deltaPct > 80 ? 'var(--neon-red)' : deltaPct > 30 ? 'var(--amber)' : 'var(--neon-green)';

          return (
            <div key={f.ward} className="glass-card" style={{ borderLeft: `3px solid ${trendColor(f.trend)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <span className="mono-text" style={{ color: 'var(--cyan)', fontSize: '0.75rem', fontWeight: 700 }}>{f.ward}</span>
                  <h4 style={{ margin: '0.1rem 0 0 0', color: '#fff', fontSize: '0.95rem' }}>{f.name} — {f.service}</h4>
                </div>
                <span className={`badge ${f.trend === 'accelerating' ? 'badge-red' : f.trend === 'rising' ? 'badge-amber' : 'badge-green'}`}>
                  {trendIcon(f.trend)} {f.trend.toUpperCase()}
                </span>
              </div>

              {/* Metric Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', background: 'rgba(0,0,0,0.3)', padding: '0.7rem', borderRadius: '8px', marginBottom: '0.6rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current</div>
                  <div className="mono-text" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--cyan)' }}>{f.current}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>demand units</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Forecast ({horizon})</div>
                  <div className="mono-text" style={{ fontSize: '1.3rem', fontWeight: 700, color: pressureColor }}>{forecastVal}</div>
                  <div style={{ fontSize: '0.65rem', color: pressureColor }}>+{deltaPct}% pressure</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Confidence</div>
                  <div className="mono-text" style={{ fontSize: '1.3rem', fontWeight: 700, color: f.confidence >= 0.85 ? 'var(--neon-green)' : 'var(--amber)' }}>{(f.confidence * 100).toFixed(0)}%</div>
                  <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>{model.name}</div>
                </div>
              </div>

              {/* Pressure Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#94A3B8', minWidth: '75px' }}>Demand Δ</span>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '7px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, deltaPct)}%`, background: pressureColor, height: '100%', borderRadius: '9999px', transition: 'width 0.5s ease' }} />
                </div>
                <span className="mono-text" style={{ fontSize: '0.72rem', color: pressureColor, fontWeight: 700 }}>+{delta}</span>
              </div>

              {/* Data Freshness */}
              <div className="mono-text" style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Data freshness: {f.freshness}</span>
                <span>Model: <strong style={{ color: model.color }}>{model.name}</strong></span>
              </div>

              {/* Data Gaps Warning */}
              {showGaps && f.confidence < 0.85 && (
                <div style={{ marginTop: '0.5rem', background: 'rgba(255,165,0,0.1)', border: '1px solid rgba(255,165,0,0.3)', borderRadius: '6px', padding: '0.4rem 0.6rem', fontSize: '0.74rem', color: 'var(--amber)' }}>
                  ⚠️ Data gap detected: limited historical snapshots for this ward. Confidence degraded due to sparse training data.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Model Comparison Footer */}
      <div className="glass-card" style={{ marginTop: '0.5rem' }}>
        <div className="section-tag" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>MODEL ACCURACY COMPARISON</div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {FORECAST_MODELS.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="status-dot" style={{ background: m.color, boxShadow: `0 0 8px ${m.color}` }}></span>
              <span style={{ fontSize: '0.82rem', color: '#E2E8F0' }}>{m.name}</span>
              <div style={{ width: '100px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', height: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${m.accuracy * 100}%`, background: m.color, height: '100%', borderRadius: '9999px' }} />
              </div>
              <span className="mono-text" style={{ fontSize: '0.74rem', color: m.color, fontWeight: 700 }}>{(m.accuracy * 100).toFixed(0)}%</span>
              {m.id === selectedModel && <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>ACTIVE</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
