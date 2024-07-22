// src/components/Aside/Aside.js
import React from 'react';
import '../styles/main.css';

const Aside = () => {
  return (
    <aside className="aside">
      <h2>Solar System Navigation</h2>
      <ul>
        <li>Dashboard</li>
        <li>Settings</li>
        <li>Reports</li>
        <li>Support</li>
      </ul>
    </aside>
  );
};

export default Aside;
