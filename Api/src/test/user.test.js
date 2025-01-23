const request = require("supertest");
const jwt = require("jsonwebtoken");
const express = require("express");
const { Pool } = require("pg");
const { createUser, deleteUser, getUser, getAllUsers, updateUser, loginUser } = require("../controllers/user");
const { authenticateToken } = require("../middleware/auth.js");

const app = express(); 

app.use(express.json()); // Mock routes 
// this route create a new user
app.post("/register", createUser);
app.post("/login", loginUser);
// this route get all users
app.get("/", getAllUsers);
// this route get the user by id
app.get("/:id", getUser);
// this route update one user by id
app.put("/:id", [authenticateToken], updateUser);
// this route remove a user by id
app.delete("/:id", [authenticateToken], deleteUser);

jest.mock("pg", () => {
  const mClient = {
    query: jest.fn(),
    connect: jest.fn(),
    release: jest.fn(),
  };
  return { Pool: jest.fn(() => mClient) };
});

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
  sign: jest.fn(() => "mockedToken"),
}));

describe("User Routes", () => {
  let pool;

  beforeAll(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("should create a new user and return a token", async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Mock flame insertion
      pool.query.mockResolvedValueOnce({ rows: [{ id: 2 }] }); // Mock user insertion

      const res = await request(app)
        .post("/register")
        .send({ name: "John Doe", email: "john@example.com", password: "password123" });

      expect(res.status).toBe(201);
      expect(res.body.token).toBe("mockedToken");
      expect(pool.query).toHaveBeenCalledTimes(2);
    });
  });

  describe("POST /login", () => {
    it("should log in a user and return a token", async () => {
      const hashedPassword = "$2b$10$saltsaltsaltsaltsaltFUIEUIEUEWoi43oi43oi4oi"; // bcrypt hash mock
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, password: hashedPassword }] });

      const bcrypt = require("bcrypt");
      jest.spyOn(bcrypt, "compareSync").mockReturnValueOnce(true);

      const res = await request(app)
        .post("/login")
        .send({ email: "john@example.com", password: "password123" });

      expect(res.status).toBe(201);
      expect(res.body.token).toBe("mockedToken");
      expect(pool.query).toHaveBeenCalledWith(
        `SELECT * FROM "user" WHERE email=$1`,
        ["john@example.com"]
      );
    });
  });

  describe("GET /", () => {
    it("should return all users", async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1, name: "John Doe" }] });

      const res = await request(app).get("/");

      expect(res.status).toBe(201);
      expect(res.body).toEqual([{ id: 1, name: "John Doe" }]);
      expect(pool.query).toHaveBeenCalledWith(`SELECT * FROM "user"`);
    });
  });

  describe("PUT /:id", () => {
    it("should update a user if authenticated", async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { email: "john@example.com" });
      });

      pool.query
        .mockResolvedValueOnce({ rows: [{ email: "john@example.com" }] }) // Mock email fetch
        .mockResolvedValueOnce(); // Mock update query

      const res = await request(app)
        .put("/1")
        .set("Authorization", "Bearer mockedToken")
        .send({ name: "John Updated", password: "newpassword123" });

      expect(res.status).toBe(201);
      expect(res.text).toBe("Successfully updated");
      expect(pool.query).toHaveBeenCalledTimes(2);
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a user if authenticated", async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { email: "john@example.com" });
      });

      pool.query
        .mockResolvedValueOnce({ rows: [{ email: "john@example.com" }] }) // Mock email fetch
        .mockResolvedValueOnce(); // Mock delete query

      const res = await request(app)
        .delete("/1")
        .set("Authorization", "Bearer mockedToken");

      expect(res.status).toBe(201);
      expect(res.text).toBe("Successfully delete");
      expect(pool.query).toHaveBeenCalledTimes(2);
    });
  });
});
