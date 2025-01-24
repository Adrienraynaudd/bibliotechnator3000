// routes/example.js

import express from "express";
const router = express.Router();

import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getQuizzesByDocumentId, // Import the new function
} from "../controllers/quiz.js";

// this route get all the quizzes
router.get("/", getQuizzes);
// this route get a quiz by id
router.get("/:id", getQuizById);
// this route get all the quizzes for a document by id
// router.get("/document/:id/quiz", getQuizzesByDocumentId); A METTRE DANS LES ROUTES DE DOCUMENTS
// this route create a new quiz
router.post("/", createQuiz);
// this route update a quiz by id
router.put("/:id", updateQuiz);
// this route remove a quiz by id
router.delete("/:id", deleteQuiz);

export default router;
