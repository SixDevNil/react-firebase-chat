import React from "react";
import "./userinfo.css";
import { useUserStore } from "../../../lib/userStore";
const Userinfo = () => {

  const {currentUser} = useUserStore()
  return (
    <div className="userinfo">
      <div className="userinfos">
        <img src={currentUser.avatar ||"/avatar.png"} alt="" className="image" />
        <span> {currentUser.username} </span>
      </div>
      <div className="options">
        <img src="/more.png" alt="" className="icons" />
        <img src="/video.png" alt="" className="icons" />
        <img src="/edit.png" alt="" className="icons" />
      </div>
    </div>
  );
};

export default Userinfo;
