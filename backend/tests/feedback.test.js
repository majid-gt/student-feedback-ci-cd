jest.mock("../db", () => ({
  query: jest.fn(),
}));

const request = require("supertest");
const app = require("../app");
const pool = require("../db");

describe("Feedback API", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * GET /api/feedback
   */
  it("should return all feedback", async () => {
    pool.query.mockResolvedValue({
      rows: [
        { id: 1, name: "Majid", feedback: "Great app!" },
      ],
    });

    const res = await request(app).get("/api/feedback");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Majid");
  });

  /**
   * GET error case
   */
  it("should return 500 if DB fails", async () => {
    pool.query.mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/api/feedback");

    expect(res.statusCode).toBe(500);
  });

  /**
   * POST success
   */
  it("should create feedback", async () => {
    pool.query.mockResolvedValue({
      rows: [
        { id: 1, name: "Majid", feedback: "Nice app!" },
      ],
    });

    const res = await request(app)
      .post("/api/feedback")
      .send({ name: "Majid", feedback: "Nice app!" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Majid");
  });

  /**
   * POST validation error
   */
  it("should return 400 for missing fields", async () => {
    const res = await request(app)
      .post("/api/feedback")
      .send({ name: "" });

    expect(res.statusCode).toBe(400);
  });

});