import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const EditUserModal = ({ user, onSave, onClose , updateData }) => {
    const [formData, setFormData] = useState({ ...user });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(true);  // Local state to control modal visibility

    useEffect(() => {
        setFormData({ ...user });  // Populate form when user prop changes
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        axios.post('http://localhost/myapp/solarsystem/src/backend/scripts/edit-user.php', formData)
        .then(response => {
          // store the token in the local storage 
                if(response.data.success == true){
                   
                  handleClose();
                  console.log(response);
                 
                }
                else {
                console.log(response);
                  setError('error updating the user');
                }
    
        })
        .catch(error => {
          alert(error.message);
        });
    };





    const handleClose = () => {
        setIsOpen(false);
        onClose();
        updateData();  // Propagate close action up
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleClose} // Close modal when clicking outside
                >
                    <motion.div
                        className="modal-content"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={e => e.stopPropagation()}  // Prevent clicks from closing the modal
                    >
                        <form onSubmit={handleSubmit}>
                            <h2>Edit User</h2>
                            <div className='email__username'>
                            <label>
                                Username:
                                <input type="text" name="username" value={formData.username || ''} onChange={handleChange} />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                            </label>
                            </div>
                            <label>
                                Address:
                                <input type="text" name="address" value={formData.address || ''} onChange={handleChange} />
                            </label>
                            <div className='date__system__type'>
                            <label>
                                Date Joined:
                                <input type="date" name="date_joined" value={formData.date_joined || ''} onChange={handleChange} />
                            </label>
                            <label>
                            <label for="solar_system_type">Solar System Type:</label>
                                    <select name="solar_system_type" value={formData.solar_system_type || ''} onChange={handleChange}>
                                        <option value="">Select Solar System Type</option>
                                        <option value="Photovoltaic">Photovoltaic</option>
                                        <option value="Thermal">Thermal</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                            </label>
                            </div>
                            <label>
                                Bills:
                                <input type="text" name="bills" value={formData.bills || ''} onChange={handleChange} />
                            </label>
                            <label>
                                Status:
                                <select name="status" value={formData.status || ''} onChange={handleChange}>
                                    <option value="">Select Status</option>

                                    
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </label>
                            {error && <p className="error-message">{error}</p>}
                            <div className="modal-actions">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button type="button" onClick={handleClose} disabled={isLoading}>Cancel</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditUserModal;
