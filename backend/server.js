const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "feedbackuser",
  password: process.env.DB_PASSWORD || "feedbackpassword",
  database: process.env.DB_NAME || "feedbackdb",
});

// Create table if not exists
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        feedback TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("PostgreSQL connected & table ready");
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}

initDB();

/**
 * Health check endpoint
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "UP" });
});

/**
 * Get all feedback (from database)
 */
app.get("/api/feedback", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM feedback ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ message: "Database error" });
  }
});

/**
 * Submit new feedback (store in database)
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
    console.error("Error inserting feedback:", err);
    res.status(500).json({ message: "Database error" });
  }
});

/**
 * Start server
 */
async function startServer() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        feedback TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("PostgreSQL connected & table ready");

    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  }
}

startServer();