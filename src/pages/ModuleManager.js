import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

export default function ModuleManager() {
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState({ title: '', description: '' });

  useEffect(() => {
    const q = query(collection(db, 'modules'), orderBy('title'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mods = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModules(mods);
    });

    return () => unsubscribe();
  }, []);

  const handleAddModule = async () => {
    if (newModule.title.trim()) {
      await addDoc(collection(db, 'modules'), newModule);
      setNewModule({ title: '', description: '' });
    }
  };

  return (
    <div className="module-manager">
      <h2>Module Management</h2>

      <div className="module-form">
        <input
          type="text"
          placeholder="Module Title"
          value={newModule.title}
          onChange={(e) =>
            setNewModule({ ...newModule, title: e.target.value })
          }
        />
        <textarea
          placeholder="Module Description"
          value={newModule.description}
          onChange={(e) =>
            setNewModule({ ...newModule, description: e.target.value })
          }
        />
        <button onClick={handleAddModule}>Add Module</button>
      </div>

      <ul className="module-list">
        {modules.map((mod) => (
          <li key={mod.id}>
            <strong>{mod.title}</strong>: {mod.description}
          </li>
        ))}
      </ul>
    </div>
  );
}