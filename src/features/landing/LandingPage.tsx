import { isFirebaseConfigured } from "../../lib/firebase";

const experiencePillars = [
  {
    title: "Intent-first matching",
    copy: "Umingle centers every session around why people want to meet, so conversations begin with context.",
  },
  {
    title: "Live video handoff",
    copy: "The product foundation is ready for real-time room state, availability, and video session orchestration.",
  },
  {
    title: "Firebase-backed growth",
    copy: "Authentication, user state, match queues, and media storage can build on the anyware-door Firebase project.",
  },
];

const stats = [
  ["1:1", "video matching"],
  ["24/7", "availability-ready"],
  ["Firebase", "backend foundation"],
];

export function LandingPage() {
  function handleStartMatching() {
    document.getElementById("matching-preview")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="landing-page">
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="wordmark" href="/" aria-label="Umingle home">
          <span className="wordmark-icon" aria-hidden="true">
            u
          </span>
          Umingle
        </a>
        <div className="nav-links" aria-label="Page sections">
          <a href="#how-it-works">How it works</a>
          <a href="#matching-preview">Matching</a>
        </div>
      </nav>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy-block">
          <p className="eyebrow">Video matching for meaningful conversations</p>
          <h1 id="hero-title">Meet someone worth your next conversation.</h1>
          <p className="hero-copy">
            Umingle helps people move from curiosity to live video faster, with a
            Firebase-backed foundation for secure accounts, real-time matching state,
            and future video room handoffs.
          </p>
          <div className="hero-actions">
            <button className="primary-action" onClick={handleStartMatching} type="button">
              Start Matching
            </button>
            <a className="secondary-link" href="#how-it-works">
              See how it works
            </a>
          </div>
          <div className="firebase-badge" role="status">
            <span className={isFirebaseConfigured ? "status-dot ready" : "status-dot"} />
            {isFirebaseConfigured
              ? "Connected to anyware-door Firebase config"
              : "Ready for anyware-door Firebase credentials"}
          </div>
        </div>

        <div className="match-card" aria-label="Umingle match preview">
          <div className="match-card-header">
            <span>Live queue</span>
            <strong>Umingle</strong>
          </div>
          <div className="profile-orbit">
            <div className="profile-avatar primary">A</div>
            <div className="connection-line" />
            <div className="profile-avatar secondary">M</div>
          </div>
          <div className="match-details">
            <p className="match-label">Suggested conversation</p>
            <h2>Creative founders building after hours</h2>
            <p>
              Shared interests detected: product ideas, remote teams, short-form video,
              and startup rituals.
            </p>
          </div>
          <div className="match-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Umingle product highlights">
        {stats.map(([value, label]) => (
          <div className="stat-card" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="content-section" id="how-it-works" aria-labelledby="how-title">
        <p className="eyebrow">How it works</p>
        <h2 id="how-title">A focused path from profile signal to live video.</h2>
        <div className="pillar-grid">
          {experiencePillars.map((pillar, index) => (
            <article className="pillar-card" key={pillar.title}>
              <span className="step-number">0{index + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="matching-panel" id="matching-preview" aria-labelledby="matching-title">
        <div>
          <p className="eyebrow">Start Matching</p>
          <h2 id="matching-title">The first matching moment is ready for the next build step.</h2>
          <p>
            This initial landing page is wired to the <code>anyware-door</code> Firebase
            project configuration. Add Firebase web credentials in <code>.env.local</code>
            when you are ready to enable authenticated matching flows.
          </p>
        </div>
        <button className="primary-action large-action" type="button">
          Start Matching
        </button>
      </section>
    </main>
  );
}
