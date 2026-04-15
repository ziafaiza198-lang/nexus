import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardInvestor = () => {
  const [user, setUser] = useState(null);
  const [meetingsCount, setMeetingsCount] = useState(0);
  const [documentsCount, setDocumentsCount] = useState(0);
  const [pendingDocs, setPendingDocs] = useState(0);
  const [payments, setPayments] = useState([]); // ✅ NEW

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const userData = {
        id: payload.id,
        role: 'investor',
        name: userName || 'User'
      };

      setUser(userData);

      fetchMeetings(userData.id);
      fetchDocuments(userData.id);
      fetchPayments(userData.id); // ✅ NEW
    }
  }, []);

  const fetchMeetings = async (userId) => {
    const res = await axios.get('http://localhost:5000/api/meeting/all');
    const myMeetings = res.data.filter(m => m.investorId?._id === userId);
    setMeetingsCount(myMeetings.length);
  };

  const fetchDocuments = async (userId) => {
    const res = await axios.get(`http://localhost:5000/api/documents/all/${userId}`);
    setDocumentsCount(res.data.length);

    const pending = res.data.filter(d => d.status === 'pending');
    setPendingDocs(pending.length);
  };

  // ✅ NEW FUNCTION
  const fetchPayments = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payment/user/${userId}`);
      setPayments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '50px', maxWidth: '1000px', margin: '50px auto' }}>
      
      <div style={titleStyle('#0d6efd')}>
        Investor Dashboard
      </div>

      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Welcome, {user.name} 👋
      </h1>

      <div style={gridStyle}>

        {/* Investments */}
        <div 
          onClick={() => window.location.href='/payment'}
          style={{ ...cardStyle('#e7f1ff'), cursor: 'pointer' }}
        >
          <h3>Investments</h3>
          <p>Total Payments: {payments.length}</p> {/* ✅ UPDATED */}
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
          onClick={() => window.location.href='/documents-list'}
          style={{ ...cardStyle('#d1e7dd'), cursor: 'pointer' }}
        >
          <h3>Documents</h3>
          <p>Uploaded: {documentsCount}</p>
          <p>Pending Approval: {pendingDocs}</p>
        </div>

      </div>

      {/* ✅ PAYMENT HISTORY UI */}
      <h3 style={{ marginTop: '40px' }}>💳 Payment History</h3>

      {payments.length === 0 ? (
        <p>No payments yet</p>
      ) : (
        payments.map(p => (
          <div key={p._id} style={{
            border: '1px solid #ddd',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px'
          }}>
            <p><b>Amount:</b> ${p.amount}</p>
            <p><b>Status:</b> {p.status}</p>
            <p><b>Date:</b> {new Date(p.date).toLocaleString()}</p>
          </div>
        ))
      )}

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

export default DashboardInvestor;
