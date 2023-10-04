const Project = require("../models/Projects");

const getAllProject = async (req, res) => {
  try {
    const data = await Project.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getProjectByTitle = async (req, res) => {
  try {
    const projects = await Project.findById(req.params.title);
    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: projects,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "unable to get project by ID",
      error: error,
    });
  }
};

const addProject = async (req, res) => {
  try {
    const projects = await Project.create(req.body);
    res.status(200).json({
      success: true,
      message: "Project added successfully",
      data: projects,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Project not added successfully",
      error: error,
    });
  }
};


const updateProjectByTitle = async (req, res) => {
  try {
    const { title } = req.params; 
    const updatedProjectData = req.body; 

    // Find and update the project
    const updatedProject = await Project.findOneAndUpdate(
      { title },
      { $set: updatedProjectData }, // Use $set to update specific fields
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: updatedProject,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update project",
      error: error.message, 
    });
  }
};


const deleteProject = async (req, res) => {
  try {
    const projects = await Project.deleteOne({ title: req.params.title });
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      projets: projects,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occured while deleting the project",
      error: error,
    });
  }
};


module.exports = {
  getAllProject,
  getProjectByTitle,
  addProject,
  updateProjectByTitle,
  deleteProject,
};