import React, { useEffect, useState } from 'react';
import axios from 'axios';

const role = localStorage.getItem('role');
const Meetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/meeting/all');
      setMeetings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Update meeting status (Accept/Reject)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/meeting/status/${id}`, { status });
      fetchMeetings(); // Refresh list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2 style={{ textAlign: 'center', color: '#0d6efd' }}>📅 My Meetings</h2>

      {meetings.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No meetings found</p>
      ) : (
        meetings.map((m) => (
          <div
            key={m._id}
            style={{
              border: '1px solid #ddd',
              padding: '20px',
              margin: '15px auto',
              maxWidth: '500px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
          >
            <p><b>Date:</b> {m.date}</p>
            <p><b>Time:</b> {m.time}</p>

            {/* Populate names */}
            <p><b>Investor:</b> {m.investorId?.name || 'N/A'}</p>
            <p><b>Entrepreneur:</b> {m.entrepreneurId?.name || 'N/A'}</p>

            {/* STATUS */}
            <p>
              <b>Status:</b>
              <span
                style={{
                  marginLeft: '5px',
                  color:
                    m.status === 'accepted' ? 'green' :
                    m.status === 'rejected' ? 'red' : 'orange'
                }}
              >
                {m.status || 'pending'}
              </span>
            </p>

            {/* Accept / Reject buttons */}
           {role === 'investor' && m.status === 'pending' && (
  <div>
    <button
      onClick={() => updateStatus(m._id, 'accepted')}
      style={{
        backgroundColor: 'green',
        color: '#fff',
        padding: '8px',
        marginRight: '10px',
        border: 'none',
        borderRadius: '5px'
      }}
    >
      Accept
    </button>

    <button
      onClick={() => updateStatus(m._id, 'rejected')}
      style={{
        backgroundColor: 'red',
        color: '#fff',
        padding: '8px',
        border: 'none',
        borderRadius: '5px'
      }}
    >
      Reject
    </button>
  </div>
)}


            {/* Join Meeting */}
            {m.status === 'accepted' && m.meetingLink && (
              <a href={m.meetingLink} target="_blank" rel="noreferrer">
                <button
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#0d6efd',
                    color: '#fff',
                    padding: '8px',
                    border: 'none',
                    borderRadius: '5px'
                  }}
                >
                  Join Meeting 🎥
                </button>
              </a>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default Meetings;
