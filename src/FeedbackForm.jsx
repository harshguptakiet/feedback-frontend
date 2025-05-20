// src/FeedbackForm.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Card, CardContent, Alert } from '@mui/material';

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
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Submit Your Feedback</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" margin="normal" value={name} onChange={e => setName(e.target.value)} />
            <TextField fullWidth label="Event or Club" margin="normal" value={event} onChange={e => setEvent(e.target.value)} />
            <TextField fullWidth multiline rows={4} label="Feedback" margin="normal" value={feedback} onChange={e => setFeedback(e.target.value)} />
            <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
          </form>
          {response && (
            <Alert severity="info" style={{ marginTop: '1rem' }}>
              Sentiment: <strong>{response.sentiment}</strong>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default FeedbackForm;
