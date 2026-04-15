import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateMeeting = () => {
  const [form, setForm] = useState({
    investorId: '',
    entrepreneurId: '',
    date: '',
    time: ''
  });

  const [message, setMessage] = useState('');
  const [investors, setInvestors] = useState([]);
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  // 🔍 DEBUG (IMPORTANT)
  console.log("ROLE:", role);
  console.log("USER ID:", userId);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // ✅ ALWAYS fetch both (safe approach)
        const invRes = await axios.get('http://localhost:5000/api/users?role=investor');
        const entRes = await axios.get('http://localhost:5000/api/users?role=entrepreneur');

        setInvestors(invRes.data.users || []);
        setEntrepreneurs(entRes.data.users || []);

        // ✅ Auto set logged-in user ID
        if (role === 'investor') {
          setForm(prev => ({ ...prev, investorId: userId }));
        } else if (role === 'entrepreneur') {
          setForm(prev => ({ ...prev, entrepreneurId: userId }));
        }

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUsers();
  }, [role, userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Safety check
    if (!form.investorId || !form.entrepreneurId) {
      setMessage("Please select both users ❌");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/meeting/create', form);
      setMessage(res.data.message);

      setTimeout(() => {
        window.location.href = '/meetings';
      }, 1500);

    } catch (err) {
      console.error(err);
      setMessage('Error creating meeting ❌');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#0d6efd' }}>
        📅 Schedule Meeting
      </h2>

      <form onSubmit={handleSubmit}>

        {/* 🔥 ALWAYS SHOW BOTH DROPDOWNS */}
        
        {/* Investor */}
        <select
          name="investorId"
          value={form.investorId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Investor</option>
          {investors.map(inv => (
            <option key={inv._id} value={inv._id}>
              {inv.name}
            </option>
          ))}
        </select>

        {/* Entrepreneur */}
        <select
          name="entrepreneurId"
          value={form.entrepreneurId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Entrepreneur</option>
          {entrepreneurs.map(ent => (
            <option key={ent._id} value={ent._id}>
              {ent.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Create Meeting
        </button>
      </form>

      {message && (
        <p style={{
          textAlign: 'center',
          marginTop: '15px',
          color: message.includes('❌') ? 'red' : 'green'
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

const containerStyle = {
  marginTop: '50px',
  maxWidth: '450px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '30px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  backgroundColor: '#fff'
};

const inputStyle = {
  width: '100%',
  marginBottom: '15px',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#0d6efd',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default CreateMeeting;
