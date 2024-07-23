import React from 'react';

const Users = () => {
  return (
    <div>
      <h1>User Management</h1>
      <p>Manage your application users from this page. You can add, edit, or remove users.</p>
      {/* Example user list */}
      <ul>
        <li>User1 <button>Edit</button> <button>Delete</button></li>
        <li>User2 <button>Edit</button> <button>Delete</button></li>
        <li>User3 <button>Edit</button> <button>Delete</button></li>
      </ul>
      <button onClick={() => alert('Add User')}>Add New User</button>
    </div>
  );
}

export default Users;
