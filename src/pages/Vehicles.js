import React, { useState } from 'react';

// Sample vehicle data (replace with actual data or API)
const vehicleData = [
  {
    id: 1,
    name: 'Vehicle 12',
    plateNumber: 'ABC123',
    nextOilChange: '2024-12-15',
    maxVolume: '1000L',
    status: 'Active',
    image: 'https://www.configurator.iveco.com/eplr/epl/image/13809/',
    location: '40.712776, -74.005974', // Location (latitude, longitude) for tracking
  },
  {
    id: 2,
    name: 'Vehicle 13',
    plateNumber: 'XYZ456',
    nextOilChange: '2025-03-10',
    maxVolume: '1200L',
    status: 'Inactive',
    image: 'https://www.configurator.iveco.com/eplr/epl/image/13809/',
    location: '34.052235, -118.243683',
  },
  {
    id: 3,
    name: 'Vehicle 18',
    plateNumber: 'LMN789',
    nextOilChange: '2024-11-05',
    maxVolume: '950L',
    status: 'Under Maintenance',
    image: 'https://www.configurator.iveco.com/eplr/epl/image/13809/',
    location: '51.507351, -0.127758',
  },
];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(vehicleData);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    plateNumber: '',
    nextOilChange: '',
    maxVolume: '',
    status: 'Active',
    image: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Edit Vehicle Status
  const handleEditStatus = (vehicleId, newStatus) => {
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === vehicleId ? { ...vehicle, status: newStatus } : vehicle
    );
    setVehicles(updatedVehicles);
    setSelectedVehicle(null); // Close the edit form after saving
  };

  // Handle Add Vehicle
  const handleAddVehicle = () => {
    const newId = vehicles.length + 1;
    const updatedVehicles = [
      ...vehicles,
      {
        id: newId,
        name: newVehicle.name,
        plateNumber: newVehicle.plateNumber,
        nextOilChange: newVehicle.nextOilChange,
        maxVolume: newVehicle.maxVolume,
        status: newVehicle.status,
        image: newVehicle.image,
        location: '',
      },
    ];
    setVehicles(updatedVehicles);
    setNewVehicle({
      name: '',
      plateNumber: '',
      nextOilChange: '',
      maxVolume: '',
      status: 'Active',
      image: '',
    });
  };

  // Handle Filter by Vehicle Name
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Tracking Map (You can integrate Google Maps API or any other map service)
  const handleTrackingClick = (location) => {
    window.open(`https://www.google.com/maps?q=${location}`, '_blank'); // Open location in Google Maps
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
        <p className="text-gray-600 mt-2">Manage and track your fleet of vehicles</p>
      </div>

      {/* Search Filter */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Vehicle by Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 p-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Vehicle Table */}
      <div className="vehicle-table mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Vehicle List</h2>
          <button
            onClick={() => setSelectedVehicle({ id: 'new', name: '', plateNumber: '', nextOilChange: '', maxVolume: '', status: 'Active', image: '', location: '' })}
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600"
          >
            Add New Vehicle
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Vehicle Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Vehicle Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Plate Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Next Oil Change</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Max Volume</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Location</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={vehicle.image} alt={vehicle.name} className="w-16 h-16 object-cover rounded-full" />
                </td>
                <td className="px-6 py-4">{vehicle.name}</td>
                <td className="px-6 py-4">{vehicle.plateNumber}</td>
                <td className="px-6 py-4">{vehicle.nextOilChange}</td>
                <td className="px-6 py-4">{vehicle.maxVolume}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${vehicle.status === 'Active' ? 'bg-green-500 text-white' : vehicle.status === 'Inactive' ? 'bg-gray-500 text-white' : 'bg-yellow-500 text-white'}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleTrackingClick(vehicle.location)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
                  >
                    Track Location
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
                  >
                    Edit Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Vehicle Form */}
      {selectedVehicle && (
        <div className="edit-vehicle-form bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">
            {selectedVehicle.id === 'new' ? 'Add New Vehicle' : `Edit Status of ${selectedVehicle.name}`}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-lg font-medium">Vehicle Name</label>
              <input
                type="text"
                value={selectedVehicle.name}
                onChange={(e) => setSelectedVehicle({ ...selectedVehicle, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-lg font-medium">Plate Number</label>
              <input
                type="text"
                value={selectedVehicle.plateNumber}
                disabled
                className="w-full p-3 border border-gray-300 bg-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label className="text-lg font-medium">Next Oil Change</label>
              <input
                type="date"
                value={selectedVehicle.nextOilChange}
                onChange={(e) => setSelectedVehicle({ ...selectedVehicle, nextOilChange: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="text-lg font-medium">Max Volume</label>
              <input
                type="text"
                value={selectedVehicle.maxVolume}
                onChange={(e) => setSelectedVehicle({ ...selectedVehicle, maxVolume: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Status */}
            {selectedVehicle.id !== 'new' && (
              <div>
                <label className="text-lg font-medium">Update Status</label>
                <select
                  value={selectedVehicle.status}
                  onChange={(e) => handleEditStatus(selectedVehicle.id, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>
            )}

            <div className="mt-4 text-center">
              {selectedVehicle.id === 'new' ? (
                <button onClick={handleAddVehicle} className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600">
                  Add Vehicle
                </button>
              ) : (
                <button onClick={() => setSelectedVehicle(null)} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
