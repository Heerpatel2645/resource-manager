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

  const resources = getAllResources();
  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  if (req.file) {
    // remove old file if it exists
    if (resource.fileName) {
      const oldFilePath = path.join(
        __dirname,
        "../../uploads",
        resource.fileName
      );
  
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
  
    // save new file name
    resource.fileName = req.file.filename;
  }
  

  resource.title = title;
  resource.description = description;
  resource.type = type;
  resource.link = link || "";

  saveAllResources(resources);
  res.json(resource);
}

function deleteResource(req, res) {
  const { id } = req.params;
  let resources = getAllResources();
  const resource = resources.find((r) => r.id === id);

  if (resource && resource.fileName) {
    const filePath = path.join(
      __dirname,
      "../../uploads",
      resource.fileName
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }


  resources = resources.filter((r) => r.id !== id);
  saveAllResources(resources);

  res.json({ message: "Resource deleted successfully" });
}

module.exports = {
  getResources,
  addResource,
  updateResource,
  deleteResource,
};
