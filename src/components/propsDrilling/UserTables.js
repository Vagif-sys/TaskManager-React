import React, { useState, createContext } from "react";
import UserList from "../../components/propsDrilling/UserList";
import { peopleData } from "../../people-data";
import UserContext from "../context/userContext";

function UserTables() {
  const [users, setusers] = useState(peopleData);

  const deleteUserHandler = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setusers(newUsers);
  };

  return (
    <UserContext.Provider  value={{users, deleteUserHandler}}>
      <div className="--flex-center ">
        <div className="--width-500px --my">
          <h2>Props Drilling</h2>
          <UserList/>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default UserTables;
