import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import './AdminDashboard.css';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch('https://feedback-backend-k4pk.onrender.com/admin/summary')
      .then(res => res.json())
      .then(data => {
        setSummary(data.summary);
        setFeedbacks(data.feedback);
      });
  }, []);

  const pieData = {
    labels: Object.keys(summary),
    datasets: [{
      label: 'Feedback Sentiment',
      data: Object.values(summary),
      backgroundColor: ['green', 'gray', 'red'],
    }]
  };

  const barData = {
    labels: Object.keys(summary),
    datasets: [{
      label: 'Feedback Count',
      data: Object.values(summary),
      backgroundColor: ['rgba(0,255,0,0.5)', 'rgba(128,128,128,0.5)', 'rgba(255,0,0,0.5)']
    }]
  };

  return (
    <div className="admin-dashboard">
      <h2>📊 Feedback Summary</h2>
      <p>This section visually represents the overall sentiment distribution from student feedback.</p>

      <div className="chart-row">
        <div className="chart"><Pie data={pieData} /></div>
        <div className="chart"><Bar data={barData} /></div>
      </div>

      <h3>📋 Detailed Feedback Analysis</h3>
      <p>Each feedback includes the sentiment label and the VADER sentiment scores (positive, neutral, negative, and compound).</p>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Event</th><th>Feedback</th><th>Sentiment</th>
            <th>Compound</th><th>Pos</th><th>Neu</th><th>Neg</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f, i) => (
            <tr key={i}>
              <td>{f[0]}</td><td>{f[1]}</td><td>{f[2]}</td><td>{f[3]}</td>
              <td>{f[4].toFixed(2)}</td><td>{f[5].toFixed(2)}</td>
              <td>{f[6].toFixed(2)}</td><td>{f[7].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
