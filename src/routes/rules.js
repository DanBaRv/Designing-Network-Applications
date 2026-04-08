const express = require("express");
const router = express.Router();
const rulesController = require("../controllers/rulesController.js");

// Определение маршрутов
router.get("/", rulesController.getAllRules);
router.get("/:id", rulesController.getRuleById);
router.post("/", rulesController.createRule);
router.patch("/:id", rulesController.updateRule);
router.delete("/:id", rulesController.deleteRule);

module.exports = router;
