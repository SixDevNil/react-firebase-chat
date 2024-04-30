import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const imgUrl = await upload(avatar.file);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chat: [],
      });

      toast.success("user created");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login">
      <div className="left">
        <h1>Welcome back,</h1>
        <form action="" onSubmit={handleLogIn}>
          <input
            type="text"
            className="infos"
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            className="infos"
            placeholder="Password"
            name="password"
          />
          <button>Sign in</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="right">
        <h1>Create an Account</h1>
        <form action="" onSubmit={handleRegister}>
          <div className="imageControllers">
            <img src={avatar.url || "./avatar.png"} alt="" />
            <label htmlFor="photo" style={{ cursor: "pointer" }}>
              Upload an image
            </label>
            <input
              type="file"
              name="file"
              id="photo"
              className="file"
              onChange={handleURL}
            />
          </div>
          <input
            type="text"
            className="infos"
            placeholder="Username"
            name="username"
          />
          <input
            type="text"
            className="infos"
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            className="infos"
            placeholder="Password"
            name="password"
          />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
