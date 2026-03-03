const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "feedbackuser",
  password: process.env.DB_PASSWORD || "feedbackpassword",
  database: process.env.DB_NAME || "feedbackdb",
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

module.exports = pool;