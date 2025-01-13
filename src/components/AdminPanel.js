import React, { useState } from "react";
import '../components/AdminPanel.css';

function AdminPanel({ users, setUsers, tasks, setTasks }) {
  const [newUserName, setNewUserName] = useState("");
  const [userRole, setUserRole] = useState("manager");
  const [selectedExecutant, setSelectedExecutant] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);

 
  const addUser = () => {
    if (newUserName.trim()) {
      setUsers((prevUsers) => [
        ...prevUsers,
        { name: newUserName.trim(), role: userRole, manager: null },
      ]);
      setNewUserName(""); 
    }
  };

 
  const assignManager = () => {
    if (selectedExecutant !== null && selectedManager !== null) {
      const updatedUsers = [...users];
      updatedUsers[selectedExecutant].manager = updatedUsers[selectedManager].name;
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="panel">
      <h2>Admin Panel</h2>

      {/* Create Account Section */}
      <h3>Create account</h3>
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="User Name"
      />
      <select
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
      >
        <option value="manager">Manager</option>
        <option value="executant">Executant</option>
      </select>
      <button onClick={addUser}>Add User</button>

      {/* Assign Manager Section */}
      <h3>Assign Manager to Executant</h3>
      <div>
        <label>Executants:</label>
        <select
          value={selectedExecutant || ""}
          onChange={(e) => setSelectedExecutant(parseInt(e.target.value, 10))}
        >
          <option value="" disabled>Select Executant</option>
          {users
            .map((user, index) => ({ ...user, index }))
            .filter((user) => user.role === "executant")
            .map((user) => (
              <option key={user.index} value={user.index}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Managers:</label>
        <select
          value={selectedManager || ""}
          onChange={(e) => setSelectedManager(parseInt(e.target.value, 10))}
        >
          <option value="" disabled>Select Manager</option>
          {users
            .map((user, index) => ({ ...user, index }))
            .filter((user) => user.role === "manager")
            .map((user) => (
              <option key={user.index} value={user.index}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
      <button onClick={assignManager}>Assign Manager</button>

      {/* Users List */}
      <h3>Users List</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.role}
            {user.manager && ` (Manager: ${user.manager})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
