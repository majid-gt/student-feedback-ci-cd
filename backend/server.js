const app = require("./app");
const pool = require("./db");

const PORT = process.env.PORT || 8000;

// Initialize DB
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

    console.log("✅ PostgreSQL connected & table ready");
  } catch (err) {
    console.error("❌ Database initialization error:", err);
    throw err;
  }
}

// Start server
async function startServer() {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();