import React, { useState } from 'react';
import { registerUser } from '../services/auth';
import Footer from '../components/Footer';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.errors?.[0]?.msg || 'Error occurred');
    }
  };

  return (
    <>
     
      <div style={{
        marginTop: '80px',  // navbar ke neeche thoda space
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#0d6efd' }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            <option value="">Select Role</option>
            <option value="investor">Investor</option>
            <option value="entrepreneur">Entrepreneur</option>
          </select>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0d6efd',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Register
          </button>
        </form>
        {message && (
          <p style={{ textAlign: 'center', marginTop: '15px', color: message.includes('Successfully') ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Register;
