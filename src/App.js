import logo1 from './logo.png';         // Main logo
import logo2 from './ksp-logo.jpg';     // Alternate logo
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login.jsx';
import Signup from './pages/signup.js';
import TakeQuiz from './pages/take-quiz.jsx';
import Results from './pages/results.js';
import Dashboard from './pages/dashboard.jsx';
import AdminDashboard from './pages/admin-dashboard/admin-dashboard.js';
import CreateQuiz from './pages/admin-dashboard/create-quiz.js';
import UseTraineeData from './pages/admin-dashboard/useTraineeData.js';
import Home from './pages/Home';

import './App.css';

const useLogo = true; // Toggle this to switch logos

function App() {
  const logo = useLogo ? logo1 : logo2;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1>Welcome to KSP Camera Training 📸</h1>
              <p>This platform will guide you through every step of your camera journey.</p>
              <header className="App-header filmmaking-video">
                <img src={logo} className="App-logo" alt="KSP Logo" />
                <p>Edit <code>Welcome</code> to the home of skills</p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  welcome home
                </a>
              </header>
              <div className="auth-buttons">
                <button onClick={() => window.location.href = '/login'}>Log In</button>
                <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/take-quiz" element={<TakeQuiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/trainee-data" element={<UseTraineeData />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;