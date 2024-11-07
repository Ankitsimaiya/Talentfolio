const express = require("express");
const upload = require("../../middleware/multerMiddleware.js");
const uploadVedio = require("./uploadVedio.js");
const Authentication = require("../../middleware/Authentication.js");
const deleteMedia = require("./deleteMedia.js");
const router = express.Router();

router.post(
  "/upload-image",
  upload.fields([{ name: "image", maxCount: 1 }]),
  Authentication,
  uploadVedio
);
router.delete("/delete-media/:id",Authentication,deleteMedia)

module.exports = router;

