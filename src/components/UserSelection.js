import React from 'react';
import '../components/UserSelection.css'
function UserSelection({ users, setCurrentUser }) {
  const showUserSelection = () => {
      return users.map((user, index) => (
          <li key={index} className="user">
              {user.name} - {user.role}
              <button onClick={() => setCurrentUser(user)}>Select</button>
          </li>
      ));
  };

  return (
      <div id="userSelection" className="selection-panel">
          <h2>Select User</h2>
          <ul id="userSelectList">
              {showUserSelection()}
          </ul>
      </div>
  );
}

export default UserSelection;