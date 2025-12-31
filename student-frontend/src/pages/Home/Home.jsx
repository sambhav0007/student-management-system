import Navbar from '../../components/Navbar';
import CoursesList from '../../components/CoursesList';

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1>
            Unlock Your <span className="highlight">Future</span>
          </h1>
          <p>Browse and enroll in expert-led courses</p>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses" className="courses-section">
        <div className="container">
          <h2>Courses</h2>
          <CoursesList />
        </div>
      </section>
    </>
  );
}
