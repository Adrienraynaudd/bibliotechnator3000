const request = require("supertest");
const express = require("express");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const { 
  createDocument, 
  deleteDocument, 
  getDocument, 
  getAllDocument, 
  updateDocument 
} = require("../controllers/document");

// Mock the pg module and file system
jest.mock("pg", () => {
  const mPool = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

jest.mock("fs", () => ({
  existsSync: jest.fn(() => true),
  unlinkSync: jest.fn(),
}));

const app = express();
app.use(express.json());

// Mock routes
app.post("/documents", createDocument);
app.delete("/documents/:id", deleteDocument);
app.get("/documents/:id", getDocument);
app.get("/documents", getAllDocument);
app.put("/documents/:id", updateDocument);

describe("Document API", () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
    jest.clearAllMocks();
  });

  it("should create a new document", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{}] });

    const response = await request(app)
      .post("/documents")
      .send({
        title: "Test Doc",
        author: "John Doe",
        libraryId: 1,
        category: "Fiction",
      });

    expect(response.status).toBe(201);
    expect(response.text).toBe("Document created with file");
  });

  it("should delete a document", async () => {
    pool.query
      .mockResolvedValueOnce({ rows: [{ document_link: "test.pdf" }] }) // Mock SELECT query
      .mockResolvedValueOnce({}); // Mock DELETE query

    const response = await request(app).delete("/documents/1");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Successfully deleted document and file");
    expect(fs.unlinkSync).toHaveBeenCalledWith(path.join("uploads", "test.pdf")); // Ensure file deletion is called
  });

  it("should get a document by ID", async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, title: "Test Doc" }] });

    const response = await request(app).get("/documents/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, title: "Test Doc" });
  });

  it("should get all documents", async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: "Test Doc", library_name: "Library 1" }],
    });

    const response = await request(app).get("/documents");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, title: "Test Doc", library_name: "Library 1" },
    ]);
  });

  it("should update a document", async () => {
    pool.query.mockResolvedValueOnce({});

    const response = await request(app)
      .put("/documents/1")
      .send({
        title: "Updated Doc",
        author: "John Doe",
        libraryId: 1,
        category: "Non-Fiction",
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Successfully updated");
  });
});
