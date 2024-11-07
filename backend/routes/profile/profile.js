const express = require("express");
const details = require("./details");
const Authentication = require("../../middleware/Authentication");

const router = express.Router();

router.get("/details",Authentication,details)

module.exports = router;
