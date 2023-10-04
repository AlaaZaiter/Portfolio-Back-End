const express = require('express');
const router =express.Router();

const {
  getAllEmails,
  addEmail,
  getEmailByName
}= require('../controllers/email-controllers');

const {
  getAllProject,
  getProjectByTitle,
  addProject,
  updateProjectByTitle,
  deleteProject,
} = require("../controllers/project-controllers");
 

const{
  adminLogin
}=require("../controllers/user-controllers")
router.post('/users/login', adminLogin);

router.get('/getAllEmail', getAllEmails);
router.post('/addEmail', addEmail);
router.get('/getEmailByName/:name', getEmailByName);


router.get("/getAllProjects", getAllProject);
router.get("/getProjects/:title", getProjectByTitle);
router.post("/addProject", addProject);

router.delete("/deleteProject/:title", deleteProject);
router.put("/update/:title", updateProjectByTitle);


module.exports = router;