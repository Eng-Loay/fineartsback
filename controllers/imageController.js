const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  try {
    console.log("REQ.FILE:", req.file); // Debug the uploaded file

    if (!req.file || !req.file.path) {
      return res
        .status(400)
        .json({ error: "No file uploaded or path missing" });
    }

    const image = await Image.create({
      url: req.file.path,
      public_id: req.file.filename || req.file.originalname || "unknown",
    });

    return res.status(200).json({
      message: "Upload successful",
      data: image,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err); // Properly log full error
    return res.status(500).json({
      error: "Upload failed",
      details: err.message || "Unknown error",
    });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images); // ← show the full documents for debugging
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};
