import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]); // Empty array to hold vehicle data
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Used for editing or adding a vehicle
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    plateNumber: '',
    nextOilChange: '',
    maxVolume: '',
    status: 'Active',
    image: '',
    location: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch vehicle data from the API
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost/adyologistics/src/backend/scripts/vehicles.php') // Your API endpoint for fetching vehicles
      .then((response) => {
        setVehicles(response.data); // Set fetched vehicles data
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch vehicles'); // Set error message
        setLoading(false);
      });
  }, []); // Empty dependency array means it runs only on component mount


  // hanlde image change 
  const handleImageChange = (e) => {
    setNewVehicle({ ...newVehicle, image: e.target.files[0] });
  };

  // Handle Add Vehicle (POST request)
  const handleAddVehicle = () => {
    const formData = new FormData();
    formData.append('vehicle_name', newVehicle.name);
    formData.append('plate_number', newVehicle.plateNumber);
    formData.append('max_volume', newVehicle.maxVolume);
    formData.append('status', newVehicle.status);
    formData.append('location', newVehicle.location);

    // Append the image file if it exists
    if (newVehicle.image) {
      formData.append('vehicle_image', newVehicle.image);
    }

    // Send data to the server using axios
    axios
      .post('http://localhost/adyologistics/src/backend/scripts/vehicles.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to handle file uploads
        },
      })
      .then((response) => {
        // Add the newly created vehicle to the list
        setVehicles([...vehicles, response.data]);

        // Reset the form
        setNewVehicle({
          name: '',
          plateNumber: '',
          maxVolume: '',
          status: 'Active',
          image: null,
          location: '',
        });
      })
      .catch((error) => {
        setError('Failed to add vehicle');
      });
  };

  // Handle Edit Vehicle Status (PUT request)
  const handleEditStatus = (vehicleId, newStatus) => {
    const updatedVehicleData = { id: vehicleId, status: newStatus };

    axios
      .put('http://localhost/adyologistics/src/backend/scripts/vehicles.php', updatedVehicleData)
      .then((response) => {
        const updatedVehicles = vehicles.map((vehicle) =>
          vehicle.id === vehicleId ? { ...vehicle, status: newStatus } : vehicle
        );
        setVehicles(updatedVehicles);
        setSelectedVehicle(null); // Close the edit form after saving
      })
      .catch((error) => {
        setError('Failed to update vehicle status');
      });
  };

  // Handle Delete Vehicle (DELETE request)
  const handleDeleteVehicle = (vehicleId) => {
    axios
      .delete('http://localhost/adyologistics/src/backend/scripts/vehicles.php', {
        data: { id: vehicleId },
      })
      .then((response) => {
        const updatedVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
        setVehicles(updatedVehicles);
      })
      .catch((error) => {
        setError('Failed to delete vehicle');
      });
  };

  // Handle Filter by Vehicle Name
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicle_name.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-6">
          <p>Loading vehicles...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center py-6 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* Vehicle Table */}
      {!loading && !error && (
        <div className="vehicle-table mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Vehicle List</h2>
            <button
              onClick={() =>
                setSelectedVehicle({
                  id: 'new',
                  name: '',
                  plateNumber: '',
                  nextOilChange: '',
                  maxVolume: '',
                  status: 'Active',
                  image: '',
                  location: '',
                })
              }
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
                    <img
                      src={vehicle.vehicle_image}
                      alt={vehicle.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4">{vehicle.vehicle_name}</td>
                  <td className="px-6 py-4">{vehicle.plate_number}</td>
                  <td className="px-6 py-4">{vehicle.next_oil_change}</td>
                  <td className="px-6 py-4">{vehicle.max_volume}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        vehicle.status === 'Active'
                          ? 'bg-green-500 text-white'
                          : vehicle.status === 'Inactive'
                          ? 'bg-gray-500 text-white'
                          : 'bg-yellow-500 text-white'
                      }`}
                    >
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
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Vehicle Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedVehicle.id === 'new' ? 'Add New Vehicle' : 'Edit Vehicle Status'}
            </h2>
            {selectedVehicle.id === 'new' ? (
              <>
                <label className="block text-sm font-medium text-gray-600">Vehicle Name</label>
                <input
                  type="text"
                  value={newVehicle.name}
                  onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  placeholder="Enter Vehicle Name"
                />

                <label className="block text-sm font-medium text-gray-600">Plate Number</label>
                <input
                  type="text"
                  value={newVehicle.plateNumber}
                  onChange={(e) => setNewVehicle({ ...newVehicle, plateNumber: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  placeholder="Enter Plate Number"
                />

                <label className="block text-sm font-medium text-gray-600">Max Volume</label>
                <input
                  type="text"
                  value={newVehicle.maxVolume}
                  onChange={(e) => setNewVehicle({ ...newVehicle, maxVolume: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  placeholder="Enter Max Volume"
                />
                
                            <label>Vehicle Image</label>
                            <input
                              type="file"
                              onChange={handleImageChange}
                              accept="image/*"
                            />

                <label className="block text-sm font-medium text-gray-600">Location</label>
                <input
                  type="text"
                  value={newVehicle.location}
                  onChange={(e) => setNewVehicle({ ...newVehicle, location: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  placeholder="Enter Vehicle Location"
                />

                <button
                  onClick={handleAddVehicle}
                  className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Vehicle
                </button>
              </>
            ) : (
              <>
                <label className="block text-sm font-medium text-gray-600">Vehicle Status</label>
                <select
                  value={newVehicle.status}
                  onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                </select>

                <button
                  onClick={() => handleEditStatus(selectedVehicle.id, newVehicle.status)}
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save Status
                </button>
              </>
            )}
            <button
              onClick={() => setSelectedVehicle(null)}
              className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
