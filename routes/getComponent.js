const express = require("express");
const {
  getCpu,
  getCpuAmd,
  getCpuIntel,
  getGpu,
  getMotherboardAmd,
  getMotherboardIntel,
} = require("../controllers/pcparts.js");
const router = express.Router();

router.get("/gpu", getGpu);

router.get("/amd", getCpuAmd);

router.get("/intel", getCpuIntel);

router.get("/motherboardIntel", getMotherboardIntel);

router.get("/motherboardAmd", getMotherboardAmd);

module.exports = router;
