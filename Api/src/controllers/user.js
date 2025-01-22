import pg from "pg";
const { Pool } = pg;
import logger from "../lib/logger.js";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const createUser = async (request, response) => {
  const { name, email, password } = request.body;


  try {
    const { rows: flameRows } = await pool.query(
      `INSERT INTO "flame" (date, "numberOfFlame") VALUES (CURRENT_DATE, 0) RETURNING id`
    );
    const flameID = flameRows[0].id;

    // Insertion dans la table user
    const { rows: userRows } = await pool.query(
      `INSERT INTO "user" (name, email, password, "flameId") VALUES ($1, $2, $3, $4) RETURNING id`,
      [name, email, password, flameID]
    );

    const userID = userRows[0].id;

    response.status(201).send("User " + userID + " created with flame ID: " + flameID);
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const getUser = async (request, response) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM "user" where id = $1`, [
      request.params.id,
    ]);

    response.status(201).send(rows);
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const getAllUsers = async (request, response) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM "user"`);

    response.status(201).send(rows);
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const updateUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const param_id = request.params.id;

    await pool.query(
      `UPDATE "user" set name = $1, email = $2, password = $3 WHERE id = $6`,
      [name, email, password, param_id]
    );

    response.status(201).send("Successfully updated");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};

export const deleteUser = async (request, response) => {
  try {
    await pool.query(`DELETE FROM "user" where id = $1`, [
      request.params.id,
    ]);

    response.status(201).send("Successfully delete");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ", e.toString());
  }
};
