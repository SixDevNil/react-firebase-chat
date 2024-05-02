import  { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [add, setAdd] = useState(false);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chat;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

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
        {chats.map((chat) => (
            <div className="item" key={chat.chatID}>
              <div className="avatarContainer">
                <img src="/avatar.png" alt="avatar" className="userImage" />
              </div>
              <div className="infoChat">
                <span>Jane Doe</span>
                <p>Hello</p>
              </div>
            </div>
          ))}
      </div>
      {add && <AddUser />}
    </div>
  );
};

export default Chatlist;
