import React from "react";
import "./addUser.css" ;
const AddUser = () => {
  return (
    <div className="addUser">
      <div className="searchUser">
        <input type="text" className="search" placeholder="Username" />
        <button>Search</button>
      </div>
      <div className="userContainer">
        <div className="userInfos">
          <img src="./avatar.png" alt="" />
          <span>Jane Doe</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
};

export default AddUser;
