const express = require("express");

const {
  getSubjects,
  createSubject,
} = require("../controllers/subjectController");

const router = express.Router();

// GET all subjects
router.get("/", getSubjects);

// POST create subject
router.post("/", createSubject);

module.exports = router;