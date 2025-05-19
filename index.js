// ✅ STEP 1: Load environment variables BEFORE anything else
const dotenv = require("dotenv");
dotenv.config();

// ✅ STEP 2: Import modules
const express = require("express");
const cors = require("cors"); // 👈 Add this
const connectDB = require("./config/db");
const imageRoutes = require("./routes/imageRoutes");

// ✅ STEP 3: Connect to MongoDB
connectDB();

// ✅ STEP 4: Initialize express app
const app = express();

// ✅ STEP 5: Allow CORS from frontend port
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

// ✅ STEP 6: Use routes
app.use("/api", imageRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    error: "Something went wrong",
    message: err.message || "Unexpected error",
  });
});

// ✅ STEP 7: Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
