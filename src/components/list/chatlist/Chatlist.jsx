import { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [add, setAdd] = useState(false);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    // get realtime data pour la liste des users eo @ chat avy any @ BD, "onSnapshot",
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        // console.log("items :" +items);

        // comme usequeries pour reccueillir les infos des users dans la liste
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...item, user };
        });

        // utiliser quand le rendement est asynchrone
        const chatData = await Promise.all(promises);

        // màj du state Chats @ plus récent
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

  const handleMessage = async (chat) => {
    changeChat(chat.chatId, chat.user);
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
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleMessage(chat)}
          >
            <div className="avatarContainer">
              <img
                src={chat.user.avatar || "/avatar.png"}
                alt="avatar"
                className="userImage"
              />
            </div>
            <div className="infoChat">
              <span>{chat.user.username}</span>
              <p style={{color : "grey"}}>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      {add && <AddUser />}
    </div>
  );
};

export default Chatlist;
