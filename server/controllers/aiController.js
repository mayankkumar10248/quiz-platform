 const Groq = require("groq-sdk");
const Quiz = require("../models/Quiz");
const Subject = require("../models/Subject");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateQuiz = async (req, res) => {
  try {
    const {
      subjectId,
      topic,
      difficulty = "Medium",
      numberOfQuestions = 5,
    } = req.body;

    if (!subjectId || !topic) {
      return res.status(400).json({
        success: false,
        message: "Subject and topic are required",
      });
    }

    const questionCount = Math.min(
      Math.max(Number(numberOfQuestions) || 5, 1),
      20
    );

    // Find subject
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    console.log(
      `Generating ${questionCount} ${difficulty} questions for ${subject.name} - ${topic}`
    );

    // Ask Groq AI
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content:
            "You are an expert educational quiz generator. Generate accurate multiple-choice questions for students.",
        },
        {
          role: "user",
          content: `
Create a ${difficulty} difficulty quiz.

Subject: ${subject.name}
Topic: ${topic}

Generate exactly ${questionCount} multiple-choice questions.

Rules:
- Every question must have exactly 4 options.
- Only one option must be correct.
- correctAnswer must exactly match one of the four options.
- Questions must be factually accurate.
- Do not repeat questions.
- Keep questions clear and suitable for students.
          `,
        },
      ],

      response_format: {
        type: "json_schema",
        json_schema: {
          name: "quiz_questions",
          strict: true,

          schema: {
            type: "object",

            properties: {
              questions: {
                type: "array",

                items: {
                  type: "object",

                  properties: {
                    question: {
                      type: "string",
                    },

                    options: {
                      type: "array",

                      items: {
                        type: "string",
                      },

                      minItems: 4,
                      maxItems: 4,
                    },

                    correctAnswer: {
                      type: "string",
                    },
                  },

                  required: [
                    "question",
                    "options",
                    "correctAnswer",
                  ],

                  additionalProperties: false,
                },
              },
            },

            required: ["questions"],
            additionalProperties: false,
          },
        },
      },
    });

    // Get AI response
    const content =
      completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response");
    }

    const aiData = JSON.parse(content);

    const questions = aiData.questions;

    // Validate AI result
    if (
      !Array.isArray(questions) ||
      questions.length !== questionCount
    ) {
      throw new Error(
        "AI returned an invalid number of questions"
      );
    }

    // Save quiz to MongoDB
    const quiz = await Quiz.create({
      title: `${topic} Quiz`,
      subject: subjectId,
      questions,
      difficulty,
      createdBy: "AI",
    });

    console.log("AI quiz saved to MongoDB");

    // Return quiz
    res.status(201).json({
      success: true,
      message: "Quiz generated successfully",
      quiz,
    });
  } catch (error) {
    console.error("AI generation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate quiz",
      error: error.message,
    });
  }
};

module.exports = {
  generateQuiz,
};