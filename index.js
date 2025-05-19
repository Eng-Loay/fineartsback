const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const imageRoutes = require("./routes/imageRoutes");

connectDB();

const app = express();

// ✅ Enable CORS for your frontend
app.use(cors({ origin: "*" })); // Use "*" if you're deploying frontend elsewhere

app.use(express.json());

// ✅ Add root route for Railway to know app is live
app.get("/", (req, res) => {
  res.send("API is running");
});

// ✅ Mount your /api routes
app.use("/api", imageRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    error: "Something went wrong",
    message: err.message || "Unexpected error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
