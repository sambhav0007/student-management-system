import { useEffect } from 'react';

export default function Toast({ type = 'info', message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{ ...styles.toast, ...styles[type] }}>
      {message}
    </div>
  );
}

const styles = {
  toast: {
    position: 'fixed',
    right: '1.5rem',
    bottom: '1.5rem',
    padding: '0.9rem 1.2rem',
    borderRadius: '10px',
    color: '#020617',
    fontWeight: 600,
    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
    zIndex: 9999,
    animation: 'fadeInUp 0.25s ease',
  },
  success: { background: '#22c55e' },
  error: { background: '#ef4444' },
  info: { background: '#38bdf8' },
};
