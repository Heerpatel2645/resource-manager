const { getAllResources, saveAllResources } = require("../services/resource.service");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

function getResources(req, res) {
  const resources = getAllResources();
  res.status(200).json(resources);
}

function addResource(req, res) {
  const { title, description, type, link } = req.body;

  if (!title || !description || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const resources = getAllResources();

  const newResource = {
    id: uuid(),
    title,
    description,
    type,
    link: link || "",
    fileName: req.file ? req.file.filename : "",
  };

  resources.push(newResource);
  saveAllResources(resources);

  res.status(201).json(newResource);
}

function updateResource(req, res) {
  const { id } = req.params;
  const { title, description, type, link } = req.body;

  if (!title || !description || !type) {
    return res.status(400).json({ message: "Title, description, and type are required" });
  }

  const resources = getAllResources();
  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  // Delete old file if a new file is uploaded
  if (req.file) {
    if (resource.fileName) {
      const oldFilePath = path.join(
        __dirname,
        "../../uploads",
        resource.fileName
      );
  
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (error) {
          console.error("Error deleting old file:", error);
        }
      }
    }
  
    // Save new file name
    resource.fileName = req.file.filename;
  }

  // Update resource fields
  resource.title = title;
  resource.description = description;
  resource.type = type;
  resource.link = link || "";

  saveAllResources(resources);
  res.status(200).json(resource);
}

function deleteResource(req, res) {
  const { id } = req.params;
  let resources = getAllResources();
  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  // Delete associated file if it exists
  if (resource.fileName) {
    const filePath = path.join(
      __dirname,
      "../../uploads",
      resource.fileName
    );

    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  }

  // Remove resource from array
  resources = resources.filter((r) => r.id !== id);
  saveAllResources(resources);

  res.status(200).json({ message: "Resource deleted successfully" });
}

module.exports = {
  getResources,
  addResource,
  updateResource,
  deleteResource,
};
