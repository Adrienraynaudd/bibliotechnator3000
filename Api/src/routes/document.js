const express = require("express");
const router = express.Router();

const { createDocument, deleteDocument, getDocument, getAllDocument, updateDocument } = require('../controllers/document.js');


router.post("/", createDocument);

router.get("/", getAllDocument);

router.get("/:id", getDocument);

router.put("/:id", updateDocument);

router.delete("/:id", deleteDocument);
module.exports = router;
