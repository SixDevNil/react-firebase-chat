import React, { useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";

const Chatlist = () => {
  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    setAdd(!add);
  };

  return (
    <div className="chatlist">
      <div className="searchContainer">
        <div className="left">
          <img src="/search.png" alt="searchIcon" className="icon" />
          <input type="text" placeholder="Search" />
        </div>
        <div className="right">
          <img
            src={add ? "/minus.png" : "plus.png"}
            alt=""
            className="icon"
            onClick={handleAdd}
          />
        </div>
      </div>
      <div className="chatItem">
        <div className="item">
          <div className="avatarContainer">
            <img src="/avatar.png" alt="avatar" className="userImage" />
          </div>
          <div className="infoChat">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>
        <div className="item">
          <div className="avatarContainer">
            <img src="/avatar.png" alt="avatar" className="userImage" />
          </div>
          <div className="infoChat">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>{" "}
        <div className="item">
          <div className="avatarContainer">
            <img src="/avatar.png" alt="avatar" className="userImage" />
          </div>
          <div className="infoChat">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>{" "}
        <div className="item">
          <div className="avatarContainer">
            <img src="/avatar.png" alt="avatar" className="userImage" />
          </div>
          <div className="infoChat">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>{" "}
        <div className="item">
          <div className="avatarContainer">
            <img src="/avatar.png" alt="avatar" className="userImage" />
          </div>
          <div className="infoChat">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>{" "}
        <div className="item">
          <div className="avatarContainer">
            <img src="/avatar.png" alt="avatar" className="userImage" />
          </div>
          <div className="infoChat">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>{" "}
        <div className="item">
          <div className="avatarContainer">
            <img src="/avatar.png" alt="avatar" className="userImage" />
          </div>
          <div className="infoChat">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>{" "}
        <div className="item">
          <div className="avatarContainer">
            <img src="/avatar.png" alt="avatar" className="userImage" />
          </div>
          <div className="infoChat">
            <span>Jane Doe</span>
            <p>Hello</p>
          </div>
        </div>
      </div>
      {add && <AddUser/>}
    </div>
  );
};

export default Chatlist;
