const gpu = require("../parts/gpu_database.json");
const amdCpu = require("../parts/amd_cpu_database.json");
const intelCpu = require("../parts/intel_cpu_database.json");
const MotherboardAmd = require("../parts/MotherboardAmd.json");
const MotherboardIntel = require("../parts/MotherboardIntel.json");

exports.getCpu = (req, res) => {
  res.status(200).send(amdCpu + intelCpu);
};

exports.getCpuAmd = async (req, res) => {
  res.status(200).send(amdCpu);
};

exports.getCpuIntel = async (req, res) => {
  res.status(200).send(intelCpu);
};

exports.getGpu = (req, res) => {
  res.status(200).send(gpu);
};

exports.getMotherboard = (req, res) => {
  res.status(200).send(MotherboardIntel + MotherboardAmd);
};
exports.getMotherboardIntel = async (req, res) => {
  res.status(200).send(MotherboardIntel);
};

exports.getMotherboardAmd = async (req, res) => {
  res.status(200).send(MotherboardAmd);
};
