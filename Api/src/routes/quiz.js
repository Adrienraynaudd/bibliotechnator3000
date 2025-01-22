// routes/example.js

import express from "express";
const router = express.Router();

import {
  createExample,
  getExample,
  updateExample,
  deleteExample,
} from "../controllers/example.js";

// this route get all the quizzes
router.get("/", getExample);
// this route get a quiz by id
router.get("/:id", getExampleById);
// this route get all the quizzes for a document by id
// router.get("/document/:id/quiz", getExample); A METTRE DANS LES ROUTES DE DOCUMENTS
// this route create a new quiz
router.post("/", createExample);
// this route update a quiz by id
router.put("/:id", updateExample);
// this route remove a quiz by id
router.delete("/:id", deleteExample);

export default router;
