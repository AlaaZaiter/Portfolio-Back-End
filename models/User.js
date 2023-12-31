const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  keyword: String,

});
const Blog = model('User', UserSchema);

module.exports = Blog;
