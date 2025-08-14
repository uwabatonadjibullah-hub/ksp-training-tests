import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import './modules.css';

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [traineeName, setTraineeName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    const fetchModulesAndRole = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      if (role !== 'trainee') {
        navigate('/unauthorized');
        return;
      }

      setTraineeName(user.displayName || user.email || 'Trainee');

      const modulesSnap = await getDocs(collection(db, 'modules'));
      const modulesData = modulesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setModules(modulesData);
    };

    fetchModulesAndRole();
  }, [navigate]);

  return (
    <motion.div
      className="modules-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <header className="modules-header">
        <h1>Welcome, {traineeName} 📚</h1>
        <p>Choose a module and dive into your learning journey.</p>
      </header>

      <section className="modules-grid">
        {modules.map(module => (
          <motion.div
            key={module.id}
            className="module-card"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/module/${module.id}`)}
          >
            {module.imageUrl && <img src={module.imageUrl} alt={module.title} className="module-image" />}
            <h2>{module.title}</h2>
            <p>{module.description}</p>
          </motion.div>
        ))}
      </section>

      <footer className="modules-footer">
        <p>“Learning never exhausts the mind.” — Leonardo da Vinci</p>
      </footer>
    </motion.div>
  );
}