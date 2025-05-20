import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  const fetchData = (eventFilter = '') => {
    const url = eventFilter
      ? `https://feedback-backend-k4pk.onrender.com/admin/summary?event=${encodeURIComponent(eventFilter)}`
      : 'https://feedback-backend-k4pk.onrender.com/admin/summary';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setSummary(data.summary || {});
        setFeedbacks(data.feedback || []);
      });
  };

  const fetchEventList = () => {
    fetch('https://feedback-backend-k4pk.onrender.com/admin/summary') // all feedbacks
      .then(res => res.json())
      .then(data => {
        const uniqueEvents = Array.from(new Set(data.feedback.map(fb => fb[1])));
        setEvents(uniqueEvents);
      });
  };

  useEffect(() => {
    fetchData();
    fetchEventList();
  }, []);

  const handleEventChange = (e) => {
    const value = e.target.value;
    setSelectedEvent(value);
    fetchData(value);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <label>Select Event:&nbsp;</label>
      <select value={selectedEvent} onChange={handleEventChange}>
        <option value="">All Events</option>
        {events.map((ev, idx) => (
          <option key={idx} value={ev}>{ev}</option>
        ))}
      </select>

      <h3>Feedback Sentiment Chart</h3>
      <Pie
        data={{
          labels: Object.keys(summary),
          datasets: [{
            label: 'Feedback Sentiment',
            data: Object.values(summary),
            backgroundColor: ['green', 'gray', 'red'],
          }]
        }}
      />

      <h3>Feedback Table</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Name</th><th>Event</th><th>Feedback</th><th>Sentiment</th></tr>
        </thead>
        <tbody>
          {feedbacks.map((f, i) => (
            <tr key={i}>
              <td>{f[0]}</td>
              <td>{f[1]}</td>
              <td>{f[2]}</td>
              <td>{f[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
