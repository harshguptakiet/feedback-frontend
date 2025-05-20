import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';

import AdminDashboard from './AdminDashboard';
import FeedbackForm from './FeedbackForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Default route shows feedback form */}
          <Route path="/" element={<FeedbackForm />} />
          {/* Admin login page */}
          <Route path="/login" element={<AdminLogin />} />

          {/* Admin dashboard after login */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
