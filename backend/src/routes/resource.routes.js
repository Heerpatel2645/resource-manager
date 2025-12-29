const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resource.controller");
const upload = require("../middleware/upload");

router.get("/", resourceController.getResources);
router.post("/", upload.single("file"), resourceController.addResource);
router.put("/:id", upload.single("file"), resourceController.updateResource);
router.delete("/:id", resourceController.deleteResource);

module.exports = router;
