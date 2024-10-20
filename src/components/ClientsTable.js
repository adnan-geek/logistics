import React from 'react';
import editPng from '../imgs/edit.png';
import trashPng from '../imgs/trash.png';

const ClientsTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className='clients__table'>
      <thead>
        <tr>
          <th>Client ID</th>
          <th>Company Name</th>
          <th>Contact Person</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Total Shipments</th>
          <th>Current Shipment Status</th>
          <th>Outstanding Balance</th>
          <th>Account Status</th>
          <th>Date Joined</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(client => (
          
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.company_name}</td>
            <td>{client.contact_person}</td>
            <td>{client.email}</td>
            <td>{client.phone_number}</td>
            <td>{client.address}</td>
            <td>{client.total_shipments}</td>
            <td>{client.current_shipment_status}</td>
            <td>${client.outstanding_balance}</td>
            <td>{client.account_status}</td>
            <td>{client.date_joined}</td>
            <td>
              <button onClick={() => onEdit(client.id)} aria-label="Edit Client">
                <img src={editPng} alt="Edit" />
              </button>
              <button onClick={() => onDelete(client.id)} aria-label="Delete Client">
                <img src={trashPng} alt="Delete" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientsTable;
