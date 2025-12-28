const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/resources.json");

function getAllResources() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function saveAllResources(resources) {
  fs.writeFileSync(filePath, JSON.stringify(resources, null, 2));
}

module.exports = {
  getAllResources,
  saveAllResources,
};
