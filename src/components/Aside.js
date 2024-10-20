// src/components/Aside/Aside.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import logo from '../imgs/logo.png';
import dash from '../imgs/dash.png';
import settings from '../imgs/control.png';
import users from '../imgs/users.png';
import vehicles from '../imgs/vehicles.png';
import shipments from '../imgs/shipments.png'
const Aside = () => {
  return (
    <aside className="aside">
      <div className='aside__logo'>
          <img src={logo} alt='logo'/>
      </div>
      <div className='aside__navigation'>
        <ul>
            <li><img src={dash} alt="Dashboard icon"/><Link to="/main/analytics">Dashboard</Link></li>
            <li><img src={shipments} alt="Shipments icon"/><Link to="/main/settings">Shipments</Link></li>
            <li><img src={vehicles} alt="vehicles icon"/><Link to="/main/vehicles">Vehicles</Link></li>
            <li><img src={users} alt="Users icon"/><Link to="/main/users">Users</Link></li>
            <li><img src={settings} alt="Settings icon"/><Link to="/main/settings">Settings</Link></li>

        </ul>
      </div>
    </aside>
  );
};

export default Aside;
