 require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const testRoutes = require("./routes/testRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const quizRoutes = require("./routes/quizRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/test", testRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/quizzes", quizRoutes);

// MongoDB Atlas connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
    });

// Test route
app.get("/", (req, res) => {
    res.send("Quiz Platform Backend is Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});