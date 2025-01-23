import pg from "pg";
import logger from "../logger.js";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getQuizzes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM quiz");
    res.status(200).json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM quiz WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};

export const getQuizzesByDocumentId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM quiz WHERE documentId = $1", [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Failed to fetch quizzes for the document" });
  }
};

export const createQuiz = async (req, res) => {
  const { type, max_score, documentId, questions } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const quizResult = await client.query(
      "INSERT INTO quiz (type, max_score, documentId) VALUES ($1, $2, $3) RETURNING *",
      [type, max_score, documentId]
    );

    const quizId = quizResult.rows[0].id;

    for (const question of questions) {
      const { type: questionType, question: questionText, answers, good_answer } = question;
      await client.query(
        "INSERT INTO question (type, question, answers, good_answer, quiz_id) VALUES ($1, $2, $3, $4, $5)",
        [questionType, questionText, JSON.stringify(answers), good_answer, quizId]
      );
    }

    await client.query("COMMIT");
    res.status(201).json(quizResult.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    logger.error(error);
    res.status(500).json({ error: "Failed to create quiz and questions" });
  } finally {
    client.release();
  }
};

export const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { type, max_score, documentId } = req.body;
  try {
    const result = await pool.query(
      "UPDATE quiz SET type = $1, max_score = $2, documentId = $3 WHERE id = $4 RETURNING *",
      [type, max_score, documentId, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Failed to update quiz" });
  }
};

export const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM quiz WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};
