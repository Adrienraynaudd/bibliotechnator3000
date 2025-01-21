// routes/example.js

import express from "express";
const router = express.Router();

import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

// this route create a new user
router.post("/", createUser);
// this route get all users
router.get("/", getAllUsers);
// this route get the user by id
router.get("/:id", getUser);
// this route update one user by id
router.put("/:id", updateUser);
// this route remove a user by id
router.delete("/:id", deleteUser);

export default router;
