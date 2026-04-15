import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentsList = () => {
  const [docs, setDocs] = useState([]);

  const userId = localStorage.getItem('userId');

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
            <p><b>Uploaded By:</b> {doc.uploadedBy?.name}</p>
            <p><b>Status:</b> {doc.status}</p>

            <a href={`http://localhost:5000/${doc.fileUrl}`} target="_blank" rel="noreferrer">
              <button>Download</button>
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default DocumentsList;
