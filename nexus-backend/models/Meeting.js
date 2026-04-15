const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({

  investorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  entrepreneurId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  date: { 
    type: String, 
    required: true 
  },

  time: { 
    type: String, 
    required: true 
  },

  // ✅ Status
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },

  // ✅ Meeting link
  meetingLink: {
    type: String,
    default: ''
  }

}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);
