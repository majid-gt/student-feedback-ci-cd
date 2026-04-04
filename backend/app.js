const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Health check
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "UP" });
});

/**
 * Get all feedback
 */
app.get("/api/feedback", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM feedback ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

/**
 * Submit feedback
 */
app.post("/api/feedback", async (req, res) => {
  const { name, feedback } = req.body;

  if (!name || !feedback) {
    return res.status(400).json({ message: "Name and feedback are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO feedback (name, feedback) VALUES ($1, $2) RETURNING *",
      [name, feedback]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = app;