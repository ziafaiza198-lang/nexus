import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const userId = localStorage.getItem('userId');

  const handlePayment = async (e) => {
    e.preventDefault();

    console.log("USER ID:", userId);
    console.log("AMOUNT:", amount);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/payment/pay',
        {
          userId,
          amount
        }
      );

      setMessage(res.data.message);
      setAmount('');

    } catch (err) {
      setMessage('Payment failed ❌');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px'
    }}>
      <h2 style={{ textAlign: 'center' }}>💳 Payment</h2>

      <form onSubmit={handlePayment}>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0d6efd',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Pay Now 💳
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        {message}
      </p>
    </div>
  );
};

export default Payment;
