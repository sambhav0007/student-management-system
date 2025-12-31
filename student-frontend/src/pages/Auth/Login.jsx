import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { login } from '../../api/auth.api';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: saveAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: email.trim().toLowerCase(),
      password,
    };

    console.log('Login payload:', payload);

    try {
      const data = await login(payload);

      saveAuth(data);

      // Students always go to home; admins can be redirected or go to admin dashboard
      if (data.user.role === 'STUDENT') {
        localStorage.removeItem('redirectAfterLogin');
        navigate('/');
      } else {
        const redirectPath =
          localStorage.getItem('redirectAfterLogin') || '/admin/dashboard';
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      }
    } catch (err) {
      console.error('Login error:', err.response?.data);

      alert(
        err.response?.data?.message ||
        'Login failed – invalid credentials'
      );
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to continue</p>

          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.button}>Login</button>
          </form>

          <p style={styles.footer}>
            Don’t have an account?{' '}
            <Link to="/signup" style={styles.link}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'radial-gradient(circle at top, #0f172a, #020617)',
    padding: '2rem',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '2.5rem',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(14px)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    color: '#fff',
  },
  title: { textAlign: 'center', fontSize: '1.8rem' },
  subtitle: {
    textAlign: 'center',
    marginBottom: '1.8rem',
    color: '#cbd5f5',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.25)',
    background: 'rgba(0,0,0,0.4)',
    color: '#fff',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
    fontWeight: 600,
    cursor: 'pointer',
  },
  footer: { marginTop: '1.5rem', textAlign: 'center' },
  link: { color: '#38bdf8', textDecoration: 'none' },
};
