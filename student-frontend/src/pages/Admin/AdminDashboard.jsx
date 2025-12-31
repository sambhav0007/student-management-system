import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../../api/courses.api';
import { getAllEnrollments } from '../../api/admin.api';

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({
    courseName: '',
    courseCode: '',
    description: '',
    duration: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [c, e] = await Promise.all([
        getCourses(),
        getAllEnrollments(),
      ]);
      setCourses(c);
      setEnrollments(e);
    } catch (err) {
      console.error('Admin load error', err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCourse(editingId, form);
    } else {
      await createCourse(form);
    }
    setForm({
      courseName: '',
      courseCode: '',
      description: '',
      duration: '',
    });
    setEditingId(null);
    loadData();
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setForm({
      courseName: course.courseName,
      courseCode: course.courseCode,
      description: course.description,
      duration: course.duration,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this course?')) {
      await deleteCourse(id);
      loadData();
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.pageTitle}>Admin Dashboard</h1>

          {/* COURSE FORM */}
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>
              {editingId ? 'Edit Course' : 'Create Course'}
            </h2>

            <form onSubmit={handleSubmit} style={styles.formGrid}>
              <div>
                <label style={styles.label}>Course Name</label>
                <input
                  name="courseName"
                  value={form.courseName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>Course Code</label>
                <input
                  name="courseCode"
                  value={form.courseCode}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>Duration</label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  style={styles.textarea}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <button style={styles.primaryBtn} type="submit">
                  {editingId ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </form>
          </section>

          {/* COURSES TABLE */}
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Courses</h2>

            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Duration</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c._id} style={styles.tableRow}>
                    <td>{c.courseName}</td>
                    <td>{c.courseCode}</td>
                    <td>{c.duration}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        style={styles.linkBtn}
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.dangerBtn}
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* ENROLLMENTS TABLE */}
          <section style={styles.card}>
            <h2 style={styles.sectionTitle}>Enrollments</h2>

            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((e, i) => (
                  <tr key={i} style={styles.tableRow}>
                    <td>{e.studentName}</td>
                    <td>{e.courseName}</td>
                    <td>
                      {new Date(e.enrollmentDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '2rem 1rem',
    background: 'linear-gradient(135deg, #020617, #020617)',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  pageTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '2rem',
    color: '#f9fafb',
  },

  card: {
    background: 'rgba(15, 23, 42, 0.92)',
    padding: '1.8rem',
    borderRadius: '16px',
    marginBottom: '2rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
    border: '1px solid rgba(148,163,184,0.12)',
  },

  sectionTitle: {
    fontSize: '1.25rem',
    marginBottom: '1.2rem',
    color: '#e5e7eb',
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },

  label: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#cbd5f5',
    marginBottom: '0.3rem',
    display: 'block',
  },

  input: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '8px',
    background: '#020617',
    border: '1px solid #334155',
    color: '#f9fafb',
  },

  textarea: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '8px',
    background: '#020617',
    border: '1px solid #334155',
    color: '#f9fafb',
  },

  primaryBtn: {
    padding: '0.7rem 1.6rem',
    background: 'linear-gradient(90deg, #6366f1, #38bdf8)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 700,
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    color: '#e5e7eb',
  },

  tableHeader: {
    background: '#020617',
  },

  tableRow: {
    borderBottom: '1px solid rgba(148,163,184,0.15)',
  },

  linkBtn: {
    marginRight: '0.6rem',
    padding: '0.35rem 0.9rem',
    borderRadius: '8px',
    background: 'linear-gradient(90deg, #6366f1, #38bdf8)',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
  },

  dangerBtn: {
    padding: '0.35rem 0.9rem',
    borderRadius: '8px',
    background: 'linear-gradient(90deg, #ef4444, #dc2626)',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
  },
};
