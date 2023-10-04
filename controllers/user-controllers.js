const User = require('../models/User');

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      return;
    }
    if (password === user.password) {
      res.status(200).json({ success: true, message: 'Admin login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  adminLogin,
};
