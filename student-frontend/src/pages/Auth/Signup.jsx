import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { signup } from '../../api/auth.api';

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FRONTEND PASSWORD LENGTH VALIDATION
    if (form.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // ✅ FRONTEND CONFIRM PASSWORD VALIDATION
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      name: form.username.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: form.role,
    };

    try {
      const data = await signup(payload);

      // ✅ STORE TOKEN + USER (AUTO LOGIN)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ ROLE-BASED REDIRECT (respect redirectAfterLogin)
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
      alert(
        err.response?.data?.message ||
        'Signup failed'
      );
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join EduEnroll</p>

          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />

            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Email address"
              required
              onChange={handleChange}
            />

            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password (min 6 chars)"
              required
              onChange={handleChange}
            />

            <input
              style={styles.input}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
            />

            <select
              style={styles.select}
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="STUDENT">🎓 Student</option>
              <option value="ADMIN">🛠 Admin</option>
            </select>

            <button style={styles.button}>Sign Up</button>
          </form>

          <p style={styles.footer}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>
              Login
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
    maxWidth: '460px',
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
  select: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1.2rem',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.25)',
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '0.85rem',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
    fontWeight: 600,
    cursor: 'pointer',
  },
  footer: { marginTop: '1.5rem', textAlign: 'center' },
  link: { color: '#38bdf8', textDecoration: 'none' },
};
