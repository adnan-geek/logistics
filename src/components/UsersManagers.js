import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersTable from './UsersTable';
import EditUserModal from './EditUserModal';
import '../styles/main.css';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        username: '',
        email: '',
        status: '',
        dateAdded: '',
        idCard: ''
    });
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const handleEditUser = (userId) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setEditingUser(user);
            setIsModalOpen(true);  // Open the modal
        }
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost/myapp/solarsystem/src/backend/scripts/users.php?id=${userId}`)
                .then(response => {
                    setUsers(response.data);  // Assuming the API returns the updated list
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        axios.get('http://localhost/myapp/solarsystem/src/backend/scripts/users.php')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => console.error('Error fetching data:', error));
    };


// Pass `fetchUsers` to `EditUserModal` when opening it


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
            <UsersTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
            {isModalOpen && editingUser && 
                <EditUserModal user={editingUser} onClose={handleCloseModal} />
            }
        </div>
    );
};

export default UserManager;
