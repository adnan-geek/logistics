import React from 'react';
import editPng from '../imgs/edit.png';
import trashPng from '../imgs/trash.png';

const Vehicles = ({ vehicles, onEdit, onDelete }) => {
  return (
    <div className="vehicle-container">
      <h2>Vehicles</h2>
      <table className='vehicles__table'>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Type</th>
            <th>License Plate</th>
            <th>Status</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.license_plate}</td>
              <td>{vehicle.status}</td>
              <td>{vehicle.location}</td>
              <td>
                <button onClick={() => onEdit(vehicle.id)}><img src={editPng} alt="Edit" /></button>
                <button onClick={() => onDelete(vehicle.id)}><img src={trashPng} alt="Delete" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vehicles;
