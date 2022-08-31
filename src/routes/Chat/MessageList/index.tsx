/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import { IoSend } from "react-icons/io5";
import { DUMMY } from "./dummy";
import LoginSpinner from "../../../components/LoginSpinner";

import { BsPlus } from "react-icons/bs";
import "./index.scss";
import { useAppSelector } from "../../../store/hooks";
import { useRef, useState } from "react";

const ChatPage = () => {
  const show = useAppSelector((state: { loader: { value: boolean; }; }) => state.loader.value);
  const listInnerRef = useRef(null);

  const [theArray, setTheArray] = useState(DUMMY);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(Math.ceil( Math.abs(scrollTop)), clientHeight, scrollHeight )
      if (Math.ceil( Math.abs(scrollTop)) + clientHeight + 20 >= scrollHeight) {
        setTheArray([...theArray, ...DUMMY]);
      }
    }
  };


  return (
    <section className="MessagePage" id="MessagePage">
      <div className="user-data">
        <img
          className="user-image"
          src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
          alt="msg-image"
        />
        <div className="user-name">Jaggi</div>
      </div>

      <div className="itinerary-details">
        <img
          className="user-image"
          src="https://sneakers-app.s3.amazonaws.com/staging/images/small/staging-image-1658749914901-223"
          alt="msg-image"
        />
        <div className="itinerary-data">
          <div className="itinerary-text date">30-Sept-2022</div>
          <div className="itinerary-text">Singapore</div>
        </div>
        {show && <LoginSpinner position="relative" />}
      </div>
      <ul className="message-data"
        onScroll={onScroll}
        ref={listInnerRef}>
        {theArray.map((element, index) => {
          return (
            <li className={`user-message ${element.name === "Jaggi" ? "" : "other-user"}`}>
              {element.message}
              <div className="message-date">10:10AM</div>
            </li>

          );
        })}
      </ul>

      <div className="socket">
        <div className="add-icon">
          <input
            type="file"
            id="upload"
            accept="image/*"
            hidden
          />
          <label
            htmlFor="upload"
          >
            <BsPlus className="img" />
          </label>


        </div>
        <input type="text" className="socket-input" />
        <div className="send-icon">
          <IoSend className="send-img" />
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
