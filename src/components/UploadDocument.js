import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadDocument = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedFor, setUploadedFor] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const targetRole = role === 'entrepreneur' ? 'investor' : 'entrepreneur';
        const res = await axios.get(`http://localhost:5000/api/users?role=${targetRole}`);
        setUsers(res.data.users);
      } catch (err) {
        console.log('User fetch error:', err);
      }
    };
    fetchUsers();
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ DEBUG (VERY IMPORTANT)
    console.log('userId:', userId);
    console.log('uploadedFor:', uploadedFor);
    console.log('file:', file);

    if (!file || !uploadedFor || !title) {
      return setMessage('Please fill all fields ❌');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('uploadedFor', uploadedFor);
    formData.append('uploadedBy', userId);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/documents/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      console.log('Upload Response:', res.data);

      // ✅ FIX: always show message
      setMessage(res.data.message || 'Document uploaded successfully ✅');

      // ✅ reset form properly
      setTitle('');
      setFile(null);
      setUploadedFor('');

    } catch (err) {
      console.error('Upload Error:', err.response?.data || err.message);

      // ✅ FIX: show backend error if exists
      setMessage(
        err.response?.data?.message || 'Error uploading document ❌'
      );
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', color: '#0d6efd' }}>
        📂 Upload Document
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        <select
          value={uploadedFor}
          onChange={(e) => setUploadedFor(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => {
            console.log('Selected file:', e.target.files[0]);
            setFile(e.target.files[0]);
          }}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Upload Document
        </button>
      </form>

      {message && (
        <p
          style={{
            textAlign: 'center',
            marginTop: '10px',
            color: message.includes('❌') ? 'red' : 'green'
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

// styles same
const containerStyle = {
  maxWidth: '500px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '10px'
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

export default UploadDocument;
