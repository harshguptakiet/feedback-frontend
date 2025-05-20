// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
