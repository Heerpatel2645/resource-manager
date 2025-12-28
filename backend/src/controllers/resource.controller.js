const { getAllResources, saveAllResources } = require("../services/resource.service");
const { v4: uuid } = require("uuid");

function getResources(req, res) {
  const resources = getAllResources();
  res.status(200).json(resources);
}

function addResource(req, res) {
  const { title, description, type } = req.body;

  if (!title || !description || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const resources = getAllResources();

  const newResource = {
    id: uuid(),
    title,
    description,
    type,
  };

  resources.push(newResource);
  saveAllResources(resources);

  res.status(201).json(newResource);
}

function updateResource(req, res) {
  const { id } = req.params;
  const { title, description, type } = req.body;

  const resources = getAllResources();
  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  resource.title = title;
  resource.description = description;
  resource.type = type;

  saveAllResources(resources);
  res.json(resource);
}

function deleteResource(req, res) {
  const { id } = req.params;
  let resources = getAllResources();

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
