const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose'); 
const Document = require('../models/Document');

// ✅ Create uploads folder if not exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });


// =======================
// ✅ Upload route
// =======================
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file received ❌' });
    }

    const { title, uploadedFor, uploadedBy } = req.body;

    if (!title || !uploadedFor || !uploadedBy) {
      return res.status(400).json({ message: 'Missing fields ❌' });
    }

    const doc = new Document({
      title,
      fileUrl: req.file.path,
      uploadedBy,
      uploadedFor,
      status: 'pending' // ✅ ADD THIS
    });

    await doc.save();

    res.status(200).json({
      message: 'Document uploaded successfully ✅',
      doc
    });

  } catch (err) {
    console.error('UPLOAD ERROR:', err);
    res.status(500).json({
      message: 'Error uploading document ❌'
    });
  }
});


// =======================
// ✅ Get All Documents
// =======================
router.get('/all/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId ❌' });
    }

    const docs = await Document.find({
      uploadedFor: userId
    }).populate('uploadedBy', 'name'); // ✅ ADD THIS

    res.status(200).json(docs);

  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({
      message: 'Error fetching documents ❌'
    });
  }
});


// =======================
// ✅ Approve / Reject Document
// =======================
router.put('/status/:id', async (req, res) => {
  try {
    const { status } = req.body; // approved / rejected

    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: 'Status updated ✅',
      doc
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error updating status ❌'
    });
  }
});

module.exports = router;
