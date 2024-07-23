// src/components/Aside/Aside.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import logo from '../imgs/logo.png';
import dash from '../imgs/dash.png';
import control from '../imgs/control.png';
import users from '../imgs/users.png';
import usage from '../imgs/usage.png';
const Aside = () => {
  return (
    <aside className="aside">
      <div className='aside__logo'>
          <img src={logo} alt='logo'/>
      </div>
      <div className='aside__navigation'>
        <ul>
            <li><img src={dash} alt="Dashboard icon"/><Link to="/main/analytics">Dashboard</Link></li>
            <li><img src={control} alt="Settings icon"/><Link to="/main/settings">Settings</Link></li>
            <li><img src={users} alt="Users icon"/><Link to="/main/users">Users</Link></li>
            <li><img src={usage} alt="Energy Usage icon"/><Link to="/main/energy-usage">Energy Usage</Link></li>

        </ul>
      </div>
    </aside>
  );
};

export default Aside;
