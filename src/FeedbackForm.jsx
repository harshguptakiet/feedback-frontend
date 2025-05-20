import React, { useState } from 'react';
import './App.css';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [event, setEvent] = useState('');
  const [name, setName] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://feedback-backend-k4pk.onrender.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, event, feedback }),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="App">
      <h1>Student Feedback</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Event/Club" value={event} onChange={e => setEvent(e.target.value)} />
        <textarea placeholder="Your feedback" value={feedback} onChange={e => setFeedback(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h3>Sentiment: {response.sentiment}</h3>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
