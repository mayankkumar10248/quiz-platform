require("dotenv").config();

const mongoose = require("mongoose");
const Subject = require("./models/Subject");
const Quiz = require("./models/Quiz");

const quizzes = [
  {
    subjectName: "Java",
    title: "Java Fundamentals",
    difficulty: "Easy",
    questions: [
      {
        question: "Which keyword is used to create a class in Java?",
        options: ["class", "object", "create", "new"],
        correctAnswer: "class",
      },
      {
        question: "Which method is the entry point of a Java program?",
        options: ["start()", "main()", "run()", "execute()"],
        correctAnswer: "main()",
      },
      {
        question: "Which keyword is used to create an object in Java?",
        options: ["class", "object", "new", "create"],
        correctAnswer: "new",
      },
      {
        question: "Which data type is used to store true or false?",
        options: ["int", "boolean", "String", "float"],
        correctAnswer: "boolean",
      },
      {
        question: "Which symbol is used to end a statement in Java?",
        options: [".", ",", ";", ":"],
        correctAnswer: ";",
      },
    ],
  },

  {
    subjectName: "Python",
    title: "Python Fundamentals",
    difficulty: "Easy",
    questions: [
      {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "fun", "define"],
        correctAnswer: "def",
      },
      {
        question: "Which symbol is used for comments in Python?",
        options: ["//", "/*", "#", "<!--"],
        correctAnswer: "#",
      },
      {
        question: "Which function is used to display output in Python?",
        options: ["echo()", "print()", "display()", "output()"],
        correctAnswer: "print()",
      },
      {
        question: "Which type is used to store a sequence of characters?",
        options: ["int", "float", "str", "bool"],
        correctAnswer: "str",
      },
      {
        question: "Which keyword is used for a loop over a sequence?",
        options: ["loop", "repeat", "for", "iterate"],
        correctAnswer: "for",
      },
    ],
  },

  {
    subjectName: "DBMS",
    title: "DBMS Fundamentals",
    difficulty: "Easy",
    questions: [
      {
        question: "What does DBMS stand for?",
        options: [
          "Database Management System",
          "Data Backup Management System",
          "Database Memory System",
          "Data Management Software",
        ],
        correctAnswer: "Database Management System",
      },
      {
        question: "Which language is commonly used to query relational databases?",
        options: ["HTML", "SQL", "CSS", "XML"],
        correctAnswer: "SQL",
      },
      {
        question: "Which key uniquely identifies a record?",
        options: ["Foreign Key", "Primary Key", "Candidate Key", "Super Key"],
        correctAnswer: "Primary Key",
      },
      {
        question: "Which command is used to retrieve data from a database?",
        options: ["GET", "FETCH", "SELECT", "READ"],
        correctAnswer: "SELECT",
      },
      {
        question: "Which command is used to add new data?",
        options: ["ADD", "INSERT", "CREATE", "UPDATE"],
        correctAnswer: "INSERT",
      },
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const quizData of quizzes) {
      const subject = await Subject.findOne({
        name: quizData.subjectName,
      });

      if (!subject) {
        console.log(
          `Subject not found: ${quizData.subjectName}`
        );
        continue;
      }

      const existingQuiz = await Quiz.findOne({
        title: quizData.title,
        subject: subject._id,
      });

      if (existingQuiz) {
        console.log(
          `Quiz already exists: ${quizData.title}`
        );
        continue;
      }

      await Quiz.create({
        title: quizData.title,
        subject: subject._id,
        questions: quizData.questions,
        difficulty: quizData.difficulty,
        createdBy: "system",
      });

      console.log(
        `Created quiz: ${quizData.title}`
      );
    }

    console.log("Quiz seeding completed");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seedDatabase();