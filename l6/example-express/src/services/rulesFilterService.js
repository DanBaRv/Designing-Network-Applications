const fileService = require("./fileReadWriteService.js");

let dataFilePath;

const init = (filePath) => {
  dataFilePath = filePath;
};

const findAll = (title) => {
  const rules = fileService.readData(dataFilePath);
  if (title) {
    return rules.filter((rules) =>
      rules.title.toLowerCase().includes(title.toLowerCase()),
    );
  }
  return rules;
};

const findOne = (id) => {
  const rules = fileService.readData(dataFilePath);
  return rules.find((stock) => stock.id === id);
};

const create = (rulesData) => {
  const rules = fileService.readData(dataFilePath);

  const newId = rules.length > 0 ? Math.max(...rules.map((s) => s.id)) + 1 : 1;

  const newRules = { id: newId, ...rulesData };
  rules.push(newRules);
  fileService.writeData(dataFilePath, rules);

  return newRules;
};

const update = (id, rulesData) => {
  const rules = fileService.readData(dataFilePath);
  const index = rules.findIndex((s) => s.id === id);

  if (index === -1) return null;

  rules[index] = { ...rules[index], ...rulesData };
  fileService.writeData(dataFilePath, rules);

  return rules[index];
};

const remove = (id) => {
  const rules = fileService.readData(dataFilePath);
  const filteredRules = rules.filter((s) => s.id !== id);

  if (filteredRules.length === rules.length) {
    return false;
  }

  fileService.writeData(dataFilePath, filteredRules);
  return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
