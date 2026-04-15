const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');

// ✅ Create startup
router.post('/create', async (req, res) => {
  try {
    const { name, owner } = req.body;

    const startup = new Startup({ name, owner });
    await startup.save();

    res.json({ message: 'Startup created ✅', startup });
  } catch (err) {
    res.status(500).json({ message: 'Error ❌' });
  }
});

// ✅ Get startup by user
router.get('/:userId', async (req, res) => {
  try {
    const startup = await Startup.findOne({ owner: req.params.userId });
    res.json(startup);
  } catch (err) {
    res.status(500).json({ message: 'Error ❌' });
  }
});

module.exports = router;
