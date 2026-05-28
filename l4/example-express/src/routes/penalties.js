const express = require("express");
const router = express.Router();
const penaltiesController = require("../controllers/penaltiesController.js");

router.get("/", penaltiesController.getAllPenalties);
router.get("/:id", penaltiesController.getPenaltyById);
router.post("/", penaltiesController.createPenalty);
router.patch("/:id", penaltiesController.updatePenalty);
router.delete("/:id", penaltiesController.deletePenalty);

module.exports = router;