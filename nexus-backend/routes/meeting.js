const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

// =======================
// CREATE MEETING
// =======================
router.post('/create', async (req, res) => {
  try {
    const { investorId, entrepreneurId, date, time } = req.body;

    const conflict = await Meeting.findOne({
      investorId,
      date,
      time
    });

    if (conflict) {
      return res.status(400).json({
        message: 'Time slot already booked ❌'
      });
    }

    const meeting = new Meeting({
      investorId,
      entrepreneurId,
      date,
      time
    });

    await meeting.save();

    res.status(200).json({
      message: 'Meeting created successfully ✅',
      meeting
    });

  } catch (err) {
    res.status(500).json({
      message: 'Error creating meeting ❌'
    });
  }
});


// =======================
// GET ALL MEETINGS
// =======================
router.get('/all', async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate('investorId', 'name')
      .populate('entrepreneurId', 'name');

    res.json(meetings);

  } catch (err) {
    res.status(500).json({ message: 'Error ❌' });
  }
});


// =======================
// UPDATE STATUS + LINK 🔥
// =======================
router.put('/status/:id', async (req, res) => {
  try {
    const { status } = req.body;

    let updateData = { status };

    // ✅ Generate meeting link when accepted
   if (status === 'accepted') {
  const randomId = Math.random().toString(36).substring(7);
 updateData.meetingLink = "https://meet.jit.si/NexusMeeting123";
   }
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: 'Updated ✅', meeting });

  } catch (err) {
    res.status(500).json({ message: 'Error ❌' });
  }
});


// =======================
// DELETE MEETING
// =======================
router.delete('/:id', async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted 🗑️' });
  } catch (err) {
    res.status(500).json({ message: 'Error ❌' });
  }
});

module.exports = router;
