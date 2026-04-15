const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// ✅ Payment API
router.post('/pay', async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const payment = new Payment({
      userId,
      amount
    });

    await payment.save();

    res.json({ message: 'Payment Successful ✅' });

  } catch (err) {
    res.status(500).json({ message: 'Payment Failed ❌' });
  }
});
// ✅ Get payments of a user
router.get('/user/:userId', async (req, res) => {
  try {
    const payments = await Payment.find({
      userId: req.params.userId
    });

    res.json(payments);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments ❌' });
  }
});

module.exports = router;
