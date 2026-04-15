import React, { useState } from 'react';
import axios from 'axios';

const CreateStartup = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/startup/create',
        {
          name,
          owner: userId
        }
      );

      setMessage(res.data.message);
      setName('');

    } catch (err) {
      setMessage('Error creating startup ❌');
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
      <h2 style={{ textAlign: 'center' }}>🚀 Create Startup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Startup Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px'
          }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#198754',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Save Startup
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        {message}
      </p>
    </div>
  );
};

export default CreateStartup;
