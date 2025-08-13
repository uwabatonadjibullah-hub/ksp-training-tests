// src/pages/Welcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img src="/logo.png" alt="KSP Rwanda Logo" className="logo" />
        <h1>🎥 Welcome to KSP Camera Training</h1>
        <p className="tagline">“Every frame tells a story. Let’s train to capture it.”</p>
      </header>

      <section className="welcome-actions">
        <button onClick={() => navigate('/login')}>Log In</button>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </section>

      <footer className="welcome-footer">
        <p>Empowering excellence in camera operation across Rwanda.</p>
      </footer>
    </div>
  );
}

export default Welcome;