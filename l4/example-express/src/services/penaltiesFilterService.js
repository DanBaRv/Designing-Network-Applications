const fileService = require("./fileReadWriteService.js");

let dataFilePath;

const init = (filePath) => {
  dataFilePath = filePath;
};

const findAll = (title) => {
  const penalties = fileService.readData(dataFilePath);
  if (title) {
    return penalties.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase()),
    );
  }
  return penalties;
};

const findOne = (id) => {
  const penalties = fileService.readData(dataFilePath);
  return penalties.find((item) => item.id === id);
};

const create = (penaltyData) => {
  const penalties = fileService.readData(dataFilePath);

  const newId = penalties.length > 0 ? Math.max(...penalties.map((p) => p.id)) + 1 : 1;

  const newPenalty = { id: newId, ...penaltyData };
  penalties.push(newPenalty);
  fileService.writeData(dataFilePath, penalties);

  return newPenalty;
};

const update = (id, penaltyData) => {
  const penalties = fileService.readData(dataFilePath);
  const index = penalties.findIndex((p) => p.id === id);

  if (index === -1) return null;

  penalties[index] = { ...penalties[index], ...penaltyData };
  fileService.writeData(dataFilePath, penalties);

  return penalties[index];
};

const remove = (id) => {
  const penalties = fileService.readData(dataFilePath);
  const filteredPenalties = penalties.filter((p) => p.id !== id);

  if (filteredPenalties.length === penalties.length) {
    return false;
  }

  fileService.writeData(dataFilePath, filteredPenalties);
  return true;
};

module.exports = { init, findAll, findOne, create, update, remove };