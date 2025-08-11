import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export async function getProgressData(traineeId) {
  const resultsSnap = await getDocs(collection(db, `results`));
  const data = [];

  for (const docSnap of resultsSnap.docs) {
    const result = docSnap.data();
    if (result.traineeId === traineeId) {
      const quizRef = doc(db, 'quizzes', result.quizId);
      const quizSnap = await getDoc(quizRef);
      data.push({
        title: quizSnap.data().title,
        score: result.score,
        total: result.total,
        feedback: result.feedback,
        submittedAt: result.submittedAt
      });
    }
  }

  return data;
}