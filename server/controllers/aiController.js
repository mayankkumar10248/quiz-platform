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

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: `You are an expert educational quiz generator.

You MUST return ONLY valid JSON.
Do not include markdown.
Do not include explanations outside the JSON.
Do not use code fences.

The JSON must have exactly this structure:

{
  "questions": [
    {
      "question": "question text",
      "options": [
        "option 1",
        "option 2",
        "option 3",
        "option 4"
      ],
      "correctAnswer": "one of the four options"
    }
  ]
}`,
        },

        {
          role: "user",
          content: `Create a ${difficulty} difficulty quiz.

Subject: ${subject.name}
Topic: ${topic}

Generate exactly ${questionCount} questions.

Rules:
- Generate exactly ${questionCount} questions.
- Every question must have exactly 4 options.
- Only one option must be correct.
- correctAnswer must exactly match one of the four options.
- Questions must be factually accurate.
- Do not repeat questions.
- Keep questions clear and suitable for students.

Return ONLY valid JSON.`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response");
    }

    console.log("RAW GROQ RESPONSE:");
    console.log(content);

    let aiData;

    try {
      aiData = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON PARSE ERROR:", parseError);
      throw new Error("Groq returned invalid JSON");
    }

    const questions = aiData.questions;

    if (
      !Array.isArray(questions) ||
      questions.length !== questionCount
    ) {
      throw new Error(
        `AI returned ${questions?.length || 0} questions instead of ${questionCount}`
      );
    }

    for (const question of questions) {
      if (
        !question.question ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 ||
        !question.correctAnswer
      ) {
        throw new Error("AI returned an invalid question format");
      }

      if (!question.options.includes(question.correctAnswer)) {
        throw new Error(
          "correctAnswer does not match any option"
        );
      }
    }

    const quiz = await Quiz.create({
      title: `${topic} Quiz`,
      subject: subjectId,
      questions,
      difficulty,
      createdBy: "AI",
    });

    console.log("AI quiz saved to MongoDB");

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