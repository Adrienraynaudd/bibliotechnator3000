const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getQuizzes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM quiz");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        qz.id AS id, 
        qz.type AS type, 
        qz.max_score, 
        qz.document_id, 
        json_agg(json_build_object(
          'id', qs.id,
          'type', qs.type,
          'question', qs.question,
          'answers', qs.answers,
          'good_answer', qs.good_answer
        )) AS questions
      FROM quiz qz
      LEFT JOIN question qs ON qz.id = qs.quiz_id
      WHERE qz.id = $1
      GROUP BY qz.id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quiz and its questions" });
  }
};

const getQuizzesByDocumentId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM quiz WHERE document_id = $1",
      [id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes for the document" });
  }
};

const createQuiz = async (req, res) => {
  const { type, max_score, documentId, questions } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    console.log("test");

    const quizResult = await client.query(
      "INSERT INTO quiz (type, max_score, document_id) VALUES ($1, $2, $3) RETURNING *",
      [type, max_score, documentId]
    );
    console.log("test");

    const quizId = quizResult.rows[0].id;

    console.log("test");

    for (const question of questions) {
      const {
        type: questionType,
        question: questionText,
        answers,
        good_answer,
      } = question;
      await pool.query(
        "INSERT INTO question (type, question, answers, good_answer, quiz_id) VALUES ($1, $2, $3, $4, $5)",
        [
          questionType,
          questionText,
          JSON.stringify(answers),
          good_answer,
          quizId,
        ]
      );
    }

    await pool.query("COMMIT");
    res.status(201).json(quizResult.rows[0]);
  } catch (error) {
    console.log(error);
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "Failed to create quiz and questions" });
  }
};

const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { type, max_score, documentId } = req.body;
  try {
    const result = await pool.query(
      "UPDATE quiz SET type = $1, max_score = $2, document_id = $3 WHERE id = $4 RETURNING *",
      [type, max_score, documentId, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).send("Successfully updated");
  } catch (error) {
    res.status(500).json({ error: "Failed to update quiz" });
  }
};

const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM quiz WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  getQuizzesByDocumentId,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
