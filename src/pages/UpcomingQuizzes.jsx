import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import 'UpcomingQuizzes.css'; // optional styling

function UpcomingQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const traineeId = localStorage.getItem('userId');
  const now = new Date();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const q = query(
        collection(db, 'quizzes'),
        where('assignedTo', 'array-contains', traineeId)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        dateObj: new Date(doc.data().date)
      }));
      setQuizzes(data);
    };

    fetchQuizzes();
  }, [traineeId]);

  // Categorize and sort
  const available = quizzes
    .filter(q => q.status === 'scheduled' && q.dateObj <= now)
    .sort((a, b) => a.dateObj - b.dateObj);

  const upcoming = quizzes
    .filter(q => q.status === 'scheduled' && q.dateObj > now)
    .sort((a, b) => a.dateObj - b.dateObj);

  const done = quizzes
    .filter(q => q.status === 'done')
    .sort((a, b) => a.dateObj - b.dateObj);

  const missed = quizzes
    .filter(q => q.status === 'missed')
    .sort((a, b) => a.dateObj - b.dateObj);

  const renderQuizCard = (quiz, type) => (
    <li key={quiz.id} className={`quiz-card ${type}`}>
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <p><strong>Date:</strong> {quiz.dateObj.toLocaleString()}</p>

      {type === 'available' && (
        <button onClick={() => navigate(`/take-quiz?id=${quiz.id}`)}>
          🎯 Take Quiz
        </button>
      )}
      {type === 'done' && <span className="status-icon green">✅ Completed</span>}
      {type === 'upcoming' && <span className="status-icon yellow">🕒 Scheduled</span>}
      {type === 'missed' && <span className="status-icon red">❌ Missed</span>}
    </li>
  );

  return (
    <div className="upcoming-container">
      <h2>📅 Upcoming Quizzes</h2>

      {available.length > 0 && (
        <section>
          <h3>🚀 AVAILABLE QUIZ</h3>
          <ul className="quiz-list">
            {available.map(q => renderQuizCard(q, 'available'))}
          </ul>
        </section>
      )}

      {upcoming.length > 0 && (
        <section>
          <h3>🟨 YET TO BE DONE QUIZ</h3>
          <ul className="quiz-list">
            {upcoming.map(q => renderQuizCard(q, 'upcoming'))}
          </ul>
        </section>
      )}

      {missed.length > 0 && (
        <section>
          <h3>❌ MISSED QUIZZES</h3>
          <ul className="quiz-list">
            {missed.map(q => renderQuizCard(q, 'missed'))}
          </ul>
        </section>
      )}

      {done.length > 0 && (
        <section>
          <h3>✅ DONE QUIZ</h3>
          <ul className="quiz-list">
            {done.map(q => renderQuizCard(q, 'done'))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default UpcomingQuizzes;