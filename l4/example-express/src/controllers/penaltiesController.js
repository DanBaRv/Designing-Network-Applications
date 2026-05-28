const penaltiesService = require("../services/penaltiesFilterService.js");

const getAllPenalties = (req, res) => {
  const { title } = req.query;
  const penalties = penaltiesService.findAll(title);
  res.json(penalties);
};

const getPenaltyById = (req, res) => {
  const id = parseInt(req.params.id);
  const penalty = penaltiesService.findOne(id); 

  if (!penalty) {
    return res.status(404).json({ error: "Штраф не найден" });
  }

  res.json(penalty);
};

const createPenalty = (req, res) => {
  const { title, description, fine, src } = req.body;

  if (!title || !description || fine === undefined) {
    return res
      .status(400)
      .json({ error: "Не все поля заполнены (title, description, fine)" });
  }

  const newPenalty = penaltiesService.create({ title, description, fine, src });
  res.status(201).json(newPenalty);
};

const updatePenalty = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPenalty = penaltiesService.update(id, req.body);

  if (!updatedPenalty) {
    return res.status(404).json({ error: "Штраф не найден" });
  }

  res.json(updatedPenalty);
};

const deletePenalty = (req, res) => {
  const id = parseInt(req.params.id);
  const success = penaltiesService.remove(id);

  if (!success) {
    return res.status(404).json({ error: "Штраф не найден" });
  }

  res.status(204).send(); 
};

module.exports = {
  getAllPenalties,
  getPenaltyById,
  createPenalty,
  updatePenalty,
  deletePenalty,
};