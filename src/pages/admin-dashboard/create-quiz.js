onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "adminlogin.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists() || userSnap.data().role !== "admin") {
    alert("Access denied.");
    window.location.href = "adminlogin.html";
    return;
  }
});

import { db, auth } from "./firebase.js";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// 🔐 Protect the page
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "adminlogin.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists() || userSnap.data().role !== "admin") {
    alert("Access denied.");
    window.location.href = "adminlogin.html";
    return;
  }
});

// ➕ Add Question Block
window.addQuestion = function () {
  const container = document.getElementById("questionsContainer");

  const questionHTML = `
    <div class="question-block">
      <input type="text" placeholder="Question" class="question" required />
      <input type="text" placeholder="Option A" class="option" required />
      <input type="text" placeholder="Option B" class="option" required />
      <input type="text" placeholder="Option C" class="option" required />
      <input type="text" placeholder="Option D" class="option" required />
      <input type="text" placeholder="Correct Answer" class="correct" required />
    </div>
  `;
  container.insertAdjacentHTML("beforeend", questionHTML);
};

// 💾 Save Quiz
document.getElementById("quizForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("quizTitle").value;
  const questionBlocks = document.querySelectorAll(".question-block");

  const questions = Array.from(questionBlocks).map(block => {
    const inputs = block.querySelectorAll("input");
    return {
      question: inputs[0].value,
      options: [inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value],
      correctAnswer: inputs[5].value
    };
  });

  const quizData = {
    title,
    createdBy: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    questions
  };

  await addDoc(collection(db, "quizzes"), quizData);
  alert("✅ Quiz saved successfully!");
  window.location.href = "admin-dashboard.html";
});