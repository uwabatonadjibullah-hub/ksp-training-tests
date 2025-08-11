const FirstQuizPrompt = ({ hasTakenQuiz }) => {
  if (hasTakenQuiz) return null;

  return (
    <div className="quiz-prompt">
      <h4>🎯 Ready to test your camera knowledge?</h4>
      <button onClick={() => navigate('/quiz')}>Take Your First Quiz</button>
    </div>
  );
};