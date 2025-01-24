// routes/example.js

const express = require("express");
const router = express.Router();

const { getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } = require("../controllers/quiz.js");

// this route get all the quizzes
router.get("/", getQuizzes);
// this route get a quiz by id
router.get("/:id", getQuizById);
// this route create a new quiz
router.post("/", createQuiz);
// this route update a quiz by id
router.put("/:id", updateQuiz);
// this route remove a quiz by id
router.delete("/:id", deleteQuiz);

module.exports = router;
