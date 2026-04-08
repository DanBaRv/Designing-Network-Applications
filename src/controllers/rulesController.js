const rulesService = require("../services/rulesFilterService.js");

const getAllRules = (req, res) => {
  const { title } = req.query;
  const rules = rulesService.findAll(title);
  res.json(rules);
};


const getRuleById = (req, res) => {
  const id = parseInt(req.params.id);
  const rule = rulesService.findOne(id); 

  if (!rule) {
    return res.status(404).json({ error: "Правило не найдено" });
  }

  res.json(rule);
};

const createRule = (req, res) => {
  const { title, description, fine } = req.body;

  if (!title || !description || !fine) {
    return res
      .status(400)
      .json({ error: "Не все поля заполнены (title, description, fine)" });
  }

  const newRule = rulesService.create({ title, description, fine });
  res.status(201).json(newRule);
};

const updateRule = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedRule = rulesService.update(id, req.body);

  if (!updatedRule) {
    return res.status(404).json({ error: "Правило не найдено" });
  }

  res.json(updatedRule);
};

const deleteRule = (req, res) => {
  const id = parseInt(req.params.id);
  const success = rulesService.remove(id);

  if (!success) {
    return res.status(404).json({ error: "Правило не найдено" });
  }

  res.status(204).send(); 
};

module.exports = {
  getAllRules,
  getRuleById,
  createRule,
  updateRule,
  deleteRule,
};
