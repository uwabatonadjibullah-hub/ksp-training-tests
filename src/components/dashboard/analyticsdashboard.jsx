import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getQuizAnalytics } from '../../services/analyticsService';
import '../../styles/analytics.css';

const AnalyticsDashboard = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getQuizAnalytics().then(data => {
      setChartData({
        labels: data.map(d => d.name),
        datasets: [{
          label: 'Average Score',
          data: data.map(d => d.avgScore),
          backgroundColor: '#4CAF50',
        }]
      });
    });
  }, []);

  return (
    <div className="analytics-container">
      <h2>📊 Trainee Performance Overview</h2>
      {chartData ? <Bar data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default AnalyticsDashboard;