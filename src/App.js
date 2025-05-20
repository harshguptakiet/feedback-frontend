import React from 'react';
import FeedbackForm from './FeedbackForm';
import AdminLogin from './AdminLogin';
// App.js or index.js
import './App.css';
import AdminDashboard from './AdminDashboard';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ...
<Route path="/admin" element={<AdminDashboard />} />


function App() {
  return (
    <div>
      <FeedbackForm />
      <AdminLogin />
    </div>
  );
}

export default App;
