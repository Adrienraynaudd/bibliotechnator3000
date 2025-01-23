const pg = require("pg");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgres://admin:admin@localhost:5432/ultimatelibrary",
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

const createLibrary = async (request, response) => {
  const { name } = request.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO library (name) VALUES ($1) RETURNING *`,
      [name]
    );

    response.status(201).json(rows[0]);
  } catch (error) {
    response.status(500).send("Error: " + error.message);
  }
};

const createDocument = async (request, response) => {
  const uploadFile = upload.single("documentFile");
  uploadFile(request, response, async (err) => {
    if (err) {
      return response.status(400).send("Error uploading file: " + err.message);
    }

    const { title, author, library_id, category } = request.body;
    const documentLink = request.file ? request.file.filename : null;

    try {
      await pool.query(
        `INSERT INTO document (title, author, library_id, category, document_link) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [title, author, library_id, category, documentLink]
      );

      response.status(201).send("Document created with file");
    } catch (e) {
      response.status(500).send("Error: " + e.toString());
    }
  });
};

const deleteDocument = async (request, response) => {
  const documentId = request.params.id;

  try {
    const { rows } = await pool.query(`SELECT document_link FROM document WHERE id = $1`, [documentId]);

    if (rows.length === 0) {
      return response.status(404).send("Document not found");
    }

    const documentLink = rows[0].document_link;

    if (!documentLink) {
      return response.status(400).send("Document link not available");
    }

    const filePath = path.join("uploads", documentLink);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      return response.status(404).send("File not found");
    }

    await pool.query(`DELETE FROM document WHERE id = $1`, [documentId]);

    response.status(200).send("Successfully deleted document and file");
  } catch (e) {
    response.status(500).send("Error: " + e.toString());
  }
};

const getDocument = async (request, response) => {
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

const getAllDocument = async (request, response) => {
  try {
    const { rows } = await pool.query(
      `SELECT document.* FROM document`
    );
    response.status(200).json(rows);
  } catch (e) {
    response.status(500).send("Error: " + e.toString());
  }
};

const updateDocument = async (request, response) => {
  try {
    const { title, author, library_id, category } = request.body;
    const param_id = request.params.id;

    await pool.query(
      `UPDATE document SET title = $1, author = $2, library_id = $3, category = $4
       WHERE id = $5`,
      [title, author, library_id, category, param_id]
    );

    response.status(200).send("Successfully updated");
  } catch (e) {
    response.status(500).send("Error: " + e.toString());
  }
};

module.exports = {
  createLibrary,
  createDocument,
  deleteDocument,
  getDocument,
  getAllDocument,
  updateDocument
};
