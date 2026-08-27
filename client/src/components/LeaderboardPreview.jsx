function LeaderboardPreview() {
  const students = [
    {
      rank: 1,
      name: "Aarav Sharma",
      score: "980",
      quizzes: 42,
      change: "↑ 2",
    },
    {
      rank: 2,
      name: "Priya Verma",
      score: "945",
      quizzes: 38,
      change: "↑ 1",
    },
    {
      rank: 3,
      name: "Rohan Gupta",
      score: "920",
      quizzes: 35,
      change: "—",
    },
    {
      rank: 4,
      name: "You",
      score: "895",
      quizzes: 31,
      change: "↑ 3",
    },
    {
      rank: 5,
      name: "Ananya Singh",
      score: "870",
      quizzes: 29,
      change: "↓ 1",
    },
  ]

  return (
    <section className="leaderboard-section" id="leaderboard">
      <div className="leaderboard-heading">
        <div>
          <span>THE COMPETITION</span>
          <h2>See where you stand.</h2>
        </div>

        <p>
          Every quiz counts. Improve your score, move up the
          rankings and challenge your friends.
        </p>
      </div>

      <div className="leaderboard-wrapper">
        <div className="leaderboard-header">
          <div>
            <span>GLOBAL RANKING</span>
            <h3>Weekly Champions</h3>
          </div>

          <button>This Week⌄</button>
        </div>

        <div className="leaderboard-list">
          {students.map((student) => (
            <div
              className={`leaderboard-row ${
                student.name === "You" ? "current-user" : ""
              }`}
              key={student.rank}
            >
              <div className="rank">
                #{student.rank}
              </div>

              <div className="student-info">
                <div className="student-avatar">
                  {student.name.charAt(0)}
                </div>

                <div>
                  <strong>{student.name}</strong>
                  <small>{student.quizzes} quizzes completed</small>
                </div>
              </div>

              <div className="score">
                <strong>{student.score}</strong>
                <small>points</small>
              </div>

              <div className="movement">
                {student.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LeaderboardPreview