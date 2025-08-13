// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null); // null = loading
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setIsAuthorized(false);
          return;
        }

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().role === 'admin') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }

        setChecking(false);
      });
    };

    checkAccess();
  }, []);

  if (checking) return <p>Checking access...</p>;

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;