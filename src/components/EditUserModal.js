import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EditUserModal = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState({ ...user });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFormData({ ...user });
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

        try {
            const response = await axios.post('http://localhost/myapp/solarsystem/src/backend/scripts/edit-user.php', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            onSave(response.data);  // Pass the updated user data from the server
            onClose(); // Close the modal after successful update
        } catch (err) {
            setError(err.response?.data?.message || 'TESTFailed to update user data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <h2>Edit User</h2>
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Address:
                        <input type="text" name="address" value={formData.address || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Date Joined:
                        <input type="date" name="date_joined" value={formData.date_joined || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Solar System Type:
                        <input type="text" name="solar_system_type" value={formData.solar_system_type || ''} onChange={handleChange} />
                    </label>
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
                        <button type="button" onClick={onClose} disabled={isLoading}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;