const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  keyword: String,

});
const Blog = model('User', UserSchema);

module.exports = Blog;

const createShantUser = async () => {
    try {
      const existingUser = await User.findOne({ username: 'Shant' });
  
      if (existingUser) {
        console.log('User "Shant" already exists.');
        return;
      }

      const newUser = new User({
        username: 'Shant',
        password: 'Shant123', 
      });
  
      await newUser.save();
      console.log('User "Shant" created successfully.');
    } catch (error) {
      console.error('Error creating user:', error);
    } }; createShantUser();