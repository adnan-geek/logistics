// src/components/Users.js
import React from 'react';
import UsersManager from '../components/UsersManagers'; // Adjust the path as necessary based on your project structure

const Users = () => {
  return (
    <div>
      <h1>Users Page</h1>
      <UsersManager />  // Include UserManager to handle and display user data
    </div>
  );
};

export default Users;
