import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const scrollToCourses = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('courses')?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 120);
    } else {
      document.getElementById('courses')?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>
          EduEnroll
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        {!user && (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.signupBtn}>
              Sign Up
            </Link>
          </>
        )}

        {user?.role === 'STUDENT' && (
          <>
            <Link to="/dashboard" style={styles.link}>
              My Courses
            </Link>
            <span style={styles.user}>
              {user.name}
            </span>
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}

        {user?.role === 'ADMIN' && (
          <>
            <Link to="/admin/dashboard" style={styles.link}>
              Dashboard
            </Link>
            <span style={styles.user}>
              {user.name}
            </span>
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    height: '70px',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(2,6,23,0.9)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  logo: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#fff',
    textDecoration: 'none',
  },
  linkBtn: {
    background: 'transparent',
    border: 'none',
    color: '#c7d2fe',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  link: {
    color: '#e5e7eb',
    textDecoration: 'none',
    fontSize: '0.95rem',
  },
  signupBtn: {
    padding: '0.45rem 0.9rem',
    borderRadius: '6px',
    background: 'linear-gradient(135deg,#6366f1,#22d3ee)',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #22d3ee',
    color: '#22d3ee',
    padding: '0.35rem 0.7rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  user: {
    color: '#93c5fd',
    fontSize: '0.9rem',
  },
};
