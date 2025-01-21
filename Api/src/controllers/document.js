import pg from "pg";
// import logger from "../logger.js";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const createDocument = async (request, response) => {
  const { id, title, author, libraryId, categorie } = request.body;
  try {
    await pool.query(
      `INSERT INTO example (id, title, author, libraryId, category) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, title, author, libraryId, categorie]
    );

    response.status(201).send("Document created");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const getDocument = async (request, response) => {
  try {
    await pool.query("SELECT * FROM example where example_id = $1", [
      request.params.id,
    ]);

    response.status(201).send("Data recovered well");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const updateDocument = async (request, response) => {
  try {
    const { title, author, libraryId, categorie } = request.body;
    const param_id = request.params.id;

    await pool.query(
      "UPDATE example set title = $1, author = $2, libraryId = $3, catégorie = $4, updated_at = $5 WHERE id = $6",
      [title, author, libraryId, categorie, updated_at, param_id]
    );

    response.status(201).send("Successfully updated");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const deleteDocument = async (request, response) => {
  try {
    await pool.query(`DELETE FROM example where example_id = $1`, [
      request.params.id,
    ]);

    response.status(201).send("Successfully delete");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};
