
const request = require("supertest");
const express = require("express");
const { Pool } = require("pg");
const { createUser, deleteUser, getUser, getAllUsers, updateUser } = require("../controllers/user.js");

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

// Mock routes
app.post("/user", createUser);
app.delete("/user/:id", deleteUser);
app.get("/user/:id", getUser);
app.get("/user", getAllUsers);
app.put("/user/:id", updateUser);

describe("User API", () => {
  it("should create a new user", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{}] });

    const response = await request(app)
      .post("/user")
      .send({ name: "User Test", email: "test@test.com", password: "password"});

    expect(response.status).toBe(201);
  });

  it("should delete a document", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const response = await request(app).delete("/user/1");

    expect(response.status).toBe(201);
  });

  it("should get a document by ID", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1}] });

    const response = await request(app).get("/user/1");

    expect(response.status).toBe(200);
  });

  it("should get all documents", async () => {
    const pool = new Pool();

    const response = await request(app).get("/user");

    expect(response.status).toBe(200);
  });

  it("should update a document", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({});

    const response = await request(app)
      .put("/user/1")
      .send({ name: "TestModfi", password: "newPassword" });

    expect(response.status).toBe(200);
  });
});
