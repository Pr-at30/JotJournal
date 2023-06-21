const jwtverify = require('jsonwebtoken').verify;

const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwtverify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    req.user = user;
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
}

module.exports = auth;