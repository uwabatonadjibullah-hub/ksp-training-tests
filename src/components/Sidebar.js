export default function Sidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <button onClick={() => onSelect("trainees")}>Trainees</button>
      <button onClick={() => onSelect("performance")}>Performance</button>
      <button onClick={() => onSelect("modules")}>Modules</button>
      <button onClick={() => onSelect("logout")}>Logout</button>
    </div>
  );
}
