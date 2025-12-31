import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import { getCourses } from '../../api/courses.api';
import { enrollCourse } from '../../api/enrollments.api';
import { useNavigate } from 'react-router-dom';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch {
      setToast({ type: 'error', message: 'Failed to load courses' });
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollClick = (courseId) => {
    if (!token) {
      // 🔐 remember where user was
      localStorage.setItem('redirectAfterLogin', '/');
      navigate('/login');
      return;
    }

    enroll(courseId);
  };

  const enroll = async (courseId) => {
    try {
      await enrollCourse(courseId);
      setToast({ type: 'success', message: 'Enrolled successfully!' });
    } catch (err) {
      setToast({
        type: 'error',
        message: err.response?.data?.message || 'Enrollment failed',
      });
    }
  };

  return (
    <>
      <Navbar />

      {loading ? (
        <Loader label="Loading courses..." />
      ) : (
        <div style={styles.page}>
          <div style={styles.container}>
            <h1 style={styles.heading}>📚 Available Courses</h1>

            <div style={styles.grid}>
              {courses.map((course) => (
                <div key={course._id} style={styles.card}>
                  <h3>{course.courseName}</h3>
                  <p style={styles.code}>{course.courseCode}</p>
                  <p style={styles.desc}>{course.description}</p>

                  <button
                    style={styles.btn}
                    onClick={() => handleEnrollClick(course._id)}
                  >
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

const styles = {
  page: {
    minHeight: 'calc(100vh - 70px)',
    background: 'radial-gradient(circle at top, #0f172a, #020617)',
    padding: '2rem',
    color: '#fff',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'rgba(255,255,255,0.08)',
    padding: '1.5rem',
    borderRadius: '16px',
    backdropFilter: 'blur(14px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  },
  code: {
    fontSize: '0.85rem',
    color: '#93c5fd',
  },
  desc: {
    fontSize: '0.9rem',
    margin: '0.7rem 0 1rem',
  },
  btn: {
    width: '100%',
    padding: '0.65rem',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg,#22d3ee,#6366f1)',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
