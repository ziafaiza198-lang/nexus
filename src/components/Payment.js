import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const [form, setForm] = useState({ receiverId: '', amount: '' });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  const payerId = localStorage.getItem('userId'); // Logged-in user

  // Fetch opposite users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const role = localStorage.getItem('role');
        const targetRole = role === 'investor' ? 'entrepreneur' : 'investor';
        const res = await axios.get(`http://localhost:5000/api/users?role=${targetRole}`);
        setUsers(res.data.users);
      } catch (err) { console.error(err); }
    };
    fetchUsers();
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payment/user/${payerId}`);
      setPayments(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/payment/create', { ...form, payerId });
      setMessage(res.data.message);
      setForm({ receiverId: '', amount: '' });
      fetchPayments();
    } catch (err) {
      setMessage('Error ❌');
    }
  };

  return (
    <div style={container}>
      <h2 style={{ textAlign: 'center', color: '#0d6efd' }}>💳 Payments</h2>

      <form onSubmit={handleSubmit}>
        <select name="receiverId" value={form.receiverId} onChange={handleChange} required style={input}>
          <option value="">Select User</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>

        <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount ($)" required style={input} />

        <button type="submit" style={button}>Send Payment</button>
      </form>

      {message && <p style={{ textAlign: 'center', color: 'green' }}>{message}</p>}

      <h3 style={{ marginTop: '30px' }}>Payment History</h3>
      {payments.length === 0 ? <p>No payments yet</p> :
        payments.map(p => (
          <div key={p._id} style={card}>
            <p><b>Payer:</b> {p.payerId.name}</p>
            <p><b>Receiver:</b> {p.receiverId.name}</p>
            <p><b>Amount:</b> ${p.amount}</p>
            <p><b>Status:</b> {p.status}</p>
          </div>
        ))
      }
    </div>
  );
};

const container = { maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#fff' };
const input = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' };
const button = { width: '100%', padding: '12px', backgroundColor: '#0d6efd', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' };
const card = { border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' };

export default Payment;
