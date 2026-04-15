import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentsList = () => {
  const [docs, setDocs] = useState([]);

  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role'); // ✅ check investor or entrepreneur

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/documents/all/${userId}`);
      setDocs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ UPDATE STATUS (Approve / Reject)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/documents/status/${id}`,
        { status }
      );
      fetchDocs(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>📄 My Documents</h2>

      {docs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No documents found</p>
      ) : (
        docs.map(doc => (
          <div key={doc._id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            margin: '15px auto',
            maxWidth: '500px',
            borderRadius: '10px'
          }}>

            <p><b>Title:</b> {doc.title}</p>

            <p>
              <b>Status:</b>
              <span style={{
                marginLeft: '5px',
                color:
                  doc.status === 'approved' ? 'green' :
                  doc.status === 'rejected' ? 'red' : 'orange'
              }}>
                {doc.status || 'pending'}
              </span>
            </p>

            {/* ✅ DOWNLOAD */}
            <a
              href={`http://localhost:5000/${doc.fileUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <button style={{ marginTop: '10px' }}>
                Download 📥
              </button>
            </a>

            {/* ✅ APPROVE / REJECT (ONLY INVESTOR) */}
            {role === 'investor' && doc.status === 'pending' && (
              <div style={{ marginTop: '10px' }}>
                
                <button
                  onClick={() => updateStatus(doc._id, 'approved')}
                  style={{
                    backgroundColor: 'green',
                    color: '#fff',
                    padding: '6px',
                    marginRight: '10px',
                    border: 'none',
                    borderRadius: '5px'
                  }}
                >
                  Approve ✅
                </button>

                <button
                  onClick={() => updateStatus(doc._id, 'rejected')}
                  style={{
                    backgroundColor: 'red',
                    color: '#fff',
                    padding: '6px',
                    border: 'none',
                    borderRadius: '5px'
                  }}
                >
                  Reject ❌
                </button>

              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default DocumentsList;
