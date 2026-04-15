import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardEntrepreneur = () => {
  const [user, setUser] = useState(null);
  const [meetingsCount, setMeetingsCount] = useState(0);
  const [startup, setStartup] = useState(null); // ✅ NEW

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const userData = {
        id: payload.id,
        role: 'entrepreneur',
        name: userName || 'User'
      };

      setUser(userData);
      fetchMeetings(userData.id);
      fetchStartup(userData.id); // ✅ NEW CALL
    }
  }, []);

  // ✅ Fetch meetings
  const fetchMeetings = async (userId) => {
    try {
      const res = await axios.get('http://localhost:5000/api/meeting/all');

      const myMeetings = res.data.filter(
        m => m.entrepreneurId?._id === userId
      );

      setMeetingsCount(myMeetings.length);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Fetch startup
  const fetchStartup = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/startup/${userId}`);
      setStartup(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '50px', maxWidth: '1000px', margin: '50px auto' }}>
      
      <div style={titleStyle('#198754')}>
        Entrepreneur Dashboard
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Welcome, {user.name} 👋
      </h1>

      <div style={gridStyle}>

        {/* ✅ Startup (NOW DYNAMIC) */}
        <div style={cardStyle('#e7f1ff')}>
          <h3>My Startup</h3>

          <p>
            Startup Name: {startup?.name || 'Not Added'}
          </p>

          <p>
            Status: {startup?.status || 'Draft'}
          </p>

          {/* OPTIONAL BUTTON */}
          <button
            onClick={() => window.location.href='/create-startup'}
            style={{
              marginTop: '10px',
              padding: '8px',
              backgroundColor: '#198754',
              color: '#fff',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Create / Update Startup
          </button>
        </div>
        

        {/* Meetings */}
        <div 
          onClick={() => window.location.href='/meetings'}
          style={{ ...cardStyle('#fff3cd'), cursor: 'pointer' }}
        >
          <h3>Meetings</h3>
          <p>Scheduled: {meetingsCount}</p>
          <p>Upcoming: {meetingsCount}</p>
        </div>

        {/* Documents */}
        <div 
          onClick={() => window.location.href='/documents'}
          style={{ ...cardStyle('#d1e7dd'), cursor: 'pointer' }}
        >
          <h3>Documents</h3>
          <p>Upload & Manage</p>
        </div>

      </div>
    </div>
  );
};

// styles
const titleStyle = (color) => ({
  textAlign: 'center',
  marginBottom: '20px',
  fontWeight: 'bold',
  fontSize: '24px',
  color
});

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px'
};

const cardStyle = (bg) => ({
  backgroundColor: bg,
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
});

export default DashboardEntrepreneur;
