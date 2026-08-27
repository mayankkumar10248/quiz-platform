 import { useEffect, useState } from "react";
import "./index.css";

const API_URL = "http://localhost:5000/api/subjects";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch subjects from MongoDB through Express
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.success) {
        setSubjects(data.subjects);
      } else {
        setError("Unable to load subjects.");
      }
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const scrollToSubjects = () => {
    document
      .getElementById("subjects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLeaderboard = () => {
    document
      .getElementById("leaderboard")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">
        <div className="navbar-logo">
          <div className="logo-icon">Q</div>
          QuizMaster
        </div>

        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#subjects">Subjects</a>
          <a href="#leaderboard">Leaderboard</a>
        </div>

        <div className="navbar-actions">
          <button className="login-btn">Login</button>

          <button className="signup-btn">
            Get Started
          </button>
        </div>
      </nav>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero" id="home">
        <div className="hero-left">

          <div className="hero-tag">
            <span>✦</span>
            SMART QUIZ PLATFORM
          </div>

          <h1>
            Learn More.
            <br />
            <span>Challenge Yourself.</span>
          </h1>

          <p>
            Test your knowledge, compete with other students,
            and track your progress across multiple subjects.
          </p>

          <div className="hero-buttons">

            <button
              className="hero-primary"
              onClick={scrollToSubjects}
            >
              Explore Subjects →
            </button>

            <button
              className="hero-secondary"
              onClick={scrollToLeaderboard}
            >
              View Leaderboard
            </button>

          </div>

          <div className="hero-points">
            <span>✓ Multiple Subjects</span>
            <span>✓ Instant Results</span>
            <span>✓ Student Rankings</span>
          </div>

        </div>

        {/* =========================
            QUIZ PREVIEW
        ========================= */}

        <div className="hero-right">

          <div className="quiz-window">

            <div className="quiz-header">

              <div>
                <small>JAVA • BEGINNER</small>
                <strong>Java Fundamentals</strong>
              </div>

              <div className="question-count">
                04 / 10
              </div>

            </div>

            <div className="progress">
              <div className="progress-value"></div>
            </div>

            <h2>
              Which keyword is used to create a
              class in Java?
            </h2>

            <div className="options">

              <div className="option selected">
                <span>A</span>
                class
              </div>

              <div className="option">
                <span>B</span>
                object
              </div>

              <div className="option">
                <span>C</span>
                create
              </div>

              <div className="option">
                <span>D</span>
                new
              </div>

            </div>

            <div className="quiz-footer">

              <span>
                Choose one answer
              </span>

              <button>
                Next →
              </button>

            </div>

          </div>

          {/* Score Card */}

          <div className="score-card">

            <div className="score-icon">
              🏆
            </div>

            <div>
              <small>BEST SCORE</small>
              <strong>92%</strong>
            </div>

          </div>

          {/* Rank Card */}

          <div className="rank-card">

            <div className="rank-icon">
              ↗
            </div>

            <div>
              <small>YOUR RANK</small>
              <strong>#08</strong>
            </div>

          </div>

        </div>
      </section>

      {/* =========================
          FEATURES
      ========================= */}

      <section
        className="features-section"
        id="features"
      >

        <div className="section-heading">

          <span>WHY QUIZMASTER</span>

          <h2>
            Everything you need to
            <strong> improve.</strong>
          </h2>

          <p>
            Practice regularly, understand your performance
            and compete with students through one simple platform.
          </p>

        </div>

        <div className="features-grid">

          {/* Feature 1 */}

          <div className="feature-card feature-large">

            <div className="feature-number">
              01
            </div>

            <div className="feature-icon">
              ⚡
            </div>

            <h3>
              Instant Results
            </h3>

            <p>
              Get your score immediately after completing
              a quiz and see where you can improve.
            </p>

            <div className="feature-link">
              View performance →
            </div>

          </div>

          {/* Feature 2 */}

          <div className="feature-card">

            <div className="feature-number">
              02
            </div>

            <div className="feature-icon blue">
              📚
            </div>

            <h3>
              Multiple Subjects
            </h3>

            <p>
              Practice programming, databases,
              operating systems and many other subjects.
            </p>

            <div className="feature-link">
              Explore subjects →
            </div>

          </div>

          {/* Feature 3 */}

          <div className="feature-card">

            <div className="feature-number">
              03
            </div>

            <div className="feature-icon orange">
              🎯
            </div>

            <h3>
              Track Progress
            </h3>

            <p>
              Monitor your scores and understand how
              your performance changes over time.
            </p>

            <div className="feature-link">
              Track progress →
            </div>

          </div>

          {/* Feature 4 */}

          <div className="feature-card feature-wide">

            <div>

              <div className="feature-icon green">
                🏆
              </div>

              <h3>
                Compete on the Leaderboard
              </h3>

              <p>
                Compare your results with other students
                and work your way toward the top.
              </p>

            </div>

            <div className="mini-chart">

              <div className="chart-bar bar-one"></div>
              <div className="chart-bar bar-two"></div>
              <div className="chart-bar bar-three"></div>
              <div className="chart-bar bar-four"></div>
              <div className="chart-bar bar-five"></div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          SUBJECTS
      ========================= */}

      <section
        className="subjects-section"
        id="subjects"
      >

        <div className="subjects-heading">

          <div>

            <span>
              EXPLORE
            </span>

            <h2>
              Choose your subject.
            </h2>

          </div>

          <p>
            Select a subject and start testing
            your knowledge.
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="subject-status">
            Loading subjects...
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="subject-status">
            <p>{error}</p>

            <button
              onClick={fetchSubjects}
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No subjects */}

        {!loading &&
          !error &&
          subjects.length === 0 && (
            <div className="subject-status">

              <div className="empty-icon">
                📚
              </div>

              <h3>
                No subjects available yet
              </h3>

              <p>
                Subjects will appear here when
                they are added.
              </p>

            </div>
          )}

        {/* Database Subjects */}

        {!loading &&
          !error &&
          subjects.length > 0 && (

            <div className="subjects-grid">

              {subjects.map((subject) => (

                <SubjectCard
                  key={subject._id}
                  icon={subject.icon || "📚"}
                  name={subject.name}
                  description={
                    subject.description ||
                    "Test your knowledge"
                  }
                />

              ))}

            </div>

          )}

      </section>

      {/* =========================
          LEADERBOARD
      ========================= */}

      <section
        className="leaderboard-section"
        id="leaderboard"
      >

        <div className="leaderboard-heading">

          <div>

            <span>
              TOP STUDENTS
            </span>

            <h2>
              Leaderboard.
            </h2>

          </div>

          <p>
            Keep practicing and climb your way
            to the top.
          </p>

        </div>

        <div className="leaderboard-wrapper">

          <div className="leaderboard-header">

            <div>

              <span>
                THIS WEEK
              </span>

              <h3>
                Top Performers
              </h3>

            </div>

            <button>
              View all →
            </button>

          </div>

          <div className="leaderboard-list">

            <LeaderboardRow
              rank="01"
              name="Alex Sharma"
              score="980"
              movement="↑ 2"
            />

            <LeaderboardRow
              rank="02"
              name="Rahul Verma"
              score="945"
              movement="↑ 1"
            />

            <LeaderboardRow
              rank="03"
              name="Priya Singh"
              score="920"
              movement="↑ 4"
            />

            <LeaderboardRow
              rank="04"
              name="Aman Gupta"
              score="890"
              movement="↑ 1"
            />

            <LeaderboardRow
              rank="05"
              name="Neha Kapoor"
              score="875"
              movement="↑ 3"
            />

          </div>

        </div>

      </section>

    </div>
  );
}


/* =========================
   SUBJECT CARD
========================= */

function SubjectCard({
  icon,
  name,
  description
}) {

  return (

    <div className="subject-card">

      <div className="subject-top">

        <div className="subject-icon">
          {icon}
        </div>

        <div className="subject-arrow">
          ↗
        </div>

      </div>

      <h3>
        {name}
      </h3>

      <p>
        {description}
      </p>

      <div className="subject-bottom">

        <span>
          Quiz available
        </span>

        <span>
          Start →
        </span>

      </div>

    </div>

  );
}


/* =========================
   LEADERBOARD ROW
========================= */

function LeaderboardRow({
  rank,
  name,
  score,
  movement
}) {

  return (

    <div className="leaderboard-row">

      <div className="rank">
        #{rank}
      </div>

      <div className="student-info">

        <div className="student-avatar">
          {name.charAt(0)}
        </div>

        <div>

          <strong>
            {name}
          </strong>

          <small>
            Quiz Champion
          </small>

        </div>

      </div>

      <div className="score">

        <strong>
          {score}
        </strong>

        <small>
          points
        </small>

      </div>

      <div className="movement">
        {movement}
      </div>

    </div>

  );

}

export default App;