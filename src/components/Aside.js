// src/components/Aside/Aside.js
import React from 'react';
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
            <li>  <img src={dash} /><span>Dashboard</span></li>
            <li>  <img src={control} /><span>Settings</span></li>
            <li>  <img src={users} /><span>Users</span></li>
            <li>  <img src={usage} /><span>Energy  Usage</span></li>

        </ul>
      </div>
    </aside>
  );
};

export default Aside;
