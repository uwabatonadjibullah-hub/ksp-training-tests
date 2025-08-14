import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../firebase";

export default function TraineeTable() {
  const [trainees, setTrainees] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "trainees"), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setTrainees(data);
    });
    return () => unsub();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Profile</th><th>Name</th><th>Email</th><th>Progress</th><th>Score</th>
        </tr>
      </thead>
      <tbody>
        {trainees.map((t, i) => (
          <tr key={i}>
            <td><img src={t.profileUrl || "default.jpg"} alt="profile" /></td>
            <td>{t.name}</td>
            <td>{t.email}</td>
            <td>{t.progress || 0}%</td>
            <td>{t.score || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}