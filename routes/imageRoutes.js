// routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const { uploadImage, getImages } = require("../controllers/imageController");

// 👇 THIS LINE is sensitive to field name
router.post("/upload", upload.single("image"), uploadImage);

router.get("/images", getImages);

module.exports = router;
