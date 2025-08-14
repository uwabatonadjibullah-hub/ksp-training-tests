import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import './trainee-dashboard.css';

export default function TraineeDashboard() {
  const [traineeName, setTraineeName] = useState('');
  const [stats, setStats] = useState({ modulesCompleted: 0, quizzesTaken: 0, averageScore: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      if (role !== 'trainee') {
        navigate('/unauthorized');
        return;
      }

      setTraineeName(user.displayName || user.email || 'Trainee');

      // Replace with real Firestore queries later
      setStats({
        modulesCompleted: 5,
        quizzesTaken: 3,
        averageScore: 82,
      });
    };

    fetchData();
  }, [navigate]);

  return (
    <motion.div
      className="trainee-dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <header className="dashboard-header">
        <h1>Welcome back, {traineeName} 🚀</h1>
        <p>Your progress is your power. Keep going!</p>
      </header>

      <section className="dashboard-stats">
        <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
          <span>📚</span>
          <h2>{stats.modulesCompleted}</h2>
          <p>Modules Completed</p>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
          <span>📝</span>
          <h2>{stats.quizzesTaken}</h2>
          <p>Quizzes Taken</p>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
          <span>📊</span>
          <h2>{stats.averageScore}%</h2>
          <p>Average Score</p>
        </motion.div>
      </section>

      <section className="dashboard-actions">
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/modules')}>Go to Modules</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/upcoming-quiz')}>Upcoming Quiz</motion.button>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => navigate('/profile')}>View Profile</motion.button>
      </section>
    </motion.div>
  );
}