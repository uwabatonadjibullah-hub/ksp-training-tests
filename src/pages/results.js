const results = JSON.parse(localStorage.getItem("traineeResults"));

document.getElementById("summary").innerText = 
  `${results.name} from ${results.faculty}, you scored ${results.score}/${results.total}.`;

const feedbackDiv = document.getElementById("feedback");

results.answers.forEach((answer, index) => {
  const question = questions[index]; // reuse your questions array
  const correct = answer === question.correctAnswer;

  const resultItem = document.createElement("p");
  resultItem.innerText = `Q${index + 1}: ${question.question}
  Your answer: ${question.options[answer]}
  ${correct ? "✅ Correct" : "❌ Incorrect (Correct: " + question.options[question.correctAnswer] + ")"}`;

  feedbackDiv.appendChild(resultItem);
});