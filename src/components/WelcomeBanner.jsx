const WelcomeBanner = ({ user }) => {
  const role = user.role;

  const messages = {
    trainee: "Welcome, future filmmaker! 🎬 Your journey starts here. Let’s sharpen your skills and capture Rwanda’s stories.",
    admin: "Welcome back, mentor! 🧠 Your dashboard is ready to guide and empower the next generation.",
  };

  return (
    <div className="welcome-banner">
      <h3>{messages[role]}</h3>
    </div>
  );
};