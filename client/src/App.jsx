 import { useEffect, useState } from "react";
import "./index.css";

const API_URL = "https://quiz-platform-api-c5qf.onrender.com/api/subjects";
const AI_API_URL = "http://localhost:5000/api/ai/generate";
const SUBMIT_API_URL = "http://localhost:5000/api/quizzes";

function App() {
  // =========================
  // SUBJECTS
  // =========================

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // AI QUIZ
  // =========================

  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [topic, setTopic] = useState("Java Basics");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  // =========================
  // QUIZ ANSWERS
  // =========================

  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  // =========================
  // FETCH SUBJECTS
  // =========================

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }

      const data = await response.json();

      if (data.success) {
        setSubjects(data.subjects);

        // Select first subject automatically
        if (data.subjects.length > 0) {
          setSelectedSubject(data.subjects[0]._id);
        }
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

  // =========================
  // GENERATE AI QUIZ
  // =========================

  const generateAIQuiz = async () => {
    try {
      if (!selectedSubject) {
        alert("Please select a subject.");
        return;
      }

      if (!topic.trim()) {
        alert("Please enter a topic.");
        return;
      }

      setGeneratingQuiz(true);
      setGeneratedQuiz(null);
      setQuizResult(null);
      setAnswers({});

      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectId: selectedSubject,
          topic: topic.trim(),
          difficulty,
          numberOfQuestions: Number(numberOfQuestions),
        }),
      });

      const data = await response.json();

      console.log("AI QUIZ RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to generate quiz");
      }

      setGeneratedQuiz(data.quiz);

      alert("AI quiz generated successfully!");

      // Scroll to generated quiz
      setTimeout(() => {
        document
          .getElementById("ai-quiz")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);
    } catch (err) {
      console.error("AI quiz error:", err);
      alert(err.message || "Unable to generate AI quiz.");
    } finally {
      setGeneratingQuiz(false);
    }
  };

  // =========================
  // SELECT ANSWER
  // =========================

  const selectAnswer = (questionIndex, answer) => {
    // Don't allow changing answers after submission
    if (quizResult) {
      return;
    }

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionIndex]: answer,
    }));
  };

  // =========================
  // SUBMIT QUIZ
  // =========================

  const submitQuiz = async () => {
    if (!generatedQuiz) {
      return;
    }

    // Check if every question has an answer
    const unansweredQuestions = generatedQuiz.questions.filter(
      (_, index) => !answers[index]
    );

    if (unansweredQuestions.length > 0) {
      alert(
        `Please answer all questions. ${unansweredQuestions.length} question(s) remaining.`
      );
      return;
    }

    try {
      setSubmittingQuiz(true);

      const response = await fetch(
        `${SUBMIT_API_URL}/${generatedQuiz._id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers,
          }),
        }
      );

      const data = await response.json();

      console.log("QUIZ RESULT:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit quiz");
      }

      setQuizResult(data);

      setTimeout(() => {
        document
          .getElementById("quiz-result")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);
    } catch (err) {
      console.error("Submit quiz error:", err);
      alert(err.message || "Unable to submit quiz.");
    } finally {
      setSubmittingQuiz(false);
    }
  };

  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {
    fetchSubjects();
  }, []);

  // =========================
  // SCROLL FUNCTIONS
  // =========================

  const scrollToSubjects = () => {
    document
      .getElementById("subjects")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const scrollToLeaderboard = () => {
    document
      .getElementById("leaderboard")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // =========================
  // RETURN
  // =========================

  return (
    <div>

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar">

        <div className="navbar-logo">
          <div className="logo-icon">
            Q
          </div>

          QuizMaster
        </div>

        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#subjects">Subjects</a>
          <a href="#leaderboard">Leaderboard</a>
        </div>

        <div className="navbar-actions">

          <button className="login-btn">
            Login
          </button>

          <button className="signup-btn">
            Get Started
          </button>

        </div>

      </nav>

      {/* =========================
          HERO
      ========================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-left">

          <div className="hero-tag">
            <span>✦</span>
            SMART QUIZ PLATFORM
          </div>

          <h1>
            Learn More.
            <br />
            <span>
              Challenge Yourself.
            </span>
          </h1>

          <p>
            Test your knowledge, compete with
            other students, and track your
            progress across multiple subjects.
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

            <span>
              ✓ Multiple Subjects
            </span>

            <span>
              ✓ Instant Results
            </span>

            <span>
              ✓ Student Rankings
            </span>

          </div>

        </div>

        {/* QUIZ PREVIEW */}

        <div className="hero-right">

          <div className="quiz-window">

            <div className="quiz-header">

              <div>
                <small>
                  JAVA • BEGINNER
                </small>

                <strong>
                  Java Fundamentals
                </strong>
              </div>

              <div className="question-count">
                04 / 10
              </div>

            </div>

            <div className="progress">
              <div className="progress-value"></div>
            </div>

            <h2>
              Which keyword is used to
              create a class in Java?
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

          <div className="score-card">

            <div className="score-icon">
              🏆
            </div>

            <div>
              <small>
                BEST SCORE
              </small>

              <strong>
                92%
              </strong>
            </div>

          </div>

          <div className="rank-card">

            <div className="rank-icon">
              ↗
            </div>

            <div>
              <small>
                YOUR RANK
              </small>

              <strong>
                #08
              </strong>
            </div>

          </div>

        </div>

      </section>

      {/* =========================
          AI QUIZ GENERATOR
      ========================= */}

      <section
        className="ai-generator-section"
        style={{
          padding: "70px 8%",
          background: "#ffffff",
        }}
      >

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >

          <span
            style={{
              color: "#6c4df6",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            🤖 AI QUIZ GENERATOR
          </span>

          <h2
            style={{
              fontSize: "42px",
              margin: "12px 0",
            }}
          >
            Create a quiz with AI.
          </h2>

          <p
            style={{
              color: "#666",
              marginBottom: "35px",
            }}
          >
            Choose a subject, enter a topic,
            and let AI create your quiz.
          </p>

          {/* Generator Form */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              textAlign: "left",
            }}
          >

            {/* Subject */}

            <div>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                Subject
              </label>

              <select
                value={selectedSubject}
                onChange={(e) =>
                  setSelectedSubject(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "15px",
                }}
              >

                <option value="">
                  Select subject
                </option>

                {subjects.map((subject) => (
                  <option
                    key={subject._id}
                    value={subject._id}
                  >
                    {subject.name}
                  </option>
                ))}

              </select>

            </div>

            {/* Topic */}

            <div>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                Topic
              </label>

              <input
                type="text"
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
                placeholder="Example: Java Basics"
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />

            </div>

            {/* Difficulty */}

            <div>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "15px",
                }}
              >

                <option value="Easy">
                  Easy
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Hard">
                  Hard
                </option>

              </select>

            </div>

            {/* Number of questions */}

            <div>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                Questions
              </label>

              <select
                value={numberOfQuestions}
                onChange={(e) =>
                  setNumberOfQuestions(
                    Number(e.target.value)
                  )
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  fontSize: "15px",
                }}
              >

                <option value={5}>
                  5 Questions
                </option>

                <option value={10}>
                  10 Questions
                </option>

                <option value={15}>
                  15 Questions
                </option>

                <option value={20}>
                  20 Questions
                </option>

              </select>

            </div>

          </div>

          {/* Generate Button */}

          <button
            onClick={generateAIQuiz}
            disabled={
              generatingQuiz ||
              loading ||
              subjects.length === 0
            }
            style={{
              marginTop: "25px",
              padding: "15px 35px",
              borderRadius: "10px",
              border: "none",
              background: "#6c4df6",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor:
                generatingQuiz
                  ? "not-allowed"
                  : "pointer",
            }}
          >

            {generatingQuiz
              ? "🤖 Generating Quiz..."
              : "🤖 Generate AI Quiz"}

          </button>

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

          <span>
            WHY QUIZMASTER
          </span>

          <h2>
            Everything you need to
            <strong> improve.</strong>
          </h2>

          <p>
            Practice regularly, understand
            your performance and compete with
            students through one simple platform.
          </p>

        </div>

        <div className="features-grid">

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
              Get your score immediately after
              completing a quiz and see where
              you can improve.
            </p>

            <div className="feature-link">
              View performance →
            </div>

          </div>

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
              operating systems and many other
              subjects.
            </p>

            <div className="feature-link">
              Explore subjects →
            </div>

          </div>

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
              Monitor your scores and understand
              how your performance changes over time.
            </p>

            <div className="feature-link">
              Track progress →
            </div>

          </div>

          <div className="feature-card feature-wide">

            <div>

              <div className="feature-icon green">
                🏆
              </div>

              <h3>
                Compete on the Leaderboard
              </h3>

              <p>
                Compare your results with other
                students and work your way toward
                the top.
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
            Select a subject and start
            testing your knowledge.
          </p>

        </div>

        {loading && (
          <div className="subject-status">
            Loading subjects...
          </div>
        )}

        {!loading && error && (

          <div className="subject-status">

            <p>
              {error}
            </p>

            <button
              onClick={fetchSubjects}
              className="retry-button"
            >
              Try Again
            </button>

          </div>

        )}

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
                  onClick={() => {
                    setSelectedSubject(subject._id);

                    document
                      .querySelector(
                        ".ai-generator-section"
                      )
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                />

              ))}

            </div>

          )}

      </section>

      {/* =========================
          GENERATED AI QUIZ
      ========================= */}

      {generatedQuiz && (

        <section
          className="ai-quiz-section"
          id="ai-quiz"
          style={{
            padding: "80px 8%",
            background: "#f8f7ff",
          }}
        >

          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >

            <span
              style={{
                color: "#6c4df6",
                fontWeight: "700",
                letterSpacing: "2px",
              }}
            >
              🤖 AI GENERATED QUIZ
            </span>

            <h2
              style={{
                fontSize: "42px",
                margin: "10px 0",
              }}
            >
              {generatedQuiz.title}
            </h2>

            <p>
              Difficulty:{" "}
              <strong>
                {generatedQuiz.difficulty}
              </strong>
            </p>

            {/* QUESTIONS */}

            <div
              style={{
                marginTop: "40px",
              }}
            >

              {generatedQuiz.questions.map(
                (question, index) => {

                  const selectedAnswer =
                    answers[index];

                  return (

                    <div
                      className="ai-question"
                      key={
                        question._id || index
                      }
                      style={{
                        background: "white",
                        padding: "25px",
                        marginBottom: "20px",
                        borderRadius: "15px",
                        border:
                          "1px solid #e5e2f5",
                      }}
                    >

                      <h3>
                        {index + 1}.{" "}
                        {question.question}
                      </h3>

                      <div
                        className="ai-options"
                        style={{
                          display: "grid",
                          gap: "12px",
                          marginTop: "20px",
                        }}
                      >

                        {question.options.map(
                          (
                            option,
                            optionIndex
                          ) => {

                            const isSelected =
                              selectedAnswer ===
                              option;

                            const isCorrect =
                              quizResult &&
                              option ===
                                question.correctAnswer;

                            const isWrong =
                              quizResult &&
                              isSelected &&
                              option !==
                                question.correctAnswer;

                            return (

                              <button
                                key={optionIndex}
                                onClick={() =>
                                  selectAnswer(
                                    index,
                                    option
                                  )
                                }
                                disabled={
                                  !!quizResult
                                }
                                style={{
                                  padding: "14px",
                                  textAlign: "left",

                                  background:
                                    isCorrect
                                      ? "#dcfce7"
                                      : isWrong
                                      ? "#fee2e2"
                                      : isSelected
                                      ? "#eee9ff"
                                      : "#faf9ff",

                                  border:
                                    isCorrect
                                      ? "2px solid #22c55e"
                                      : isWrong
                                      ? "2px solid #ef4444"
                                      : isSelected
                                      ? "2px solid #6c4df6"
                                      : "1px solid #ddd8f5",

                                  borderRadius:
                                    "10px",

                                  cursor:
                                    quizResult
                                      ? "default"
                                      : "pointer",

                                  fontSize: "15px",
                                }}
                              >

                                <strong>
                                  {String.fromCharCode(
                                    65 +
                                      optionIndex
                                  )}
                                  .
                                </strong>{" "}

                                {option}

                              </button>

                            );
                          }
                        )}

                      </div>

                      {/* Show correct answer after submit */}

                      {quizResult && (

                        <p
                          style={{
                            marginTop: "15px",
                            fontWeight: "600",
                          }}
                        >
                          Correct answer:{" "}
                          {question.correctAnswer}
                        </p>

                      )}

                    </div>

                  );
                }
              )}

            </div>

            {/* SUBMIT BUTTON */}

            {!quizResult && (

              <div
                style={{
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >

                <button
                  onClick={submitQuiz}
                  disabled={submittingQuiz}
                  style={{
                    padding: "15px 40px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#6c4df6",
                    color: "white",
                    fontSize: "17px",
                    fontWeight: "700",
                    cursor:
                      submittingQuiz
                        ? "not-allowed"
                        : "pointer",
                  }}
                >

                  {submittingQuiz
                    ? "Submitting..."
                    : "Submit Quiz"}

                </button>

              </div>

            )}

            {/* =========================
                QUIZ RESULT
            ========================= */}

            {quizResult && (

              <div
                id="quiz-result"
                style={{
                  marginTop: "40px",
                  padding: "35px",
                  background: "white",
                  borderRadius: "20px",
                  textAlign: "center",
                  border:
                    "1px solid #e5e2f5",
                }}
              >

                <div
                  style={{
                    fontSize: "50px",
                  }}
                >
                  🏆
                </div>

                <h2>
                  Quiz Complete!
                </h2>

                <h1
                  style={{
                    fontSize: "55px",
                    color: "#6c4df6",
                    margin: "10px",
                  }}
                >
                  {quizResult.percentage}%
                </h1>

                <p
                  style={{
                    fontSize: "18px",
                  }}
                >
                  You scored{" "}
                  <strong>
                    {quizResult.score}
                  </strong>{" "}
                  out of{" "}
                  <strong>
                    {quizResult.total}
                  </strong>
                </p>

                <p>
                  {quizResult.message}
                </p>

                <button
                  onClick={() => {
                    setGeneratedQuiz(null);
                    setAnswers({});
                    setQuizResult(null);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  style={{
                    marginTop: "15px",
                    padding: "13px 28px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#6c4df6",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Generate Another Quiz
                </button>

              </div>

            )}

          </div>

        </section>

      )}

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
            Keep practicing and climb your
            way to the top.
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


// =====================================
// SUBJECT CARD
// =====================================

function SubjectCard({
  icon,
  name,
  description,
  onClick,
}) {

  return (

    <div
      className="subject-card"
      onClick={onClick}
      style={{
        cursor: "pointer",
      }}
    >

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


// =====================================
// LEADERBOARD ROW
// =====================================

function LeaderboardRow({
  rank,
  name,
  score,
  movement,
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