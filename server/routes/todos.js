const express = require("express");
const { Todo, User, Category } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json({message:'Todos created successfuly ' , todo:todo});
});

router.get("/", async (req, res) => { 
  const todos = await Todo.findAll({ include: ["user", "category"] });
  res.json(todos);
}); 

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.update(req.body, { where: { id } });
  res.json({ message: "Todo updated!" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.destroy({ where: { id } });
  res.json({ message: "Todo deleted!" });
});


router.post("/complete/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.update(
    { completed: true }, // Assuming 'completed' is a boolean field
    { where: { id } }
  );
  res.json({ message: "Todo completed!" });
});



router.get("/catagory/:id", async (req, res) => { 
  const { id } = req.params;
  const todos = await Todo.findAll({  where: { categoryId:id },include: ["user", "category"] });
  res.json({todos:todos});
}); 

module.exports = router;
