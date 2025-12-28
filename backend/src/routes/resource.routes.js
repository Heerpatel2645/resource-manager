const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource.controller");

router.get("/", resourceController.getResources);
router.post("/", resourceController.addResource);
router.put("/:id", resourceController.updateResource);
router.delete("/:id", resourceController.deleteResource);

module.exports = router;
