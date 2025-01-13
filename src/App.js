import React, { useState, useEffect } from "react";
import UserSelection from './components/UserSelection';
import ManagerPanel from './components/ManagerPanel';
import AdminPanel from './components/AdminPanel';
import ExecutantPanel from './components/ExecutantPanel';
import './design/App.css';

function App() {
  const [users, setUsers] = useState([{ name: 'Admin', role: 'admin' }]);
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const saveData = () => {
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const loadData = () => {
      const savedUsers = localStorage.getItem('users');
      const savedTasks = localStorage.getItem('tasks');

      if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
      }

      if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
      }
  };

  const deleteData = () => {
      setUsers([{ name: 'Admin', role: 'admin' }]);
      setTasks([]);
      saveData();
      showUserSelection();
  };

  const showUserSelection = () => {
      setCurrentUser(null);
  };

  useEffect(() => {
      loadData();
  }, []);

  return (
      <div>
        <header>
            <h1>Task Planner</h1>
        </header>
          {!currentUser ? (
              <UserSelection users={users} setCurrentUser={setCurrentUser} onClearData={deleteData}/>
          ) : (
              <>
                  <button onClick={() => setCurrentUser(null)}>Back To Users</button>
                  {currentUser.role === 'admin' && (
                      <AdminPanel users={users} setUsers={setUsers} tasks={tasks} setTasks={setTasks} />
                  )}
                  {currentUser.role === 'manager' && (
                      <ManagerPanel users={users} tasks={tasks} setTasks={setTasks} />
                  )}
                  {currentUser.role === 'executant' && (
                      <ExecutantPanel tasks={tasks} currentUser={currentUser} setTasks={setTasks} />
                  )}
                  <button onClick={deleteData}>Clear Data</button>
              </>
          )}
      </div>
  );
}

export default App;