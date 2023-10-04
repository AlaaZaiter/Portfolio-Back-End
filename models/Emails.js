const mongoose = require('mongoose');

const emailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Email = mongoose.model('Email', emailsSchema);

module.exports = Email ;
