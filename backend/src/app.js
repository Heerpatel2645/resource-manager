const express = require("express");
const cors = require("cors");
const resourceRoutes = require("./routes/resource.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resources", resourceRoutes);

module.exports = app;
