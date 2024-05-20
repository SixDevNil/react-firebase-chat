import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useUserStore } from "../../lib/userStore";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import upload from "../../lib/upload";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);
  const [file, setFile] = useState({
    file: null,
    url: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);
  useEffect(() => {
    if (chatId) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatId, isLoading]);

  useEffect(() => {
    setIsLoading(true);
    // raha tiana hiseho ilay component rehetra na null aza ilay chatId dia io, sinon any @ App no conditionnena
    // if (chatId) {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
      setIsLoading(false);
    });
    return () => {
      unSub();
    };
    // }
  }, [chatId]);

  // console.log(chat.messages);

  const handleEmojiClick = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    // misy soratra ve ? sinon return
    if (text === "" && file.file === null) return;
    var imgUrl = null;
    try {
      setIsLoading(true);
      if (file.file) {
        imgUrl = await upload(file.file);
      }
      //màj chats selon chatId
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          ...(text && { text }),
          createdAt: Date.now(),
          ...(file && { img: imgUrl }),
          // ...(var && {champs : val}) si var exist, champs collection = val, sinon champs n'existe pas
        }),
      });

      // màj userchats de l'envoyeur et du récepteur %id
      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatSnapshot = await getDoc(userChatRef);

        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text
            ? text
            : id === currentUser.id
            ? "vous avez envoyé un objet"
            : "a envoyé un objet";
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          // màj userchats pour avoir le lastMessage
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setFile({
        file: null,
        url: "",
      });
      setText("");
      setIsLoading(false);
    }
  };

  return (
    <div className="chatContainer">
      <div className="top">
        <div className="userInfo">
          <div className="pdp">
            <img
              src={user?.avatar || "/avatar.png"}
              alt="avatar"
              className="avatar"
            />
          </div>
          <div className="info">
            <p className="username">{user?.username || "Chat User"}</p>
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
          <div
            className={
              message.senderId === currentUser.id
                ? "messageItem own"
                : "messageItem"
            }
            key={message.createdAt}
          >
            {message.senderId !== currentUser.id && (
              <img
                src={user?.avatar || "/avatar.png"}
                alt=""
                className="avatar"
              />
            )}
            <div className="message">
              {message.img && (
                <img src={message.img} alt="" className="photoJoint" />
              )}
              {message.text && (
                <div className="textMessage">{message.text}</div>
              )}
              <div className="timesTamp">
                {/* <p>{message.createdAt}</p> */}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <label
          htmlFor="file"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src="/img.png" alt="" className="option" />
        </label>
        <input
          type="file"
          id="file"
          name="file"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        <img src="/camera.png" alt="" className="option" />
        <img src="/mic.png" alt="" className="option" />
        <div className="input">
          <input
            type="text"
            placeholder={
              isReceiverBlocked ? "You cannot type a message" : "Type a message"
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isReceiverBlocked || isCurrentUserBlocked}
          />
          {file.url && <img src={file.url} alt="" className="photo" />}
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
        <button
          className="button"
          onClick={handleSend}
          disabled={isReceiverBlocked || isCurrentUserBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
