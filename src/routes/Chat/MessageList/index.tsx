/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import { useNavigate } from "react-router-dom";

import { IoSend } from "react-icons/io5";
import { DUMMY } from "./dummy";

import { BsPlus } from "react-icons/bs";
import "./index.scss";

type Props = {
  navPaths: Array<{
    key: number;
    path: string;
    name: string;
    state: number;
    element: JSX.Element;
    icon: JSX.Element;
  }>;
};
const ChatPage = () => {
  const navigate = useNavigate();

  let newMessage = DUMMY;
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
      </div>
      <ul className="message-data">
          {DUMMY.map((element, index) => {
            return (
              <li className={`user-message ${element.name === "Jaggi" ? "": "other-user"}`}>
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
<BsPlus className="img"/>
      </label>

           
        </div>
        <input type="text" className="socket-input"/>
        <div className="send-icon">
          <IoSend className="send-img" />
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
