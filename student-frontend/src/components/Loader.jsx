export default function Loader({ label = 'Loading...' }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.spinner} />
      <p style={styles.text}>{label}</p>
    </div>
  );
}

const styles = {
  wrap: {
    padding: '3rem',
    textAlign: 'center',
    color: '#cbd5f5',
  },
  spinner: {
    width: '42px',
    height: '42px',
    border: '4px solid rgba(255,255,255,0.15)',
    borderTop: '4px solid #22d3ee',
    borderRadius: '50%',
    margin: '0 auto 1rem',
    animation: 'spin 1s linear infinite',
  },
  text: { fontSize: '0.9rem' },
};
