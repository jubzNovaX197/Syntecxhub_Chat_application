import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <main className="not-found-shell">
      <section className="not-found-panel" aria-label="Page not found">
        <p>404</p>
        <h1>Page not found</h1>
        <p>
          <Link to="/">Return home</Link>
        </p>
      </section>
    </main>
  );
};

export default NotFoundPage;
