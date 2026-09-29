import React, { useEffect } from 'react';

export default function CornerToast({ notification, onDismiss }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  const isSuccess = notification.status === 'success';
  const color = isSuccess ? 'var(--neon-green)' : 'var(--cyan)';

  return (
    <div 
      className="corner-toast"
      style={{
        borderColor: color,
        borderLeftColor: color
      }}
    >
      <div className="corner-toast-title">
        <span style={{ color, fontSize: '0.9rem' }}>●</span>
        <span>{notification.title}</span>
        <button
          onClick={onDismiss}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
      </div>
      <div className="corner-toast-body">
        {notification.body}
      </div>
      <div className="corner-toast-meta">
        <span>{notification.meta || 'Kernel Event'}</span>
        <span style={{ color, fontWeight: 700 }}>
          ✓ {notification.status === 'success' ? 'RUN SUCCESSFUL' : notification.status?.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
