import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useUserStore } from "../../lib/userStore";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);

  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    // raha tiana hiseho ilay componnet rehetra na null aza ilay chatId dia io, sinon any @ App no conditionnena
    // if (chatId) {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
    // }
  }, [chatId]);

  console.log(chat);

  const handleEmojiClick = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };


  const handleSend = async () => {
    if (text === "") return;
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Date.now(),
        }),
      });

      const userIds = [currentUser.id, user.id] ;

      userIds.forEach( async(id) => {

        const userChatRef = doc(db, "userchats", id) ;
        const userChatSnapshot = await getDoc(userChatRef) ;
  
        if (userChatSnapshot.exists()){
          const userChatsData = userChatSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      })

     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatContainer">
      <div className="top">
        <div className="userInfo">
          <div className="pdp">
            <img
              src={user.avatar || "/avatar.png"}
              alt="avatar"
              className="avatar"
            />
          </div>
          <div className="info">
            <p className="username">{user.username}</p>
            <span className="detail">Lorem ipsum dolor sit amet.</span>
          </div>
        </div>
        <div className="options">
          <img src="/phone.png" alt="" className="option" />
          <img src="/video.png" alt="" className="option" />
          <img src="/info.png" alt="" className="option" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div className="messageItem own" key={message.createdAt}>
            <img src="/avatar.png" alt="" className="avatar" />
            <div className="message">
              {message.img && (
                <img src={message.img} alt="" className="photoJoint" />
              )}
              <div className="textMessage">{message.text}</div>
              <div className="timesTamp">
                {/* <p>{message.createdAt}</p> */}
              </div>
            </div>
          </div>
        ))}

        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <img src="/img.png" alt="" className="option" />
        <img src="/camera.png" alt="" className="option" />
        <img src="/mic.png" alt="" className="option" />
        <div className="input">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <img
          src="/emoji.png"
          alt=""
          className="option"
          onClick={() => setOpen((prev) => !prev)}
        />
        <EmojiPicker
          open={open}
          onEmojiClick={handleEmojiClick}
          className="emoji"
        />
        <button className="button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
