const express = require("express");
const router = express.Router();

const { createDocument, deleteDocument, getDocument, getAllDocument, updateDocument } = require('../controllers/document.js');
const { getQuizzesByDocumentId } = require("../controllers/quiz.js");


router.post("/", createDocument);

router.get("/", getAllDocument);

router.get("/:id", getDocument);

router.put("/:id", updateDocument);

router.delete("/:id", deleteDocument);

// this route get all the quizzes for a document by id
router.get("/:id/quiz", getQuizzesByDocumentId);

module.exports = router;
