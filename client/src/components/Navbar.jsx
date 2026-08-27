function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">Q</span>
        <span>QuizMaster AI</span>
      </div>

      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#quizzes">Quizzes</a>
        <a href="#leaderboard">Leaderboard</a>
        <a href="#pdf-quiz">PDF Quiz</a>
      </div>

      <div className="navbar-actions">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Get Started</button>
      </div>
    </nav>
  )
}

export default Navbar