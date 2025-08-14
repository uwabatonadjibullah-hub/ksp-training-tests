import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import './admin-home.css';

export default function AdminHome() {
  const [adminName, setAdminName] = useState('');
  const [stats, setStats] = useState({ trainees: 0, quizzes: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    const fetchRoleAndStats = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.exists() ? userDoc.data().role : null;

        if (role !== 'admin') {
          navigate('/unauthorized');
          return;
        }

        setAdminName(user.displayName || user.email || 'Admin');

        const traineesSnap = await getDocs(collection(db, 'trainees'));
        const quizzesSnap = await getDocs(collection(db, 'quizzes'));

        setStats({
          trainees: traineesSnap.size,
          quizzes: quizzesSnap.size,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching role or stats:', error);
        navigate('/error');
      }
    };

    fetchRoleAndStats();
  }, [navigate]);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  if (loading) {
    return <div className="admin-home-loading">Loading admin dashboard...</div>;
  }

  return (
    <motion.div
      className="admin-home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <header className="admin-header">
        <img src="/logo.png" alt="KSP Logo" className="admin-logo" />
        <h1>{greeting}, {adminName} 🎬</h1>
        <p className="admin-subtitle">Your control room is live. Let’s inspire, create, and lead.</p>
      </header>

      <section className="admin-stats">
        <motion.div className="stat-card" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
          <span>👥</span>
          <h2>{stats.trainees}</h2>
          <p>Trainees Enrolled</p>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
          <span>🧠</span>
          <h2>{stats.quizzes}</h2>
          <p>Quizzes Created</p>
        </motion.div>
      </section>

      <section className="admin-actions">
        <h2 className="section-title">Management Tools</h2>
        <motion.div className="action-card" whileHover={{ scale: 1.05 }} onClick={() => navigate('/admin-dashboard')}>
          <span>📊</span>
          <h2>Dashboard</h2>
          <p>Monitor activity and performance</p>
        </motion.div>
        <motion.div className="action-card" whileHover={{ scale: 1.05 }} onClick={() => navigate('/module-manager')}>
          <span>📁</span>
          <h2>Module Manager</h2>
          <p>Organize and update learning modules</p>
        </motion.div>
        <motion.div className="action-card" whileHover={{ scale: 1.05 }} onClick={() => navigate('/charts')}>
          <span>📈</span>
          <h2>Charts</h2>
          <p>Visualize performance trends</p>
        </motion.div>

        <h2 className="section-title">Engagement Tools</h2>
        <motion.div className="action-card" whileHover={{ scale: 1.05 }} onClick={() => navigate('/create-quiz')}>
          <span>📝</span>
          <h2>Create Quiz</h2>
          <p>Design and publish assessments</p>
        </motion.div>
        <motion.div className="action-card" whileHover={{ scale: 1.05 }} onClick={() => navigate('/results')}>
          <span>📊</span>
          <h2>Results</h2>
          <p>Review trainee progress</p>
        </motion.div>
      </section>

      <footer className="admin-footer">
        <p>“Education is not the filling of a pail, but the lighting of a fire.”</p>
        <small>— W.B. Yeats</small>
      </footer>
    </motion.div>
  );
}