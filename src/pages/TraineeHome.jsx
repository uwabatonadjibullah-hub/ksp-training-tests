import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import './trainee-home.css';

export default function TraineeHome() {
  const [traineeName, setTraineeName] = useState('');
  const [quote, setQuote] = useState('');
  const navigate = useNavigate();

  const quotes = [
    "“Success is the sum of small efforts, repeated day in and day out.” — Robert Collier",
    "“The beautiful thing about learning is that no one can take it away from you.” — B.B. King",
    "“Believe you can and you're halfway there.” — Theodore Roosevelt",
    "“Education is the passport to the future, for tomorrow belongs to those who prepare for it today.” — Malcolm X",
    "“Your limitation—it’s only your imagination.” — Unknown",
    "“Push yourself, because no one else is going to do it for you.” — Unknown"
  ];

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    const fetchRole = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      if (role !== 'trainee') {
        navigate('/unauthorized');
        return;
      }

      setTraineeName(user.displayName || user.email || 'Trainee');
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    };

    fetchRole();
  }, [navigate]);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Rise and shine';
    if (hour < 18) return 'Keep pushing';
    return 'Reflect and recharge';
  })();

  return (
    <motion.div
      className="trainee-home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <header className="trainee-header">
        <img src="/logo.png" alt="KSP Logo" className="trainee-logo" />
        <h1>{greeting}, {traineeName} 🌟</h1>
        <p className="trainee-subtitle">Your journey begins here. Learn, grow, and shine.</p>
      </header>

      <section className="trainee-actions">
        <motion.div className="action-card" whileHover={{ scale: 1.05 }} onClick={() => navigate('/trainee-dashboard')}>
          <span>📈</span>
          <h2>Dashboard</h2>
          <p>Track your progress</p>
        </motion.div>
        <motion.div className="action-card" whileHover={{ scale: 1.05 }} onClick={() => navigate('/modules')}>
          <span>📚</span>
          <h2>Modules</h2>
          <p>Explore your learning path</p>
        </motion.div>
        <motion.div className="action-card" whileHover={{ scale: 1.05 }} onClick={() => navigate('/upcoming-quiz')}>
          <span>⏳</span>
          <h2>Upcoming Quiz</h2>
          <p>Prepare and stay ready</p>
        </motion.div>
        <motion.div className="action-card" whileHover={{ scale: 1.05 }} onClick={() => navigate('/profile')}>
          <span>👤</span>
          <h2>Profile</h2>
          <p>View and update your info</p>
        </motion.div>
      </section>

      <footer className="trainee-footer">
        <p>{quote}</p>
      </footer>
    </motion.div>
  );
}