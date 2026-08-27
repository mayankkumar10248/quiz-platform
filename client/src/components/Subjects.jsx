function Subjects() {
  const subjects = [
    {
      name: "Java",
      icon: "☕",
      questions: "120+ Questions",
      level: "Beginner → Advanced",
    },
    {
      name: "JavaScript",
      icon: "JS",
      questions: "150+ Questions",
      level: "Beginner → Advanced",
    },
    {
      name: "Python",
      icon: "🐍",
      questions: "130+ Questions",
      level: "Beginner → Advanced",
    },
    {
      name: "Data Structures",
      icon: "◈",
      questions: "100+ Questions",
      level: "Intermediate",
    },
    {
      name: "DBMS",
      icon: "▣",
      questions: "90+ Questions",
      level: "Beginner → Advanced",
    },
    {
      name: "Computer Networks",
      icon: "⌘",
      questions: "80+ Questions",
      level: "Intermediate",
    },
  ]

  return (
    <section className="subjects-section" id="quizzes">
      <div className="subjects-heading">
        <div>
          <span>EXPLORE & PRACTICE</span>
          <h2>Pick your battlefield.</h2>
        </div>

        <p>
          Choose a subject, test your knowledge and climb the
          leaderboard.
        </p>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject) => (
          <div className="subject-card" key={subject.name}>
            <div className="subject-top">
              <div className="subject-icon">
                {subject.icon}
              </div>

              <span className="subject-arrow">↗</span>
            </div>

            <h3>{subject.name}</h3>

            <p>{subject.questions}</p>

            <div className="subject-bottom">
              <span>{subject.level}</span>
              <span>Start →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Subjects