const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET;
      if (!secret || !secret.trim()) {
        console.error('FATAL SECURITY ERROR: JWT_SECRET is not configured on the server');
        return res.status(500).json({ message: 'Internal server security configuration error' });
      }

      const decoded = jwt.verify(token, secret.trim());

      req.admin = await Admin.findById(decoded.id).select('-password');
      if (!req.admin) {
        return res.status(401).json({ message: 'Not authorized as admin' });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protectAdmin };
