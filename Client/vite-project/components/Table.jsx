import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    sirname: '',
    email: '',
    password: ''
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch user details using Axios
    axios.get('http://localhost:4000/api/')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        toast.error("Error fetching user details.");
        console.error("Error fetching user details:", error);
      });
  }, [users]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/delete/${id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== id));
        toast.success("User deleted successfully!");
      })
      .catch((error) => {
        toast.error("Error deleting user.");
        console.error("Error deleting user:", error);
      });
  };

  const handleAddUser = () => {
    axios.post('http://localhost:4000/api/add', newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setShowAddModal(false);
        setNewUser({ name: '', sirname: '', email: '', password: '' });
        toast.success("User added successfully!");
      })
      .catch((error) => {
        toast.error("Error adding new user.");
        console.error("Error adding new user:", error);
      });
  };

  const handleOpenUpdateModal = (user) => {
    setCurrentUser(user);
    setShowUpdateModal(true);
  };

  const handleUpdateUser = () => {
    axios.put(`http://localhost:4000/api/update/${currentUser._id}`, currentUser)
      .then((response) => {
        setUsers(users.map(user => user._id === currentUser._id ? response.data : user));
        setShowUpdateModal(false);
        setCurrentUser(null);
        toast.success("User updated successfully!");
      })
      .catch((error) => {
        toast.error("Error updating user.");
        console.error("Error updating user:", error);
      });
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowUpdateModal(false);
    setNewUser({ name: '', sirname: '', email: '', password: '' });
    setCurrentUser(null);
  };

  return (
    <>
      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4a90e2' }}>CRUD Using MERN</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#4a90e2', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sirname</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Password</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.sirname}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.password}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button
                    onClick={() => handleOpenUpdateModal(user)}
                    style={{
                      padding: '5px 10px',
                      marginRight: '5px',
                      backgroundColor: '#ffbb33',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#ff4444',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setShowAddModal(true)} style={{ padding: '10px 20px', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ADD NEW USER +
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3 style={modalTitleStyle}>Add New User</h3>
            <UserForm user={newUser} setUser={setNewUser} onSubmit={handleAddUser} onClose={closeModal} />
          </div>
        </div>
      )}

      {/* Update User Modal */}
      {showUpdateModal && currentUser && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3 style={modalTitleStyle}>Update User</h3>
            <UserForm user={currentUser} setUser={setCurrentUser} onSubmit={handleUpdateUser} onClose={closeModal} />
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

// Helper component for the form used in both Add and Update modals
const UserForm = ({ user, setUser, onSubmit, onClose }) => (
  <>
    <input
      type="text"
      placeholder="Name"
      value={user.name}
      onChange={(e) => setUser({ ...user, name: e.target.value })}
      style={inputStyle}
    />
    <input
      type="text"
      placeholder="Sirname"
      value={user.sirname}
      onChange={(e) => setUser({ ...user, sirname: e.target.value })}
      style={inputStyle}
    />
    <input
      type="email"
      placeholder="Email"
      value={user.email}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
      style={inputStyle}
    />
    <input
      type="password"
      placeholder="Password"
      value={user.password}
      onChange={(e) => setUser({ ...user, password: e.target.value })}
      style={inputStyle}
    />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button onClick={onSubmit} style={submitButtonStyle}>Submit</button>
      <button onClick={onClose} style={cancelButtonStyle}>Cancel</button>
    </div>
  </>
);

const modalStyle = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const modalTitleStyle = { marginBottom: '10px', fontSize: '18px', color: '#4a90e2' };

const inputStyle = {
  width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd',
};

const submitButtonStyle = {
  padding: '10px 20px', backgroundColor: '#4a90e2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
};

const cancelButtonStyle = {
  padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
};

export default UserTable;
