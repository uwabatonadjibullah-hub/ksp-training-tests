import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

// 🔸 Signup Function
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful! Welcome 🎉");
      window.location.href = "quiz.html"; // Redirect to quiz or dashboard
    })
    .catch((error) => {
      alert("Signup failed: " + error.message);
    });
});

// 🔸 Login Function
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful! 🚀");
      window.location.href = "quiz.html"; // Redirect to quiz or dashboard
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});
