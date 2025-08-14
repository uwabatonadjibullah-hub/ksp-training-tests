import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Module() {
  const { id } = useParams();
  const [module, setModule] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      const docRef = doc(db, 'modules', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setModule(docSnap.data());
      }
    };
    fetchModule();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'done': return 'green';
      case 'missed': return 'red';
      case 'scheduled': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <div className="module-details">
      {module ? (
        <>
          <h2>{module.title}</h2>
          <p>{module.description}</p>
          {module.imageUrl && <img src={module.imageUrl} alt="Module" />}
          
          <h3>📄 Handouts</h3>
          <ul>
            {module.handouts?.map((h, i) => (
              <li key={i}><a href={h.url} target="_blank" rel="noreferrer">{h.name}</a></li>
            ))}
          </ul>

          <h3>📝 Quizzes</h3>
          <ul>
            {module.quizzes?.map((q, i) => (
              <li key={i} style={{ color: getStatusColor(q.status) }}>
                {q.title} — {q.status}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading module...</p>
      )}
    </div>
  );
}