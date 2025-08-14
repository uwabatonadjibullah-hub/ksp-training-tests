import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import AdminNav from '../components/Adminnav';
import { motion, AnimatePresence } from 'framer-motion'; // 🎞️ Animation
import { saveAs } from 'file-saver'; // 📤 CSV export

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const snapshot = await getDocs(collection(db, 'results'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResults(data);
      setLoading(false);
    };
    fetchResults();
  }, []);

  // 📤 CSV Export Logic
  const exportToCSV = () => {
    const headers = ['Trainee', 'Module', 'Quiz', 'Score', 'Status'];
    const rows = results.map(r => [
      r.traineeName,
      r.moduleTitle,
      r.quizTitle,
      `${r.score}%`,
      r.status,
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'class-performance.csv');
  };

  return (
    <div className="results-page">
      <AdminNav />
      <h2>📈 Class Performance</h2>
      <p>Here’s a snapshot of how trainees are progressing across modules and quizzes.</p>

      <button onClick={exportToCSV} className="export-btn">📤 Export CSV</button>

      {loading ? (
        <p>Loading results...</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>Trainee</th>
              <th>Module</th>
              <th>Quiz</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {results.map((r) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{r.traineeName}</td>
                  <td>{r.moduleTitle}</td>
                  <td>{r.quizTitle}</td>
                  <td>{r.score}%</td>
                  <td>{r.status}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      )}
    </div>
  );
}