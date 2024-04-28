import React, { useEffect, useState } from "react";
import "./login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleURL = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleNotification = (e) => {
    e.preventDefault();
    toast.success("ao ??");
  };

  return (
    <div className="login">
      <div className="left">
        <h1>Welcome back,</h1>
        <input type="text" className="infos" placeholder="Email" />
        <input type="password" className="infos" placeholder="Password" />
        <button>Sign In</button>
      </div>
      <div className="right">
        <h1>Create an Account</h1>
        <div className="imageControllers">
          <img src={avatar.url || "./avatar.png"} alt="" />
          <label htmlFor="photo" style={{ cursor: "pointer" }}>
            Upload an image
          </label>
          <input
            type="file"
            name=""
            id="photo"
            className="file"
            onChange={handleURL}
          />
        </div>
        <input type="text" className="infos" placeholder="Username" />
        <input type="text" className="infos" placeholder="Email" />
        <input type="password" className="infos" placeholder="Password" />
        <button onClick={handleNotification}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
