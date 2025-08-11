import { db, auth } from "./firebase.js";
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "traineelogin.html";
    return;
  }

  const quizList = document.getElementById("quizList");
  const quizDisplay = document.getElementById("quizDisplay");

  const quizzesSnap = await getDocs(collection(db, "quizzes"));
  quizzesSnap.forEach(docSnap => {
    const quiz = docSnap.data();
    const btn = document.createElement("button");
    btn.textContent = quiz.title;
    btn.onclick = () => loadQuiz(docSnap.id, quiz);
    quizList.appendChild(btn);
  });

  async function loadQuiz(quizId, quiz) {
    quizList.style.display = "none";
    quizDisplay.style.display = "block";
    quizDisplay.innerHTML = `<h2>${quiz.title}</h2><form id="quizForm"></form>`;

    const form = document.getElementById("quizForm");

    quiz.questions.forEach((q, index) => {
      const block = document.createElement("div");
      block.innerHTML = `
        <p><strong>Q${index + 1}:</strong> ${q.question}</p>
        ${q.options.map((opt, i) => `
          <label>
            <input type="radio" name="q${index}" value="${opt}" required />
            ${opt}
          </label><br>
        `).join("")}
      `;
      form.appendChild(block);
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Answers";
    submitBtn.type = "submit";
    form.appendChild(submitBtn);

    form.onsubmit = async (e) => {
      e.preventDefault();
      let score = 0;

      quiz.questions.forEach((q, i) => {
        const selected = form.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === q.correctAnswer) score++;
      });

      const result = {
        quizId,
        traineeId: user.uid,
        score,
        total: quiz.questions.length,
        submittedAt: serverTimestamp()
      };

      await setDoc(doc(db, "results", `${user.uid}_${quizId}`), result);
      const percentage = Math.round((score / quiz.questions.length) * 100);
let message = "";

if (percentage === 100) {
  message = "🌟 Perfect score! You're mastering this topic.";
} else if (percentage >= 80) {
  message = "👏 Great job! Just a few tweaks and you'll be unstoppable.";
} else if (percentage >= 50) {
  message = "💡 You're getting there! Review the material and try again.";
} else {
  message = "🚀 Every expert starts somewhere. Keep practicing—you’ve got this!";
}
const result = {
  quizId,
  traineeId: user.uid,
  score,
  total: quiz.questions.length,
  submittedAt: serverTimestamp(),
  feedback: message
};

await setDoc(doc(db, "results", `${user.uid}_${quizId}`), result);
quizDisplay.innerHTML = `
  <h2>Quiz Results</h2>
  <p>You scored <strong>${score}/${quiz.questions.length}</strong> (${percentage}%)</p>
  <p class="feedback">${message}</p>
  <button onclick="window.location.href='trainee-dashboard.html'">Back to Dashboard</button>
`;
    };
  }
});
