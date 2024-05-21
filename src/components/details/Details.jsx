import "./details.css";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Details = () => {
  const [images, setImages] = useState("");

  const { user, chatId, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleLogOut = () => {
    auth.signOut();
    //  fetchUserInfo(null);
  };

  const handleBlock = async () => {
    if (!user) return;

    const currentUserRef = doc(db, "users", currentUser.id);
    // const userBlockRef = doc(db, "users", user.id ) ;

    try {
      // update our blocked array
      changeBlock();
      await updateDoc(currentUserRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      // update user blocked
      // await updateDoc(userBlockRef, {
      //   blocked : arrayUnion(currentUser.id)
      // })
    } catch (error) {
      console.log(error);
    }
  };

  const chatImgRef = doc(db, "chats", chatId);
  // setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
  useEffect(() => {
    const unSub = onSnapshot(chatImgRef, (res) => {
      setImages(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  // console.log(images?.messages);

  return (
    <div className="detailContainer">
      <div className="infoUser">
        <img src={user?.avatar || "/avatar.png"} alt="" className="pdp" />
        <span className="nameUser">{user?.username || "Chat User"}</span>
        <span className="bioUser">Lorem ipsum dolor sit amet.</span>
      </div>
      <div className="details">
        <div className="item">
          <p>Chat Settings</p>
          <div className="imgContainer">
            <img src="/arrowUp.png" alt="" className="icons" />
          </div>
        </div>{" "}
        <div className="item">
          <p>Privacy & help</p>
          <div className="imgContainer">
            <img src="/arrowUp.png" alt="" className="icons" />
          </div>
        </div>{" "}
        <div className="item">
          <p>Shared photos</p>
          <div className="imgContainer">
            <img src="/arrowDown.png" alt="" className="icons" />
          </div>
        </div>{" "}
        <div className="mediaDetails">
          {images?.messages?.map((image) => (
            <div className="mediaDetailsItem" key={image.createdAt}>
              {image.img && (
                <>
                  <div className="mediaContenu">
                    <img src={image.img} alt="" className="media" />
                    <div className="description">{image.createdAt}</div>
                  </div>
                  <div className="mediaAction">
                    <img src="/download.png" alt="" className="icons" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="item">
          <p>Shared files</p>
          <div className="imgContainer">
            <img src="/arrowUp.png" alt="" className="icons" />
          </div>
        </div>{" "}
      </div>
      <div className="action">
        <button className="actionButton" onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "Get Blocked"
            : isReceiverBlocked
            ? "Blocked"
            : "Block User"}
        </button>{" "}
        <button className="logout" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Details;
