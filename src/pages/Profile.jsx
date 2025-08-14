import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import './profile.css';

export default function Profile() {
  const [name, setName] = useState('');
  const [faculty, setFaculty] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.error('User profile not found');
        return;
      }

      const data = userSnap.data();
      setName(data.name || '');
      setFaculty(data.faculty || '');
      setLastUpdate(data.lastProfileUpdate?.toDate?.() || new Date(data.lastProfileUpdate));

      const now = new Date();
      const thirtyDays = 1000 * 60 * 60 * 24 * 30;
      if (!data.lastProfileUpdate || now - new Date(data.lastProfileUpdate) > thirtyDays) {
        setCanEdit(true);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userRef = doc(db, 'users', user.uid);

    await updateDoc(userRef, {
      name,
      faculty,
      lastProfileUpdate: serverTimestamp()
    });

    setCanEdit(false);
    alert('Profile updated successfully. You can edit again after 30 days.');
  };

  return (
    <div className="profile-page">
      <h2>👤 Your Profile</h2>
      <div className="profile-form">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          disabled={!canEdit}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Faculty:</label>
        <input
          type="text"
          value={faculty}
          disabled={!canEdit}
          onChange={(e) => setFaculty(e.target.value)}
        />

        {canEdit ? (
          <button onClick={handleSave}>💾 Save Changes</button>
        ) : (
          <p className="locked-msg">You can update your profile again after 30 days.</p>
        )}
      </div>
    </div>
  );
}