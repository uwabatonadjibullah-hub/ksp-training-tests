// TraineeTable.jsx
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

export default function TraineeTable() {
  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    async function fetchTrainees() {
      const snapshot = await getDocs(collection(db, 'trainees'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrainees(data);
    }
    fetchTrainees();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Email</th>
          <th>Progress</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {trainees.map(t => (
          <tr key={t.id}>
            <td><img src={t.profileUrl || 'default.jpg'} alt="profile" /></td>
            <td>{t.name}</td>
            <td>{t.email}</td>
            <td>{t.progress || '0%'}</td>
            <td>{t.score || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}