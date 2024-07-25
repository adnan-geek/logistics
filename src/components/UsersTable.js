import React from 'react';

const UsersTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className='users__table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
          <th>Date Joined</th>
          <th>Solar System Type</th>
          <th>Bills</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.date_joined}</td>
            <td>{user.solar_system_type}</td>
            <td>${user.bills}</td>
            <td>
              <button onClick={() => onEdit(user.id)}>Edit</button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
