const QuickStartChecklist = ({ user }) => {
  const steps = user.role === 'trainee'
    ? ["📸 Complete your profile", "📝 Take your first quiz", "📊 View your feedback"]
    : ["👥 Add trainees", "🧠 Create a quiz", "💬 Review responses"];

  return (
    <div className="checklist">
      <h4>Quick Start</h4>
      <ul>
        {steps.map((step, i) => <li key={i}>{step}</li>)}
      </ul>
    </div>
  );
};