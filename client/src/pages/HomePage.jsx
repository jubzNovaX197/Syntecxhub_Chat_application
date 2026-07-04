import './HomePage.css';

const HomePage = () => {
  return (
    <main className="home-shell">
      <section className="home-panel" aria-label="Application status">
        <p className="home-kicker">Milestone 1</p>
        <h1>MERN Real-Time Chat</h1>
        <p>
          React, Express, MongoDB, and environment configuration are ready for
          the next authentication milestone.
        </p>
      </section>
    </main>
  );
};

export default HomePage;
