// pages/TakeQuiz.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';

function TakeQuiz() {
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "/login"; // React route
        return;
      }
      setUser(user);
      const quizzesSnap = await getDocs(collection(db, "quizzes"));
      const quizList = [];
      quizzesSnap.forEach(docSnap => {
        quizList.push({ id: docSnap.id, ...docSnap.data() });
      });
      setQuizzes(quizList);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let score = 0;
    const form = e.target;

    selectedQuiz.questions.forEach((q, i) => {
      const selected = form[`q${i}`].value;
      if (selected === q.correctAnswer) score++;
    });

    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    let message = "";
    if (percentage === 100) message = "🌟 Perfect score! You're mastering this topic.";
    else if (percentage >= 80) message = "👏 Great job! Just a few tweaks and you'll be unstoppable.";
    else if (percentage >= 50) message = "💡 You're getting there! Review the material and try again.";
    else message = "🚀 Every expert starts somewhere. Keep practicing—you’ve got this!";

    const result = {
      quizId: selectedQuiz.id,
      traineeId: user.uid,
      score,
      total: selectedQuiz.questions.length,
      submittedAt: serverTimestamp(),
      feedback: message
    };

    await setDoc(doc(db, "results", `${user.uid}_${selectedQuiz.id}`), result);
    setScore(score);
    setFeedback(message);
    toast.success("✅ Quiz submitted!");
  };

  if (!user) return null;

  return (
    <div className="quiz-container">
      {!selectedQuiz ? (
        <>
          <h2>Select a Quiz</h2>
          {quizzes.map(q => (
            <button key={q.id} onClick={() => setSelectedQuiz(q)}>{q.title}</button>
          ))}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>{selectedQuiz.title}</h2>
          {selectedQuiz.questions.map((q, i) => (
            <div key={i}>
              <p><strong>Q{i + 1}:</strong> {q.question}</p>
              {q.options.map((opt, j) => (
                <label key={j}>
                  <input type="radio" name={`q${i}`} value={opt} required />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button type="submit">Submit Answers</button>
        </form>
      )}
      {score !== null && (
        <div className="results">
          <h2>Quiz Results</h2>
          <p>You scored <strong>{score}/{selectedQuiz.questions.length}</strong></p>
          <p className="feedback">{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default TakeQuiz;