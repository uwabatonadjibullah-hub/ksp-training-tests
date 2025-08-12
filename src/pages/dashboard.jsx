// src/pages/TraineeDashboard.jsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './dashboard.css'; // Optional styling

function TraineeDashboard() {
  const [traineeName, setTraineeName] = useState('');
  const [history, setHistory] = useState([]);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('studentName');
    const storedHistory = JSON.parse(localStorage.getItem('traineeHistory')) || [];
    setTraineeName(storedName);

    const userHistory = storedHistory.filter(entry => entry.name === storedName);
    setHistory(userHistory);

    if (userHistory.length > 0) {
      const totalPercent = userHistory.reduce((sum, entry) => sum + entry.percentage, 0);
      setAverage(Math.round(totalPercent / userHistory.length));
    }

    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = '/login';
        return;
      }

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists() || userSnap.data().role !== 'trainee') {
        alert('Access denied.');
        window.location.href = '/login';
      }
    });
  }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <img src="/logo.png" alt="KSP Logo" className="logo" />
        <h2>KSP Trainee</h2>
        <nav>
          <ul>
            <li><a href="#">My Quizzes</a></li>
            <li><a href="#">Progress</a></li>
            <li><a href="#">Resources</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </nav>
      </aside>

      <main className="main-panel">
        <header>
          <h1>Welcome, {traineeName || 'Trainee'}</h1>
          <p className="quote">“Every frame tells a story—train to capture it.”</p>
        </header>

        <section id="content">
          {history.length === 0 ? (
            <p>No quiz attempts yet.</p>
          ) : (
            <>
              {history.map((entry, index) => (
                <div key={index} className="attempt">
                  <h3>Attempt {index + 1} ({entry.date})</h3>
                  <p>Score: {entry.score}/{entry.total}</p>
                  <p>Percentage: {entry.percentage}%</p>
                  <hr />
                </div>
              ))}
              <h2>Average Performance: {average}%</h2>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default TraineeDashboard;