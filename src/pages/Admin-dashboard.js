import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TraineeTable from "../components/TraineeTable";
import PerformanceCharts from "../components/PerformanceCharts";
import ModuleManager from "../pages/ModuleManager";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import AdminNav from '../components/Adminnav';
import "../styles/AdminDashboard.css"; // Optional: for cinematic styling

export default function AdminDashboard() {
  const [section, setSection] = useState("trainees");

  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      alert("Logged out successfully.");
      window.location.href = "/admin-login"; // Or use React Router's navigate
    });
  };

  const renderSection = () => {
    switch (section) {
      case "trainees":
        return <TraineeTable />;
      case "performance":
        return <PerformanceCharts />;
      case "modules":
        return <ModuleManager />;
      default:
        return <p>Select a section from the sidebar to begin.</p>;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar onSelect={setSection} onLogout={handleLogout} />
      <main className="dashboard-content">
        <header>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, IAM. Let’s make learning cinematic.</p>
        </header>
        {renderSection()}
      </main>
    </div>
    
  );
}
export default function Results() {
  return (
    <div className="results-page">
      <AdminNav />
      <h2>📈 Class Performance</h2>
      {/* Results table here */}
    </div>
  );
}
