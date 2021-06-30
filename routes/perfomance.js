const express = require('express');
const {performance} = require("../controllers/performance.js");
const router = express.Router();

router.post('/', performance);

module.exports = router;