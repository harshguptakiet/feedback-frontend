import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';


function AdminLogin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin123') setAuthenticated(true);
    else alert('Incorrect password');
  };

  return (
    <div>
      {authenticated ? (
        <AdminDashboard />
      ) : (
        <div>
          <h2>Admin Login</h2>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default AdminLogin;
