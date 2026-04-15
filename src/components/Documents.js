import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Documents = () => {
  const [docs, setDocs] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/document/all/${userId}`);
      setDocs(res.data);
    } catch (err) { console.log(err); }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/document/status/${id}`, { status });
      fetchDocs();
    } catch (err) { console.log(err); }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2 style={{ textAlign: 'center', color: '#0d6efd' }}>📄 Documents</h2>
      {docs.length === 0 ? <p style={{ textAlign: 'center' }}>No documents found</p> : (
        docs.map(d => (
          <div key={d._id} style={{ border: '1px solid #ddd', padding: '15px', margin: '15px auto', maxWidth: '500px', borderRadius: '10px' }}>
            <p><b>Title:</b> {d.title}</p>
            <p><b>Uploaded By:</b> {d.uploadedBy?.name}</p>
            <p><b>Status:</b> {d.status}</p>
            <a href={`http://localhost:5000/${d.fileUrl}`} target="_blank" rel="noreferrer">View / Download</a>
            {d.status === 'pending' && (
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => updateStatus(d._id, 'approved')} style={approveBtn}>Approve ✅</button>
                <button onClick={() => updateStatus(d._id, 'rejected')} style={rejectBtn}>Reject ❌</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const approveBtn = { backgroundColor: 'green', color: '#fff', padding: '8px', marginRight: '10px', border: 'none', borderRadius: '5px' };
const rejectBtn = { backgroundColor: 'red', color: '#fff', padding: '8px', border: 'none', borderRadius: '5px' };

export default Documents;
