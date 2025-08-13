// src/pages/Login.js
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase'; // Make sure this is correctly configured
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const role = userSnap.data().role;

        if (role === 'admin') {
          alert('Welcome Admin! 🚀');
          navigate('/admin-dashboard');
        } else if (role === 'trainee') {
          alert('Welcome Trainee! 🎥');
          navigate('/dashboard');
        } else {
          setErrorMsg('Unknown role. Please contact support.');
        }
      } else {
        setErrorMsg('User profile not found.');
      }
    } catch (error) {
      setErrorMsg('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <img src="/logo.png" alt="KSP Rwanda Logo" className="logo" />
      <h1>Login</h1>
      <p className="tagline">Empowering Excellence in Camera Operation</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </div>
  );
}

export default Login;
