const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectsSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Project = model("projects", projectsSchema);
module.exports = Project ;