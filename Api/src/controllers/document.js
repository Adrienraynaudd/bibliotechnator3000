import pg from "pg";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
    }
  },
});

export const createDocument = async (request, response) => {
  const uploadFile = upload.single("documentFile");
  uploadFile(request, response, async (err) => {
    if (err) {
      return response.status(400).send("Error uploading file: " + err.message);
    }

    const { title, author, libraryId, category, createdBy } = request.body;
    const documentLink = request.file ? request.file.filename : null;

    try {
      await pool.query(
        `INSERT INTO document (title, author, libraryId, category, documentLink, createdBy) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, author, libraryId, category, documentLink, createdBy]
      );

      response.status(201).send("Document created with file");
    } catch (e) {
      response.status(500).send("Error: " + e.toString());
    }
  });
};


export const deleteDocument = async (request, response) => {
  const documentId = request.params.id;

  try {
    const { rows } = await pool.query(`SELECT documentLink FROM document WHERE id = $1`, [documentId]);
    if (rows.length === 0) {
      return response.status(404).send("Document not found");
    }

    const documentLink = rows[0].documentLink;
    const filePath = path.join("uploads", documentLink);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await pool.query(`DELETE FROM document WHERE id = $1`, [documentId]);

    response.status(200).send("Successfully deleted document and file");
  } catch (e) {
    response.status(500).send("Error: " + e.toString());
  }
};


export const getDocument = async (request, response) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM document WHERE id = $1`,
      [request.params.id]
    );

    if (rows.length === 0) {
      return response.status(404).send("Document not found");
    }

    response.status(200).json(rows[0]);
  } catch (e) {
    response.status(500).send("Error: " + e.toString());
  }
};


export const getAllDocument = async (request, response) => {
  try {
    const { rows } = await pool.query(
      `SELECT document.*, library.name as library_name, user.name as created_by_name 
       FROM document`
    );
    response.status(200).json(rows);
  } catch (e) {
    response.status(500).send("Error: " + e.toString());
  }
};

export const updateDocument = async (request, response) => {
  try {
    const { title, author, libraryId, category, createdBy } = request.body;
    const param_id = request.params.id;

    await pool.query(
      `UPDATE document SET title = $1, author = $2, libraryId = $3, category = $4, createdBy = $5
       WHERE id = $6`,
      [title, author, libraryId, category, createdBy, param_id]
    );

    response.status(200).send("Successfully updated");
  } catch (e) {
    response.status(500).send("Error: " + e.toString());
  }
};
