const request = require("supertest");
const express = require("express");
const { Pool } = require("pg");
const { createDocument, deleteDocument, getDocument, getAllDocument, updateDocument } = require("../controllers/document");

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
app.post("/documents", createDocument);
app.delete("/documents/:id", deleteDocument);
app.get("/documents/:id", getDocument);
app.get("/documents", getAllDocument);
app.put("/documents/:id", updateDocument);

describe("Document API", () => {
  it("should create a new document", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{}] });

    const response = await request(app)
      .post("/documents")
      .send({ title: "Test Doc", author: "John Doe", libraryId: 1, category: "Fiction", createdBy: 1 });

    expect(response.status).toBe(201);
    expect(response.text).toBe("Document created with file");
  });

  it("should delete a document", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{ documentLink: "test.pdf" }] });
    pool.query.mockResolvedValueOnce({});

    const response = await request(app).delete("/documents/1");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Successfully deleted document and file");
  });

  it("should get a document by ID", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, title: "Test Doc" }] });

    const response = await request(app).get("/documents/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, title: "Test Doc" });
  });

  it("should get all documents", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: "Test Doc", library_name: "Library 1", created_by_name: "Admin" }],
    });

    const response = await request(app).get("/documents");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, title: "Test Doc", library_name: "Library 1", created_by_name: "Admin" },
    ]);
  });

  it("should update a document", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValueOnce({});

    const response = await request(app)
      .put("/documents/1")
      .send({ title: "Updated Doc", author: "John Doe", libraryId: 1, category: "Non-Fiction", createdBy: 1 });

    expect(response.status).toBe(200);
    expect(response.text).toBe("Successfully updated");
  });
});
