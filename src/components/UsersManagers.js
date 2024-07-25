import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersTable from './UsersTable';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        username: '',
        email: '',
        status: '',
        dateAdded: '',
        idCard: ''
    });

    useEffect(() => {
        axios.get('http://localhost/myapp/solarsystem/src/backend/scripts/users.php')
            .then(response => {console.log(response.data); setUsers(response.data)})
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        console.log('Add new user action triggered');
        // Here you could open a modal or redirect to a form page
    };

    return (
        <div className="user-manager">
            <div className="header">
                <h1>User Management</h1>
                <button onClick={handleAddUser} className="add__user__button">Add New User</button>
            </div>
            <div className="filters">
                <input type="text" placeholder="Filter by Username" name="username" value={filters.username} onChange={handleFilterChange} />
                <input type="text" placeholder="Filter by Email" name="email" value={filters.email} onChange={handleFilterChange} />
                <input type="date" placeholder="Filter by Date Added" name="dateAdded" value={filters.dateAdded} onChange={handleFilterChange} />
                <input type="text" placeholder="Filter by ID Card Number" name="idCard" value={filters.idCard} onChange={handleFilterChange} />
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            <UsersTable users={users} />
        </div>
    );
};

export default UserManager;
