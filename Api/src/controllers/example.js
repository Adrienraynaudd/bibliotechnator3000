import pg from "pg";
import logger from "../logger.js";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const createExample = async (request, response) => {
  const { example, title, message, date } = request.body;
  try {
    await pool.query(
      `INSERT INTO example (example_id, title, message, date) VALUES ($1, $2, $3, $4) RETURNING *`,
      [example, title, message, date]
    );

    response.status(201).send("Note created");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const getExample = async (request, response) => {
  try {
    await pool.query("SELECT * FROM example where example_id = $1", [
      request.params.example_id,
    ]);

    response.status(201).send("Data recovered well");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const updateExample = async (request, response) => {
  try {
    const { userId, title, message, date } = request.body;
    const id = request.params.id;
    const updated_at = new Date();

    await pool.query(
      "UPDATE example set title = $1, message = $2, date = $3, updated_at = $4 WHERE id = $5",
      [title, message, date, updated_at, id]
    );

    response.status(201).send("Successfully updated");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const deleteExample = async (request, response) => {
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
