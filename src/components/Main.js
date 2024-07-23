import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Aside from './Aside';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import Users from '../pages/Users';
import EnergyUsage from '../pages/Energyusage';

const Main = () => {
  return (
    <div className="main-layout">
      <Aside />
      <main className="main-content">
        <Routes>
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="energy-usage" element={<EnergyUsage />} />
          <Route path="/" element={<Navigate replace to="analytics" />} />
        </Routes>
      </main>
    </div>
  );
};

export default Main;
