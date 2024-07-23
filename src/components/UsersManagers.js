import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import UsersTable from './UsersTable';  // Ensure correct component name

const UserManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/myapp/solarsystem/src/backend/scripts/users.php')
      .then(response => {
        console.log(response.data);
        setUsers(response.data);  // Axios wraps the response data inside a data property
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEdit = userId => {
    console.log('Edit user with ID:', userId);
    // Add your logic to edit user
  };

  const handleDelete = userId => {
    console.log('Delete user with ID:', userId);
    // Add your logic to delete user
  };

  return (
    <div>
      <h1>User Management</h1>
      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UserManager;
