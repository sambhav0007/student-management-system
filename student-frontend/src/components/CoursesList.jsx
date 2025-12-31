import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../api/courses.api';
import { enrollCourse } from '../api/enrollments.api';

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error('Failed to fetch courses', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await enrollCourse(courseId);
      alert('Enrolled successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading courses...</p>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {courses.map((course) => (
            <div style={styles.card} key={course._id}>
              <div style={styles.cardBody}>
                <h3 style={styles.title}>{course.courseName}</h3>
                <p style={styles.desc}>{course.description}</p>

                <div style={styles.meta}>
                  <span style={styles.code}>{course.courseCode}</span>
                  <span style={styles.duration}>{course.duration}</span>
                </div>
              </div>

              <button
                style={styles.button}
                onClick={() => handleEnroll(course._id)}
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    background: '#f9fafb',
    padding: '3rem 1rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.8rem',
  },
  card: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '1.4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardBody: {
    marginBottom: '1.2rem',
  },
  title: {
    fontSize: '1.05rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#111827',
  },
  desc: {
    fontSize: '0.9rem',
    color: '#4b5563',
    lineHeight: 1.5,
    marginBottom: '0.9rem',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#6b7280',
  },
  code: {
    fontWeight: 600,
  },
  duration: {
    fontStyle: 'italic',
  },
  button: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '8px',
    border: 'none',
    background: '#16a34a',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
