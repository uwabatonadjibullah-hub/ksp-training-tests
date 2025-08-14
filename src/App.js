import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import logo1 from './logo.png';
import logo2 from './ksp-logo.jpg';

// Auth & Core Pages
import Welcome from './pages/welcome.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import TakeQuiz from './pages/take-quiz.jsx';

// Admin Pages
import AdminHome from './pages/admin-home.js';
import AdminDashboard from './pages/Admin-dashboard.js';
import Results from './pages/results.js';
import Charts from './pages/Charts.jsx';
import ModuleManager from './pages/ModuleManager.js';
import PerformanceCharts from './pages/PerformanceCharts.jsx';

// Trainee Pages
import TraineeHome from './pages/TraineeHome.jsx';
import TraineeDashboard from './pages/TraineeDashboard.jsx';
import TraineeModuleManager from './pages/TraineeModuleManager.jsx';
import UpcomingQuizzes from './pages/UpcomingQuizzes.jsx';
import Profile from './pages/Profile.jsx';

// Module Pages
import Module from './pages/Module';
import AddHandouts from './pages/AddHandouts';
import CreateQuiz from './pages/CreateQuiz';

// Utilities
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const useLogo = true;
function App() {
  const logo = useLogo ? logo1 : logo2;

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
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

        {/* Core Pages */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/take-quiz" element={<ProtectedRoute><TakeQuiz /></ProtectedRoute>} />

        {/* Admin Pages */}
        <Route path="/admin-home" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/charts" element={<ProtectedRoute><Charts /></ProtectedRoute>} />
        <Route path="/module-manager" element={<ProtectedRoute><ModuleManager /></ProtectedRoute>} />
        <Route path="/performance-charts" element={<ProtectedRoute><PerformanceCharts /></ProtectedRoute>} />

        {/* Trainee Pages */}
        <Route path="/trainee-home" element={<ProtectedRoute><TraineeHome /></ProtectedRoute>} />
        <Route path="/trainee-dashboard" element={<ProtectedRoute><TraineeDashboard /></ProtectedRoute>} />
        <Route path="/modules" element={<ProtectedRoute><TraineeModuleManager /></ProtectedRoute>} />
        <Route path="/upcoming-quizzes" element={<ProtectedRoute><UpcomingQuizzes /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Module Pages */}
        <Route path="/module/:id" element={<ProtectedRoute><Module /></ProtectedRoute>} />
        <Route path="/add-handout/:id" element={<ProtectedRoute><AddHandouts /></ProtectedRoute>} />
        <Route path="/create-quiz/:id" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;