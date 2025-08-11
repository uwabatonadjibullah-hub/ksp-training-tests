// Show trainee name and faculty
const name = localStorage.getItem("traineeName");
const faculty = localStorage.getItem("traineeFaculty");

document.getElementById("greeting").innerText = `Hello, ${name} from ${faculty}. Good luck!`;
document.getElementById("greeting").innerText = `Hello, ${name} from ${faculty}. Good luck!`;document.getElementById("quizForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let score = 0;

  const answers = {
    q1: "b",
    q2: "b"
  };

  for (let question in answers) {
    const selected = document.querySelector(`input[name="${question}"]:checked`);
    if (selected && selected.value === answers[question]) {
      score++;
    }
  }

  document.getElementById("result").innerHTML = `<h2>Your Score: ${score}/2</h2>`;
});
// Save results to localStorage
const traineeResults = {
  name: name,
  faculty: faculty,
  score: score,
  total: questions.length,
  answers: selectedAnswers
};

localStorage.setItem("traineeResults", JSON.stringify(traineeResults));

// Redirect to results page
window.location.href = "results.html";
document.addEventListener("DOMContentLoaded", () => {
  const duration = quizConfig.durationMinutes * 60; // convert to seconds
  let timeLeft = duration;

  const timerDisplay = document.getElementById("timer");
  const countdown = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdown);
      alert("Time's up! Submitting your quiz.");
      document.getElementById("submit-btn").click();
    }
  }, 1000);
});
const traineeName = localStorage.getItem("studentName");
const previousResults = JSON.parse(localStorage.getItem("traineeHistory")) || [];

previousResults.push({
  name: traineeName,
  score: score,
  total: questions.length,
  percentage: Math.round((score / questions.length) * 100),
  date: new Date().toLocaleString()
});

localStorage.setItem("traineeHistory", JSON.stringify(previousResults));