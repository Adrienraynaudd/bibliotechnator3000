// routes/example.js

import express from "express";
const router = express.Router();

import {
  createExample,
  getExample,
  updateExample,
  deleteExample,
} from "../controllers/example.js";

// this route create a new note
router.post("/", createExample);
// this route get all the notes by the user id
router.get("/user/:userId", getExample);
// this route update one note by the note id
router.put("/:id", updateExample);
// this route remote one note by the note id
router.delete("/:id", deleteExample);

export default router;
