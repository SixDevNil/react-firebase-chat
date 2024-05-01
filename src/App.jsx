import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { toast } from "react-toastify";

const App = () => {
  const { currentUser, isLoading } = useUserStore();

  // useEffect(() => {
  //   const unSub = onAuthStateChanged(auth, (user) => {
  //     // fetchUserInfo(user?.uid)
  //     console.log(user);
  //   });
  //   return () => {
  //     unSub();
  //   };
  // },[]);

  
  if (isLoading) {
    toast.success("Loading...");
  }

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Details />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
