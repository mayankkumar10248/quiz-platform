function Features() {
  return (
    <section className="features-section">

      <div className="section-heading">
        <span>WHY QUIZMASTER?</span>

        <h2>
          Everything you need to
          <br />
          <strong>learn and compete.</strong>
        </h2>

        <p>
          Practice smarter, challenge yourself and see how you
          compare with other students.
        </p>
      </div>

      <div className="features-grid">

        <div className="feature-card feature-large">
          <div className="feature-number">01</div>

          <div className="feature-icon">🧠</div>

          <h3>Smart Quizzes</h3>

          <p>
            Choose from different subjects and difficulty levels
            and test your knowledge with interactive quizzes.
          </p>

          <div className="feature-link">
            Explore quizzes →
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-number">02</div>

          <div className="feature-icon blue">📄</div>

          <h3>PDF → Quiz</h3>

          <p>
            Upload your study material and let AI create
            questions from it.
          </p>

          <div className="feature-link">
            Generate quiz →
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-number">03</div>

          <div className="feature-icon orange">🏆</div>

          <h3>Compete</h3>

          <p>
            Earn points, improve your rank and compete with
            students worldwide.
          </p>

          <div className="feature-link">
            View leaderboard →
          </div>
        </div>

        <div className="feature-card feature-wide">
          <div>
            <div className="feature-number">04</div>

            <div className="feature-icon green">📊</div>

            <h3>Track Your Progress</h3>

            <p>
              See your scores, accuracy and quiz history in
              one place.
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
  )
}

export default Features