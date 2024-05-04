import React, { useState } from "react";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "./addUser.css";
import {db} from '../../../../lib/firebase'
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const {currentUser} = useUserStore()

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapShot = await getDocs(q)

      if(!querySnapShot.empty){
        setUser(querySnapShot.docs[0].data());
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddUser = async (e) => {
    const chatRef = collection(db, "chats");
    const userChats = collection(db, "userchats");
    try {
      const newChatRef = doc(chatRef);

      // création collection chats, ilay message eo @ zone de chat
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // message reçu
      await updateDoc(doc(userChats, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      // message envoyé
      await updateDoc(doc(userChats, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      console.log(newChatRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addUser">
      <div className="searchUser">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="search"
            placeholder="Username"
            name="username"
          />
          <button>Search</button>
        </form>
      </div>
      {user && <div className="userContainer">
        <div className="userInfos">
          <img src={user.avatar || "./avatar.png"} alt="" />
          <span>{user.username}</span>
        </div>
        <button onClick={handleAddUser}>Add User</button>
      </div>}
    </div>
  );
};

export default AddUser;
