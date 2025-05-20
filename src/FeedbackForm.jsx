import React, { useState } from 'react';
import './style.css';

function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', event: '', feedback: '', rating: 0 });
  const [response, setResponse] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://<your-backend>.onrender.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div className="App">
      <h1>Student Feedback</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="event" placeholder="Event" onChange={handleChange} />
        <textarea name="feedback" placeholder="Your feedback" onChange={handleChange} />
        <label>Rating:</label>
        <select name="rating" onChange={handleChange}>
          <option value="1">★</option>
          <option value="2">★★</option>
          <option value="3">★★★</option>
          <option value="4">★★★★</option>
          <option value="5">★★★★★</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {response && <h3>Sentiment: {response.sentiment}</h3>}
    </div>
  );
}

export default FeedbackForm;
