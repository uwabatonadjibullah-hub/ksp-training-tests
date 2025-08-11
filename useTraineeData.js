// useTraineeData.js
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

export function useTraineeData() {
  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getDocs(collection(db, 'trainees'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrainees(data);
    }
    fetchData();
  }, []);

  return trainees;
}