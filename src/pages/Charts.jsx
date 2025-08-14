import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function Charts() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      const snapshot = await getDocs(collection(db, 'results'));
      const data = snapshot.docs.map(doc => doc.data());

      const grouped = data.reduce((acc, curr) => {
        const key = curr.moduleTitle;
        acc[key] = acc[key] || [];
        acc[key].push(curr.score);
        return acc;
      }, {});

      const labels = Object.keys(grouped);
      const averages = labels.map(label => {
        const scores = grouped[label];
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        return Math.round(avg);
      });

      setChartData({
        labels,
        datasets: [
          {
            label: 'Average Score (%)',
            data: averages,
            backgroundColor: '#007bff',
          },
        ],
      });
    };

    fetchScores();
  }, []);

  return (
    <div className="charts-page">
      <h2>📊 Performance Charts</h2>
      {chartData ? <Bar data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
}