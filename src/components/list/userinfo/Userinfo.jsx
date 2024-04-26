import React from "react";
import "./userinfo.css";
const Userinfo = () => {
  return (
    <div className="userinfo">
      <div className="userinfos">
        <img src="/avatar.png" alt="" className="image" />
        <span> John Doe </span>
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
