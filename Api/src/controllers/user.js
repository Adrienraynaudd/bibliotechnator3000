const pg = require("pg");
const { Pool } = pg;
const { generateAccessToken } = require("../lib/token.js");
const bcrypt = require("bcrypt")
const logger = require("../lib/logger.js")
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createUser = async (request, response) => {
  let route = `${request.method} ${request.baseUrl}${request.path}`;
  const { name, email, password } = request.body;
  const hash = bcrypt.hashSync(password, 10);
  try {
    const { rows: flameRows } = await pool.query(
      `INSERT INTO "flame" (date, "numberOfFlame") VALUES (CURRENT_DATE, 0) RETURNING id`
    );
    const flameID = flameRows[0].id;

    // Insertion dans la table user
    const result = await pool.query(
      `INSERT INTO "user" (name, email, password, "flameId") VALUES ($1, $2, $3, $4) RETURNING id`,
      [name, email, hash, flameID]
    );
    logger.info(`${route} - ${result}`);
    response.status(201).send({
      token: generateAccessToken(email),
    });
  } catch (e) {
    logger.error(`${route} - ${e.toString()}`);
    response.status(500).send("Error: ");
  }
};

const loginUser = async (request, response) => {
  let route = `${request.method} ${request.baseUrl}${request.path}`;
  const { email, password } = request.body;
  try {
    const { rows } = await pool.query(`SELECT * FROM "user" WHERE email=$1`, [
      email
    ]);
    if (bcrypt.compareSync(password, rows[0].password)) {
      logger.info(`${route} - ${rows}`);
      response.status(201).send({
        token: generateAccessToken(email),
      });
    } else {
      response.status(401).send("Wrong password");
    }
  } catch (error) {
    logger.info(`${route} - ${error}`);
    response.status(500).send("An error occurred");
  }
};

const getUser = async (request, response) => {
  let route = `${request.method} ${request.baseUrl}${request.path}`;
  try {
    const { rows } = await pool.query(`SELECT * FROM "user" where id = $1`, [
      request.params.id,
    ]);
    logger.info(`${route} - ${rows}`);
    response.status(201).send(rows);
  } catch (e) {
    logger.error(`${route} - ${e.toString()}`);
    response.status(500).send("Error: ");
  }
};

const getAllUsers = async (request, response) => {
  let route = `${request.method} ${request.baseUrl}${request.path}`;
  try {
    const { rows } = await pool.query(`SELECT * FROM "user"`);
    logger.info(`${route} - ${rows}`);
    response.status(201).send(rows);
  } catch (e) {
    logger.error(`${route} - ${e.toString()}`);
    response.status(500).send("Error: ");
  }
};

const updateUser = async (request, response) => {
  let route = `${request.method} ${request.baseUrl}${request.path}`;
  try {
    const { name, password } = request.body;
    const hash = bcrypt.hashSync(password, 10);
    const param_id = request.params.id;

    const result = await pool.query(`SELECT email FROM "user" where id=$1`, [
      request.params.id,
    ]);

    console.log(result, request.user.email)
    if (request.user.email == result.rows[0].email) {
      await pool.query(
        `UPDATE "user" set name = $1, password = $2 WHERE id = $3`,
        [name, hash, param_id]
      );
      logger.info(`${route} - ${rows}`);
      response.status(201).send("Successfully updated");
    }
    response.status(201).send("Update not allowed");
  } catch (e) {
    logger.error(e.toString());
    response.status(500).send("Error: ");
  }
};

const deleteUser = async (request, response) => {
  let route = `${request.method} ${request.baseUrl}${request.path}`;
  try {

    const result = await pool.query(`SELECT email FROM "user" where id=$1`, [
      request.params.id,
    ]);

    if (request.user.email == result.rows[0].email) {
      await pool.query(`DELETE FROM "user" where id = $1`, [
        request.params.id,
      ]);

      response.status(201).send("Successfully delete");
    }
    response.status(201).send("Delete not allowed");
  } catch (e) {
    logger.error(`${route} - ${e.toString()}`);
    response.status(500).send("Error: ");
  }
};

module.exports = { createUser, loginUser, getAllUsers, getUser, updateUser, deleteUser}