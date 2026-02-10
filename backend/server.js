const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (simple & enough for CI/CD demo)
let feedbackList = [];

/**
 * Health check endpoint
 * Useful for monitoring, CI/CD, load balancers
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "UP" });
});

/**
 * Get all feedback
 */
app.get("/api/feedback", (req, res) => {
  res.json(feedbackList);
});

/**
 * Submit new feedback
 */
app.post("/api/feedback", (req, res) => {
  const { name, feedback } = req.body;

  if (!name || !feedback) {
    return res.status(400).json({ message: "Name and feedback are required" });
  }

  const newFeedback = {
    id: Date.now(),
    name,
    feedback
  };

  feedbackList.push(newFeedback);
  res.status(201).json(newFeedback);
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
