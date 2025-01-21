// routes/example.js

import express from "express";
const router = express.Router();

import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/User.js";

// this route create a new note
router.post("/", createUser);
// this route get all the notes by the user id
router.get("/user/:userId", getUser);
// this route update one note by the note id
router.put("/:id", updateUser);
// this route remote one note by the note id
router.delete("/:id", deleteUser);

export default router;
