const express = require("express");

const {
  generateQuiz,
} = require("../controllers/aiController");

const router = express.Router();

// Generate quiz using AI
router.post("/generate", generateQuiz);

module.exports = router;