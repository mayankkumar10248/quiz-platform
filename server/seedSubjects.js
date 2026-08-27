require("dotenv").config();

const mongoose = require("mongoose");
const Subject = require("./models/Subject");

const subjects = [
  {
    name: "Java",
    description: "Test your Java programming knowledge",
    icon: "☕",
  },
  {
    name: "Python",
    description: "Test your Python programming knowledge",
    icon: "🐍",
  },
  {
    name: "DBMS",
    description: "Test your database knowledge",
    icon: "🗄️",
  },
];

async function seedSubjects() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const subjectData of subjects) {
      const existingSubject = await Subject.findOne({
        name: subjectData.name,
      });

      if (existingSubject) {
        console.log(`Subject already exists: ${subjectData.name}`);
        continue;
      }

      await Subject.create(subjectData);

      console.log(`Created subject: ${subjectData.name}`);
    }

    console.log("Subject seeding completed");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seedSubjects();