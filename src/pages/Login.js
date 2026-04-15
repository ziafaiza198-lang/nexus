import React, { useState } from 'react';
import { loginUser } from '../services/auth';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      console.log("LOGIN RESPONSE:", res.data); // 🔥 debug

      // ✅ IMPORTANT FIX (handle both id & _id)
      const user = res.data.user;
      console.log(res.data);


      const userId = user._id || user.id; // 🔥 main fix

      if (!userId) {
        return setMessage('User ID not found ❌');
      }

      // ✅ Save data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userId', res.data.user._id);
      localStorage.setItem('role', user.role);

      setMessage('Login Successful ✅');

      // ✅ Redirect
     const redirectPath = localStorage.getItem('redirectAfterLogin');

if (redirectPath) {
  localStorage.removeItem('redirectAfterLogin');
  window.location.href = redirectPath;
} else {
  if(res.data.user.role === 'entrepreneur'){
    window.location.href = '/dashboard/entrepreneur';
  } else {
    window.location.href = '/dashboard/investor';
  }
}


    } catch (err) {
      console.log(err.response); // debug
      setMessage(err.response?.data?.message || 'Error occurred ❌');
    }
  };

  return (
    <div style={{
      marginTop: '50px',
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0d6efd',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Login
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '10px', color: 'red' }}>
        {message}
      </p>
    </div>
  );
};

export default Login;
