import { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [add, setAdd] = useState(false);

  const { currentUser } = useUserStore();
  const { chatId, changeChat, isReceiverBlocked } = useChatStore();

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
    const userchats = chats.map((item) => {
      const { user, ...others } = item;
      return others;
    });

    const chatIndex = userchats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userchats[chatIndex].isSeen = true;

    const userChatRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: userchats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }

    // afaka atao an'ito fa mavesatra ,y requette satria efa azo etsy ambony ny userchats dia natao anaty others destructuré
    // const userChatRef = doc(db, "userchats", currentUser.id);
    // const userChatSnapshot = await getDoc(userChatRef);

    // if (userChatSnapshot.exists()) {
    //   const userChatsData = userChatSnapshot.data();
    //   const chatIndex = userChatsData.chats.findIndex(
    //     (c) => c.chatId === chatId
    //   );
    //   userChatsData.chats[chatIndex].isSeen = true ;

    //   // màj userchats pour avoir le lastMessage
    //   await updateDoc(userChatRef, {
    //     chats: userChatsData.chats,
    //   });
    // }
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
            style={{
              backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
            }}
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
              <p style={{ color: "whitesmoke" }}>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      {add && <AddUser />}
    </div>
  );
};

export default Chatlist;
 