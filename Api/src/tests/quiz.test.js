const request = require("supertest");
const express = require("express");
const { Pool } = require("pg");
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuizzesByDocumentId,
} = require("../controllers/quiz.js");

jest.mock("pg", () => {
  const mClient = {
    query: jest.fn(),
    connect: jest.fn(),
  };
  const mPool = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const app = express();
app.use(express.json());

app.get("/quizzes/", getQuizzes);
app.get("/quizzes/:id", getQuizById);
app.post("/quizzes/", createQuiz);
app.put("/quizzes/:id", updateQuiz);
app.delete("/quizzes/:id", deleteQuiz);
app.get("/document/:id/quiz", getQuizzesByDocumentId);

describe("Quiz API", () => {
  it("should create a new document", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{}] });

    const response = await request(app)
      .post("/quizzes")
      .send({
        type: "multiple-choice",
        max_score: 100,
        document_id: "12345-abcd-67890-efgh",
        questions: [
          {
            type: "text",
            question: "What is the capital of France?",
            answers: ["Paris", "London", "Berlin", "Madrid"],
            good_answer: "Paris",
          },
          {
            type: "text",
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Mars", "Venus", "Jupiter"],
            good_answer: "Mars",
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.text).toBe("Quiz created with file");
  });

  //   it("should create a new quiz", async () => {
  //     const pool = new Pool();
  //     pool.query.mockResolvedValueOnce({ rows: [{}] });

  //     const response = await request(app)
  //       .post("/quizzes")
  //       .send({
  //         type: "multiple-choice",
  //         max_score: 100,
  //         document_id: "12345-abcd-67890-efgh",
  //         questions: [
  //           {
  //             type: "text",
  //             question: "What is the capital of France?",
  //             answers: ["Paris", "London", "Berlin", "Madrid"],
  //             good_answer: "Paris",
  //           },
  //           {
  //             type: "text",
  //             question: "Which planet is known as the Red Planet?",
  //             answers: ["Earth", "Mars", "Venus", "Jupiter"],
  //             good_answer: "Mars",
  //           },
  //         ],
  //       });

  //     expect(response.status).toBe(201);
  //   });

  it("should delete a quiz", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const response = await request(app).delete("/quizzes/1");

    expect(response.status).toBe(200);
  });

  it("should get a quiz by ID", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const response = await request(app).get("/quizzes/1");

    expect(response.status).toBe(200);
  });

  it("should get quizzes by a document ID", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const response = await request(app).get("/document/1/quiz");

    expect(response.status).toBe(200);
  });

  it("should get all quizzes", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }, { id: 2 }] });

    const response = await request(app).get("/quizzes");

    expect(response.status).toBe(200);
  });

  it("should update a quiz", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({});

    const response = await request(app).put("/quizzes/1").send({
      type: "multiple-choice",
      max_score: 100,
      document_id: "12345-abcd-67890-efgh",
    });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Successfully updated");
  });
});
