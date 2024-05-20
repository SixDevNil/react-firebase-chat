import "./details.css";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Details = () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const {currentUser} = useUserStore()

  const handleLogOut = () => {
    auth.signOut();
    //  fetchUserInfo(null);
  };

  const handleBlock = async () => {

    if(!user) return ;

    const currentUserRef = doc(db, "users", currentUser.id ) ;
    // const userBlockRef = doc(db, "users", user.id ) ;
   
    try {
      // update our blocked array
      changeBlock()
      await updateDoc(currentUserRef, {
        blocked: isReceiverBlocked
          ? arrayRemove(user.id)
          : arrayUnion(user.id),
      });
      // update user blocked
      // await updateDoc(userBlockRef, {
      //   blocked : arrayUnion(currentUser.id)
      // })
    } catch (error) {
      console.log(error);
    }
  }

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
          <div className="mediaDetailsItem">
            <div className="mediaContenu">
              <img src="/conf.webp" alt="" className="media" />
              <div className="description">photo_2024_2.png</div>
            </div>
            <div className="mediaAction">
              <img src="/download.png" alt="" className="icons" />
            </div>
          </div>{" "}
          <div className="mediaDetailsItem">
            <div className="mediaContenu">
              <img src="/conf.webp" alt="" className="media" />
              <div className="description">photo_2024_2.png</div>
            </div>
            <div className="mediaAction">
              <img src="/download.png" alt="" className="icons" />
            </div>
          </div>{" "}
          <div className="mediaDetailsItem">
            <div className="mediaContenu">
              <img src="/conf.webp" alt="" className="media" />
              <div className="description">photo_2024_2.png</div>
            </div>
            <div className="mediaAction">
              <img src="/download.png" alt="" className="icons" />
            </div>
          </div>{" "}
          <div className="mediaDetailsItem">
            <div className="mediaContenu">
              <img src="/conf.webp" alt="" className="media" />
              <div className="description">photo_2024_2.png</div>
            </div>
            <div className="mediaAction">
              <img src="/download.png" alt="" className="icons" />
            </div>
          </div>{" "}
          <div className="mediaDetailsItem">
            <div className="mediaContenu">
              <img src="/conf.webp" alt="" className="media" />
              <div className="description">photo_2024_2.png</div>
            </div>
            <div className="mediaAction">
              <img src="/download.png" alt="" className="icons" />
            </div>
          </div>
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
