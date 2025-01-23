import pg from "pg";
// import logger from "../logger.js";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a new quiz
export const createQuiz = async (request, response) => {
  const { type, maxScore, documentId, questionIds } = request.body;

  try {
    // Insert into quiz table
    const result = await pool.query(
      `INSERT INTO quiz (id, type, maxScore, documentId) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING id`,
      [type, maxScore, documentId]
    );

    const quizId = result.rows[0].id;

    // Insert related questions
    if (questionIds && questionIds.length > 0) {
      for (const questionId of questionIds) {
        await pool.query(
          `INSERT INTO quiz_questions (quiz_id, question_id) VALUES ($1, $2)`,
          [quizId, questionId]
        );
      }
    }

    response.status(201).send({ message: "Quiz created", quizId });
  } catch (e) {
    // logger.error(e.toString());
    console.error(e.toString());
    response.status(500).send("Error: " + e.toString());
  }
};

// Get all quizzes
export const getQuizzes = async (request, response) => {
  try {
    const result = await pool.query("SELECT * FROM quiz");

    response.status(200).send(result.rows);
  } catch (e) {
    // logger.error(e.toString());
    console.error(e.toString());
    response.status(500).send("Error: " + e.toString());
  }
};

// Get a single quiz by ID (without questions)
export const getQuizById = async (request, response) => {
  const { id } = request.params;

  try {
    const result = await pool.query(
      `SELECT id, type, maxScore, documentId FROM quiz WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return response.status(404).send({ message: "Quiz not found" });
    }

    response.status(200).send(result.rows[0]);
  } catch (e) {
    // logger.error(e.toString());
    console.error(e.toString());
    response.status(500).send("Error: " + e.toString());
  }
};

// Update a quiz
export const updateQuiz = async (request, response) => {
  const { type, maxScore, documentId, questionIds } = request.body;
  const { id } = request.params;

  try {
    // Update quiz table
    await pool.query(
      `UPDATE quiz SET type = $1, maxScore = $2, documentId = $3, updated_at = NOW() WHERE id = $4`,
      [type, maxScore, documentId, id]
    );

    // Update related questions
    if (questionIds && questionIds.length > 0) {
      // Remove existing questions for the quiz
      await pool.query(`DELETE FROM quiz_questions WHERE quiz_id = $1`, [id]);

      // Add new questions
      for (const questionId of questionIds) {
        await pool.query(
          `INSERT INTO quiz_questions (quiz_id, question_id) VALUES ($1, $2)`,
          [id, questionId]
        );
      }
    }

    response.status(200).send({ message: "Quiz updated successfully" });
  } catch (e) {
    // logger.error(e.toString());
    console.error(e.toString());
    response.status(500).send("Error: " + e.toString());
  }
};

// Delete a quiz
export const deleteQuiz = async (request, response) => {
  const { id } = request.params;

  try {
    // Delete questions associated with the quiz
    await pool.query(`DELETE FROM quiz_questions WHERE quiz_id = $1`, [id]);

    // Delete the quiz itself
    await pool.query(`DELETE FROM quiz WHERE id = $1`, [id]);

    response.status(200).send({ message: "Quiz deleted successfully" });
  } catch (e) {
    // logger.error(e.toString());
    console.error(e.toString());
    response.status(500).send("Error: " + e.toString());
  }
};

export const getQuizzesByDocumentId = async (request, response) => {
  const { id } = request.params;

  try {
    const result = await pool.query(
      `SELECT id, type, maxScore 
       FROM quiz 
       WHERE documentId = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return response.status(404).send({ message: "No quizzes found for the specified document" });
    }

    response.status(200).send(result.rows);
  } catch (e) {
    // logger.error(e.toString());
    console.error(e.toString());
    response.status(500).send("Error: " + e.toString());
  }
};
