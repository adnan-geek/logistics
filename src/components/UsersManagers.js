import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientsTable from './ClientsTable';
import EditUserModal from './EditUserModal';
import '../styles/main.css';

const UserManager = () => {
    const [users, setUsers] = useState([]); // Original users
    const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users to display
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
        fetchUsers();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, users]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        setIsModalOpen(true);
        setEditingUser(null);
    };

    const handleEditUser = (userId) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setEditingUser(user);
            setIsModalOpen(true);
        }
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost/myapp/solarsystem/src/backend/scripts/edit-user.php?id=${userId}`)
                .then(response => {
                    fetchUsers(); // Refresh the user list after deletion
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const fetchUsers = () => {
        axios.get('http://localhost/myapp/solarsystem/src/backend/scripts/users.php')
            .then(response => {
                console.log(response); // Initially, display all users

                setUsers(response.data);

                setFilteredUsers(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const applyFilters = () => {
        const filtered = users.filter(user => {
            return Object.keys(filters).every(key => {
                if (!filters[key]) return true;
                if (key === 'dateAdded') {
                    return new Date(user[key]).toISOString().split('T')[0] === new Date(filters[key]).toISOString().split('T')[0];
                }
                return user[key]?.toLowerCase().includes(filters[key].toLowerCase());
            });
        });
        setFilteredUsers(filtered);
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
            <ClientsTable users={filteredUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />
            {isModalOpen && editingUser && 
                <EditUserModal user={editingUser} onClose={handleCloseModal} updateData={fetchUsers} />
            }
        </div>
    );
};

export default UserManager;
