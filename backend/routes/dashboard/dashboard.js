const express = require("express");
const subdetails = require("./subDetails");

const router = express.Router();

router.get('/subdetails/:category',subdetails)

module.exports = router;
