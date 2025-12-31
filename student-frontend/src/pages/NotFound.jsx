import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />

      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1>404</h1>
        <p>Page not found</p>

        <Link className="btn btn-accent" to="/">
          Go Home
        </Link>
      </div>
    </>
  );
}
