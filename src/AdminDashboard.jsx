import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [wordcloudURL, setWordcloudURL] = useState('');

  useEffect(() => {
    fetch('https://feedback-backend-k4pk.onrender.com/admin/summary')
      .then(res => res.json())
      .then(data => {
        setSummary(data.summary);
        setFeedbacks(data.feedback);
        setEvents(data.events);
      });

    setWordcloudURL('https://feedback-backend-k4pk.onrender.com/admin/wordcloud');
  }, []);

  const filteredFeedbacks = selectedEvent ? feedbacks.filter(f => f[1] === selectedEvent) : feedbacks;

  const handleExport = () => {
    window.open('https://feedback-backend-k4pk.onrender.com/admin/export');
  };

  return (
    <div>
      
      <h2 style={{ color: '#0ff', textShadow: '0 0 10px #0ff' }}>📊 Admin Dashboard</h2>
<p style={{ color: '#0ff' }}>
  🔍 This dashboard displays a live summary of feedback sentiments submitted by users. Our AI model classifies responses into Positive, Neutral, or Negative.
</p>


      <div>
        <label>Filter by Event:</label>
        <select onChange={e => setSelectedEvent(e.target.value)}>
          <option value="">All Events</option>
          {events.map((ev, i) => (
            <option key={i} value={ev}>{ev}</option>
          ))}
        </select>
      </div>

      <Pie data={{
        labels: Object.keys(summary),
        datasets: [{
          data: Object.values(summary),
          backgroundColor: ['green', 'gray', 'red'],
        }]
      }} />

      <button onClick={handleExport}>Download CSV</button>

      <h3>Feedbacks</h3>
      <table border="1">
        <thead>
          <tr><th>Name</th><th>Event</th><th>Feedback</th><th>Sentiment</th><th>Rating</th><th>Date</th></tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((f, i) => (
            <tr key={i}>
              <td>{f[0]}</td><td>{f[1]}</td><td>{f[2]}</td><td>{f[3]}</td><td>{f[4]}</td><td>{f[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Word Cloud</h3>
      <img src={wordcloudURL} alt="Word Cloud" width="600" />
    </div>
  );
}

export default AdminDashboard;
