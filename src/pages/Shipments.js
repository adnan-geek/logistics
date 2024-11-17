import React, { useState , useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // If using React-Leaflet for maps
import 'leaflet/dist/leaflet.css';
import axios from 'axios';



const Shipments = () => {
  /** fetching shipments data  ****/
  const [shipmentsData, setShipmentsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/adyologistics/src/backend/scripts/shipments.php'); // Replace with your actual API URL
        const data = await response.json();
        setShipmentsData(data); // Set the data received from the API
      } catch (error) {
        console.error("Error fetching shipments data:", error);
      }
    };
    
    fetchData();
  }, []);

  /*******************************************/
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const itemsPerPage = 10;
  // State for toggling the visibility of the form
  const [isFormVisible, setIsFormVisible] = useState(false);

  // State for managing the form input values
  const [newShipment, setNewShipment] = useState({
    sender: '',
    receiver: '',
    status: '',
    shippingDate: '',
    expectedDelivery: '',
    location: '',
    trackingNumber: '',
    weight: '',
    dimensions: '',
    shippingCost: '',
    paymentStatus: '',
    deliveryType: '',
    contact: '',
    deliveryAttempts: '',
  });
  // Toggle form visibility
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShipment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/adyologistics/src/backend/scripts/shipments.php", newShipment, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        setNewShipment({
          sender: '',
          receiver: '',
          status: '',
          shippingDate: '',
          expectedDelivery: '',
          location: '',
          trackingNumber: '',
          weight: '',
          dimensions: '',
          shippingCost: '',
          paymentStatus: '',
          deliveryType: '',
          contact: '',
          deliveryAttempts: '',
        });
        console.log("Shipment added successfully:", response.data);
      } else {
        console.log("Failed to add shipment:", response.data);
      }
    } catch (error) {
      console.error("Error occurred while adding shipment:", error);
    }
  };
  
  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShipments = shipmentsData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open side menu and set selected shipment
  const handleViewClick = (shipment) => {
    setSelectedShipment(shipment);
    setIsSideMenuOpen(true);
    
    
  };
  const handleEditClick = (shipment)=>{
    console.log(shipment);
    setIsFormVisible(true);
    setNewShipment(shipment)
  }
  // Close side menu
  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Shipments</span>
        <button className="btn-add-shipment" onClick={toggleForm}>+ Add Shipment</button>

      </div>

      {/* Shipments Table */}
      <h2>Shipment Information</h2>
      <table className="shipment-table">
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
            <th>Shipping Date</th>
            <th>Expected Delivery</th>
            <th>Last Updated</th>
            <th>Location</th>
            <th>Tracking Number</th>
            <th>Weight</th>
            <th>Dimensions</th>
            <th>Shipping Cost</th>
            <th>Payment Status</th>
            <th>Delivery Type</th>
            <th>Contact</th>
            <th>Delivery Attempts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentShipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>{shipment.id}</td>
              <td>{shipment.sender}</td>
              <td>{shipment.receiver}</td>
              <td>{shipment.status}</td>
              <td>{shipment.shippingDate}</td>
              <td>{shipment.expectedDelivery}</td>
              <td>{shipment.lastUpdated}</td>
              <td>{shipment.location}</td>
              <td>{shipment.trackingNumber}</td>
              <td>{shipment.weight}</td>
              <td>{shipment.dimensions}</td>
              <td>{shipment.shippingCost}</td>
              <td>{shipment.paymentStatus}</td>
              <td>{shipment.deliveryType}</td>
              <td>{shipment.contact}</td>
              <td>{shipment.deliveryAttempts}</td>
              <td>
                <button className="btn-action" onClick={() => handleViewClick(shipment)}>View</button>
                <button className="btn-action" onClick={() => handleEditClick(shipment)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(Math.ceil(shipmentsData.length / itemsPerPage))].map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(shipmentsData.length / itemsPerPage)}>
          Next
        </button>
      </div>

      {/* Side Menu - Shipment Details */}
      {isSideMenuOpen && selectedShipment && (
        <div className="side-menu">
          <div className="side-menu-content">
            <button className="close-btn" onClick={closeSideMenu}>X</button>
            <h3>Shipment Details</h3>
            <div className="shipment-info">
              <p><strong>Sender:</strong> {selectedShipment.sender}</p>
              <p><strong>Receiver:</strong> {selectedShipment.receiver}</p>
              <p><strong>Status:</strong> {selectedShipment.status}</p>
              <p><strong>Location:</strong> {selectedShipment.location}</p>
              <p><strong>Tracking Number:</strong> {selectedShipment.trackingNumber}</p>
              {/* Add more shipment info here */}
            </div>

            {/* Map - Add a map here (using react-leaflet or another library) */}
            <div className="map-container">
            <MapContainer center={[35.774, -5.813]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[35.774, -5.813]}>
                    <Popup>Shipment Location - Tangier</Popup>
                </Marker>
                </MapContainer>

            </div>
          </div>
        </div>
      )}
      {/* form modal  */}
      {isFormVisible && (
            
            <div className="overlay">
            <div className="modal-content">
              <h3>Add New Shipment</h3>
              <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label>Sender:</label>
          <input
            type="text"
            name="sender"
            value={newShipment.sender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Receiver:</label>
          <input
            type="text"
            name="receiver"
            value={newShipment.receiver}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={newShipment.status}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Shipping Date:</label>
          <input
            type="date"
            name="shippingDate"
            value={newShipment.shippingDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Expected Delivery:</label>
          <input
            type="date"
            name="expectedDelivery"
            value={newShipment.expectedDelivery}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={newShipment.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tracking Number:</label>
          <input
            type="text"
            name="trackingNumber"
            value={newShipment.trackingNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={newShipment.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Dimensions:</label>
          <input
            type="text"
            name="dimensions"
            value={newShipment.dimensions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Shipping Cost:</label>
          <input
            type="number"
            name="shippingCost"
            value={newShipment.shippingCost}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Payment Status:</label>
          <input
            type="text"
            name="paymentStatus"
            value={newShipment.paymentStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Delivery Type:</label>
          <input
            type="text"
            name="deliveryType"
            value={newShipment.deliveryType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input
            type="tel"
            name="contact"
            value={newShipment.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Delivery Attempts:</label>
          <input
            type="number"
            name="deliveryAttempts"
            value={newShipment.deliveryAttempts}
            onChange={handleChange}
            required
          />
        </div>
        <div className="btn-submit">
          <button type="submit">Submit Shipment</button>
        </div>
      </form>
              <button className="btn-close" onClick={toggleForm}>Close</button>
            </div>
          </div>
          )}

      {/* /**** end of form modal  */ }
    </div>
  );
};

export default Shipments;
