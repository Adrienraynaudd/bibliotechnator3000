// routes/example.js
const { authenticateToken } = require("../middleware/auth.js");

const express = require("express")
const router = express.Router();

const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/user.js")

// this route create a new user
router.post("/register", createUser);
router.post("/login", loginUser);
// this route get all users
router.get("/", getAllUsers);
// this route get the user by id
router.get("/:id", getUser);
// this route update one user by id
router.put("/:id", [authenticateToken], updateUser);
// this route remove a user by id
router.delete("/:id", [authenticateToken], deleteUser);

module.exports = router;

