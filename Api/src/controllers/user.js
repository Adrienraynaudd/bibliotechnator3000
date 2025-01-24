const { Pool } = require("pg");
const logger = require("../lib/logger");

const pool = new Pool();

const createUser = async (request, response) => {
  const { name, email, password } = request.body;
  const route = "POST /user";
  try {
    const userQuery = await pool.query(
      "INSERT INTO \"user\" (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    const user = userQuery.rows[0];
    logger.info(`${route} - ${JSON.stringify(user)}`);
    response.status(201).json(user);
  } catch (e) {
    logger.error(`${route} - ${e.toString()}`);
    response.status(500).send("Error: ");
  }
};

const getUser = async (request, response) => {
  const { id } = request.params;
  const route = `GET /user/${id}`;
  try {
    const userQuery = await pool.query("SELECT * FROM \"user\" WHERE id = $1", [id]);
    const user = userQuery.rows[0];
    if (!user) {
      response.status(404).send("User not found");
      return;
    }
    logger.info(`${route} - ${JSON.stringify(user)}`);
    response.status(200).json(user);
  } catch (e) {
    logger.error(`${route} - ${e.toString()}`);
    response.status(500).send("Error: ");
  }
};

const getAllUsers = async (request, response) => {
  const route = "GET /user";
  try {
    const userQuery = await pool.query("SELECT * FROM \"user\"");
    const users = userQuery.rows;
    logger.info(`${route} - ${JSON.stringify(users)}`);
    response.status(200).json(users);
  } catch (e) {
    logger.error(`${route} - ${e.toString()}`);
    response.status(500).send("Error: ");
  }
};

const deleteUser = async (request, response) => {
  const { id } = request.params;
  const route = `DELETE /user/${id}`;
  try {
    const userQuery = await pool.query("SELECT email FROM \"user\" WHERE id = $1", [id]);
    const user = userQuery.rows[0];
    if (!user) {
      response.status(404).send("User not found");
      return;
    }
    await pool.query("DELETE FROM \"user\" WHERE id = $1", [id]);
    logger.info(`${route} - User deleted`);
    response.status(201).send("User deleted");
    return;
  } catch (e) {
    logger.error(`${route} - ${e.toString()}`);
    response.status(500).send("Error: ");
    return;
  }
};

const updateUser = async (request, response) => {
  const { id } = request.params;
  const { name, email, password } = request.body;
  const route = `PUT /user/${id}`;
  try {
    const userQuery = await pool.query("SELECT email FROM \"user\" WHERE id = $1", [id]);
    const user = userQuery.rows[0];
    if (!user) {
      response.status(404).send("User not found");
      return;
    }

    const updateQuery = await pool.query(
      "UPDATE \"user\" SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, id]
    );

    const updatedUser = updateQuery.rows[0];
    logger.info(`${route} - ${JSON.stringify(updatedUser)}`);
    response.status(201).json(updatedUser);
    return;
  } catch (e) {
    logger.error(`${route} - ${e.toString()}`);
    response.status(500).send("Error: ");
    return;
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
