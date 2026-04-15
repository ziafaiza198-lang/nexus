const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    default: 'Draft'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Startup', startupSchema);
