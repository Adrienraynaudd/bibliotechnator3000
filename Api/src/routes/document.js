import express from "express";
const router = express.Router();

import {
  createDocument,
  getAllDocument,
  getDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/document.js";

router.post("/", createDocument);

router.get("/", getAllDocument);

router.get("/:id", getDocument);

router.put("/:id", updateDocument);

router.delete("/:id", deleteDocument);

export default router;
