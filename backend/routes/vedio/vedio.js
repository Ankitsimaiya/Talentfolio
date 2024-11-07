const express = require("express");
const upload = require("../../middleware/multerMiddleware.js");
const uploadVedio = require("./uploadVedio.js");
const Authentication = require("../../middleware/Authentication.js");
const router = express.Router();

router.post(
  "/upload-image",
  
  upload.fields([
    {
      name: "image", 
      maxCount: 1,
    },
  ]), Authentication,
  uploadVedio
);

module.exports = router;
 