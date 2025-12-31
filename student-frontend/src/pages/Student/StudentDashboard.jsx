import Navbar from '../../components/Navbar';
import CoursesList from '../../components/CoursesList';

export default function StudentDashboard() {
  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <h1 style={styles.title}>🎓 My Courses</h1>

        {/* This flag tells CoursesList to show only enrolled courses */}
        <CoursesList showMyOnly={true} />
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: 'calc(100vh - 70px)',
    padding: '2rem',
    background: 'radial-gradient(circle at top, #0f172a, #020617)',
    color: '#fff',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
  },
};
