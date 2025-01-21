// routes/example.js

import express from "express";
const router = express.Router();

import {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/document.js";

// this route create a new note
router.post("/", createDocument);
// this route get all the notes by the user id
router.get("/document/:userId", getDocument);
// this route update one note by the note id
router.put("/:id", updateDocument);
// this route remote one note by the note id
router.delete("/:id", deleteDocument);

export default router;
