import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [])

  const handleEmojiClick = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const {currentUser} = useUserStore()

  return (
    <div className="chatContainer">
      <div className="top">
        <div className="userInfo">
          <div className="pdp">
            <img src={currentUser.avatar || "/avatar.png"} alt="avatar" className="avatar" />
          </div>
          <div className="info">
            <p className="username">{currentUser.username}</p>
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
        <div className="messageItem">
          <img src="/avatar.png" alt="" className="avatar" />
          <div className="message">
            <div className="textMessage">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
              fuga dolorum id eaque amet reprehenderit natus sit eligendi
              maiores blanditiis perferendis et, ratione iure ipsam facere
              obcaecati ipsum officiis alia
            </div>
            <div className="timesTamp">
              <p>1 min ago</p>
            </div>
          </div>
        </div>{" "}
        <div className="messageItem">
          <img src="/avatar.png" alt="" className="avatar" />
          <div className="message">
            <div className="textMessage">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
              fuga dolorum id eaque amet reprehenderit natus sit eligendi
              maiores blanditiis perferendis et, ratione iure ipsam facere
              obcaecati ipsum officiis alias.
            </div>
            <div className="timesTamp">
              <p>1 min ago</p>
            </div>
          </div>
        </div>{" "}
        <div className="messageItem">
          <img src="/avatar.png" alt="" className="avatar" />
          <div className="message">
            <div className="textMessage">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
              fuga dolorum id eaque amet reprehenderit natus sit eligendi
              maiores blanditiis perferendis et, ratione iure ipsam facere
              obcaecati ipsum officiis alias.
            </div>
            <div className="timesTamp">
              <p>1 min ago</p>
            </div>
          </div>
        </div>{" "}
        <div className="messageItem own">
          <div className="message">
            <div className="textMessage">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
              fuga dolorum id eaque amet reprehenderit natus sit eligendi
              maiores blanditiis perferendis et, ratione iure ipsam facere
              obcaecati ipsum officiis alias.
            </div>
            <div className="timesTamp">
              <p>1 min ago</p>
            </div>
          </div>
        </div>
        <div className="messageItem own">
          <div className="message">
            <img src="/conf.webp" alt="" className="photoJoint"/>
            <div className="textMessage" >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
              fuga dolorum id eaque amet reprehenderit natus sit eligendi
              maiores blanditiis perferendis et, ratione iure ipsam facere
              obcaecati ipsum officiis alias.
            </div>
            <div className="timesTamp">
              <p>1 min ago</p>
            </div>
          </div>
        </div>
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
        <button className="button">Send</button>
      </div>
    </div>
  );
};

export default Chat;
