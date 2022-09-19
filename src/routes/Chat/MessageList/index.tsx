/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import LoginSpinner from "../../../components/LoginSpinner";
import { IoSend } from "react-icons/io5";
import { DUMMY } from "./dummy";

import { useAppSelector } from "../../../store/hooks";
import { useEffect, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import Socket from "../../../services/socket";

import "./index.scss";
import { useParams } from "react-router-dom";

const MessagePage = () => {
  const profileData = useAppSelector((state) => state.profile);
  const show = useAppSelector(
    (state: { loader: { active: boolean } }) => state.loader.active
  );

  const listInnerRef = useRef(null);

  const { channelId } = useParams();




  useEffect(() => {
    console.log("===========profileData====", profileData)
    Socket.subscribeChannel({
      channelRef: channelId,
      id: profileData._id
    })
  }, [channelId]);

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
    }
  };

  const [theArray, setTheArray] = useState(DUMMY);
  const [message, setMessage] = useState('');

  const onScroll = () => {
    // if (listInnerRef.current) {
    //   const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    //   console.log(Math.ceil(Math.abs(scrollTop)), clientHeight, scrollHeight);
    //   if (Math.ceil(Math.abs(scrollTop)) + clientHeight + 20 >= scrollHeight) {
    //     setTheArray([...theArray, ...DUMMY]);
    //   }
    // }
  };

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter' && message) {
      setTheArray([{
        "name": "Jaggi ji",
        "image": "https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223",
        "message": message,
        "date": "10:10 AM",
        "unseen": 4
      }, ...theArray])
      Socket.sendMessage({
        channelRef: channelId,
        message,
        id: profileData._id,
        messageType: 1,
        type: 2

      })
      document.getElementsByClassName('socket-input')[0].innerHTML = '';
    }
  }


  return (
    <section className="MessagePage" id="MessagePage">
      <div className="user-data">
        <img
          className="user-image"
          src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
          alt="msg"
        />
        <div className="user-name">Jaggi</div>
      </div>

      <div className="itinerary-details">
        <img
          className="user-image"
          src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
          alt="msg"
        />
        <div className="itinerary-data">
          <div className="itinerary-text date">30-Sept-2022</div>
          <div className="itinerary-text">Singapore</div>
        </div>
        {show && <LoginSpinner position="relative" />}
      </div>
      <ul className="message-data" onScroll={onScroll} ref={listInnerRef}>
        {theArray.map((element, index) => {
          return (
            <li
              className={`user-message ${element.name === "Jaggi" ? "" : "other-user"
                }`}
            >
              {element.message}
              <div className="message-date">10:10AM</div>
            </li>
          );
        })}
      </ul>

      <div className="socket">
        <div className="add-icon">
          <input type="file" id="upload"  
          onChange={imageChange}
       accept="image/*" hidden />
          <label htmlFor="upload">
            <BsPlus className="img" />
          </label>
        </div>
        <div contentEditable="true"
          className="socket-input"
          onInput={e => setMessage(e.currentTarget.textContent || "")} onKeyPress={handleKeyPress} />
        <div className="send-icon">
          <IoSend className="send-img" />
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
