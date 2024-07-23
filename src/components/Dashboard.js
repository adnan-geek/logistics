// src/components/Dashboard.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Aside from './Aside';
import Main  from './Main';

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
          <div className='container'>
            <Aside/>
            <Main/>
          </div>

  );
}

export default Dashboard;
