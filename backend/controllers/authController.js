const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign(
    { id, role: 'admin' },
    process.env.JWT_SECRET || 'yr_elearning_secret_jwt_key_2026_xyz',
    { expiresIn: '30d' }
  );
};

// @desc   Admin login
// @route  POST /api/auth/login
// @access Public
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find admin by email (case-insensitive)
    let admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    // Fallback: If no admin in database yet and matching default .env credentials, create it!
    const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@yrelearning.com').toLowerCase().trim();
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!admin && email.toLowerCase().trim() === defaultEmail) {
      if (password === defaultPassword) {
        admin = await Admin.create({
          name: 'Super Admin',
          email: defaultEmail,
          password: defaultPassword,
          role: 'admin',
        });
      }
    }

    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token,
      _id: admin._id,
      role: 'admin',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// @desc   Get current logged in admin
// @route  GET /api/auth/me
// @access Private (Admin)
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    return res.status(200).json({ success: true, admin });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  adminLogin,
  getAdminProfile,
};
