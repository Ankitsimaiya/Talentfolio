const express = require("express");
const signup = require("./signup.js");
const login = require("./login.js");
const update = require("./update.js");
const Authentication = require("../../middleware/Authentication.js");
const profilePhoto = require("./profilePhoto.js");
const upload = require("../../middleware/multerMiddleware.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/update", Authentication, update);
router.put(
  "/profile-photo",
  Authentication,
  upload.fields([{ name: "profile", maxCount: 1 }]),
  profilePhoto
);

module.exports = router;
