const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure you have User model

// GET /api/users?role=investor|entrepreneur
router.get('/', async (req, res) => {
  try {
    const role = req.query.role;
    const users = await User.find({ role }).select('_id name email');
    res.json({ users });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users ❌' });
  }
});

module.exports = router;
