import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function PerformanceCharts({ trainees }) {
  const data = {
    labels: trainees.map(t => t.name),
    datasets: [{
      label: "Scores",
      data: trainees.map(t => t.score || 0),
      backgroundColor: "#4A90E2"
    }]
  };

  return <Bar data={data} />;
}