import React from "react";
import "./details.css";

const Details = () => {
  return (
    <div className="detailContainer">
      <div className="infoUser">
        <img src="/avatar.png" alt="" className="pdp" />
        <span className="nameUser">Jane Doe</span>
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
        <button className="actionButton">Block User</button>{" "}
        <button className="logout">Logout</button>
      </div>
    </div>
  );
};

export default Details;
