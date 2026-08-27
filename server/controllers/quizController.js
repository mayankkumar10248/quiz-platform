const Quiz = require("../models/Quiz");

// Get all quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("subject", "name icon")
      .select("-questions.correctAnswer");

    res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes",
      error: error.message,
    });
  }
};

// Get one quiz by ID
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("subject", "name icon");

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    // Don't send correct answers before the quiz is submitted
    const safeQuiz = quiz.toObject();

    safeQuiz.questions = safeQuiz.questions.map((question) => {
      delete question.correctAnswer;
      return question;
    });

    res.status(200).json({
      success: true,
      quiz: safeQuiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz",
      error: error.message,
    });
  }
};

// Get quizzes for a particular subject
const getQuizzesBySubject = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      subject: req.params.subjectId,
    })
      .populate("subject", "name icon")
      .select("-questions.correctAnswer");

    res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subject quizzes",
      error: error.message,
    });
  }
};

// Create a quiz
const createQuiz = async (req, res) => {
  try {
    const {
      title,
      subject,
      questions,
      difficulty,
      createdBy,
    } = req.body;

    if (!title || !subject || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Title, subject and questions are required",
      });
    }

    const quiz = await Quiz.create({
      title,
      subject,
      questions,
      difficulty,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create quiz",
      error: error.message,
    });
  }
};

// Submit quiz and calculate score
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const total = quiz.questions.length;

    const percentage =
      total > 0 ? Math.round((score / total) * 100) : 0;

    res.status(200).json({
      success: true,
      score,
      total,
      percentage,
      message: "Quiz submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit quiz",
      error: error.message,
    });
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  getQuizzesBySubject,
  createQuiz,
  submitQuiz,
};