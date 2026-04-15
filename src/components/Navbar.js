import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const isLoggedIn = localStorage.getItem('token');
  

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav style={{
      backgroundColor: '#0d6efd',
      padding: '10px 20px',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0 }}>Nexus</h2>

      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>
              Register
            </Link>
            <Link to="/create-meeting" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>
      Create Meeting
    </Link>
    <Link to="/payment" style={{ color: '#fff' , marginRight: '15px' , textDecoration: 'none' }}> Payment</Link>
<Link to="/documents" style={{ color: '#fff', marginRight: '15px' , textDecoration: 'none'}}> Documents</Link>

    
            
          </>
        ) : (
          <>
            <span style={{ marginRight: '15px' }}>
              {localStorage.getItem('userName')}
            </span>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#fff',
                color: '#0d6efd',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
