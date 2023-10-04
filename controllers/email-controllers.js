const Email = require('../models/Emails');

const getAllEmails = async (req, res) => {
  try {
    const data = await Email.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

const addEmail = async (req, res) => {
  try {
    const email = new Email({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    const savedEmail = await email.save();
    
    res.status(200).json({
      code: 200,
      message: 'Email added successfully',
      data: savedEmail
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: 'Email not added successfully',
      error: error.message
    });
  }
};
  
const getEmailByName = async (req, res) => {
  try {
    const name = req.params.name;
    const emails = await Email.find({ name: name });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  module.exports = {
    getAllEmails,
    addEmail,
    getEmailByName
  };
  
  
