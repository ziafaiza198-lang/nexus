const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();

// ✅ Create uploads folder if not exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('✅ uploads folder created');
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch(err => console.log(err));

// Test route
app.get('/', (req, res) => {
  res.send('Nexus Backend Running 🚀');
});

// Routes
const authRoutes = require('./routes/auth');
const meetingRoutes = require('./routes/meeting');
const userRoutes = require('./routes/user');
const paymentRoutes = require('./routes/payment');
const documentRoutes = require('./routes/documents');

app.use('/api', authRoutes);
app.use('/api/meeting', meetingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/documents', documentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

const startupRoutes = require('./routes/startup');
app.use('/api/startup', startupRoutes);