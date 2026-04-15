const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// =======================
// REGISTER API
// =======================
router.post(
  '/register',
  // Validation rules
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').notEmpty().withMessage('Role is required'),

  async (req, res) => {
    // Check validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, role } = req.body;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user
      const newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();

      // Remove password before sending response
      const userData = newUser.toObject();
      delete userData.password;

      res.json({
        message: 'User Registered Successfully ✅',
        user: userData
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// =======================
// LOGIN API
// =======================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found ❌' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password ❌' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token valid for 1 day
    );

    // Remove password before sending response
    const userData = user.toObject();
    delete userData.password;

    res.json({
      message: 'Login Successful ✅',
      token,
      user: userData
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
