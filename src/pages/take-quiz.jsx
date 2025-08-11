import { toast } from 'react-toastify';

const handleSubmit = async () => {
  try {
    await saveQuiz();
    toast.success("✅ Quiz saved!");
  } catch (error) {
    toast.error("⚠️ Couldn’t save quiz. Please check your connection.");
  }
}
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Take Quiz | KSP Rwanda</title>
  <link rel="stylesheet" href="styles.css" />
  <script type="module" src="take-quiz.js"></script>
</head>
<body>
  <div class="quiz-container">
    <header>
      <h1>📚 Ready to Learn?</h1>
      <p class="quote">“Every question is a step toward mastery.”</p>
    </header>

    <div id="quizList"></div>
    <div id="quizDisplay" style="display:none;"></div>
  </div>
</body>
</html>
