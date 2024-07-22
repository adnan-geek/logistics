// src/components/Dashboard.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a session check with a fetch request to the backend
    fetch('/backend/scripts/check-auth.php')
      .then(response => response.json())
      .then(data => {
        if (!data.loggedIn) {
          navigate('/login');
        }
      });
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Your dashboard content */}
    </div>
  );
}

export default Dashboard;
