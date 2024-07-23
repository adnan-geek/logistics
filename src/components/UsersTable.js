import React from 'react';

const UsersTable = ({ users, onEdit, onDelete }) => {
  return (
    <table>
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
            <td>{user.dateJoined}</td>
            <td>{user.solarSystemType}</td>
            {/* <td>${user.bills.toFixed(2)}</td> */}
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
