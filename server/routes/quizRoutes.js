const express = require("express");

const {
  getQuizzes,
  getQuizById,
  getQuizzesBySubject,
  createQuiz,
  submitQuiz,
} = require("../controllers/quizController");

const router = express.Router();

// Get all quizzes
router.get("/", getQuizzes);

// Get quizzes by subject
router.get("/subject/:subjectId", getQuizzesBySubject);

// Get one quiz
router.get("/:id", getQuizById);

// Create quiz
router.post("/", createQuiz);

// Submit quiz
router.post("/:id/submit", submitQuiz);

module.exports = router;