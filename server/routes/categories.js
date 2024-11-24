const express = require("express");
const { Category } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

router.get("/", async (req, res) => {
  const categories = await Category.findAll({include: ["todos"]});
  res.json({'categories':categories});
});

module.exports = router;
