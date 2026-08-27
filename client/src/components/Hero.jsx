 function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-tag">
          <span>✦</span>
          AI-POWERED LEARNING
        </div>

        <h1>
          Master Any Subject.
          <br />
          <span>One Quiz at a Time.</span>
        </h1>

        <p>
          Challenge yourself, compete with other students, and turn your
          study material into personalized quizzes with AI.
        </p>

        <div className="hero-buttons">
          <button className="hero-primary">
            Take a Quiz <span>→</span>
          </button>

          <button className="hero-secondary">
            Upload PDF <span>↗</span>
          </button>
        </div>

        <div className="hero-points">
          <span>⚡ AI Generated</span>
          <span>🏆 Live Rankings</span>
          <span>✓ Instant Results</span>
        </div>
      </div>

      <div className="hero-right">
        <div className="quiz-window">

          <div className="quiz-header">
            <div>
              <small>LIVE QUIZ</small>
              <strong>Java Fundamentals</strong>
            </div>

            <div className="question-count">
              04 / 10
            </div>
          </div>

          <div className="progress">
            <div className="progress-value"></div>
          </div>

          <h2>What is Java primarily used for?</h2>

          <div className="options">
            <div className="option">
              <span>A</span>
              Web styling
            </div>

            <div className="option">
              <span>B</span>
              Database management
            </div>

            <div className="option selected">
              <span>C</span>
              Application development
            </div>

            <div className="option">
              <span>D</span>
              Image editing
            </div>
          </div>

          <div className="quiz-footer">
            <span>Question 4 of 10</span>
            <button>Next →</button>
          </div>
        </div>

        <div className="rank-card">
          <div className="rank-icon">🏆</div>

          <div>
            <small>Your Rank</small>
            <strong>#04</strong>
          </div>
        </div>

        <div className="score-card">
          <div className="score-icon">⚡</div>

          <div>
            <small>Current Score</small>
            <strong>840 pts</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero