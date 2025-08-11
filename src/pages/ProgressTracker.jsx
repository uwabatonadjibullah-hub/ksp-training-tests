import React, { useEffect, useState } from 'react';
import { getProgressData } from '../services/progressService';
import '../styles/progress.css';

const ProgressTracker = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getProgressData(user.uid).then(setHistory);
  }, [user]);

  return (
    <div className="progress-container">
      <h2>📈 Your Progress</h2>
      {history.length === 0 ? (
        <p>No quizzes completed yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Quiz Title</th>
              <th>Score</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, i) => (
              <tr key={i}>
                <td>{entry.title}</td>
                <td>{entry.score}/{entry.total}</td>
                <td>{entry.feedback}</td>
                <td>{new Date(entry.submittedAt.seconds * 1000).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProgressTracker;