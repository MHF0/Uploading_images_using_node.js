const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/Uploadimage");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("image"), uploadImage);

module.exports = uploadRouter;
