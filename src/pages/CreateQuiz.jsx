import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function CreateQuiz() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('scheduled');
  const [scheduledTime, setScheduledTime] = useState('');
  const [duration, setDuration] = useState(15);

  const handleCreate = async () => {
    const quiz = {
      id: Date.now().toString(),
      title,
      status,
      scheduledTime,
      duration
    };

    const docRef = doc(db, 'modules', id);
    await updateDoc(docRef, {
      quizzes: arrayUnion(quiz)
    });

    setTitle('');
    setScheduledTime('');
    setDuration(15);
    alert('Quiz created!');
  };

  return (
    <div className="create-quiz">
      <h2>📝 Create Quiz</h2>
      <input type="text" placeholder="Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
      <input type="number" placeholder="Duration (min)" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
      <button onClick={handleCreate}>Create Quiz</button>
    </div>
  );
}