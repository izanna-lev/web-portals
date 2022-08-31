/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import { useNavigate } from "react-router-dom";
import { DUMMY } from "./dummy";
import MessagesPage from "./MessageList/index";

import "./index.scss";
import { useRef } from "react";

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
  const listInnerRef = useRef(null);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(scrollTop, scrollHeight, clientHeight)
      if (scrollTop + clientHeight === scrollHeight) {
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
      }
    }
  };

  return (
    <section className="ChatPage" id="ChatPage">
      <div className="chat-list" >
        <div className="heading">
          <div className="heading-text">Chat</div>
        </div>

        <ul className="chat-user-list" onScroll={onScroll}
          ref={listInnerRef}>
          {DUMMY.map((element, index) => {
            return (
              <li
                className="user-chat"
                key={index}
                onClick={() => {
                  let path = `/chat/${index}`;
                  navigate(path);
                }}
              >
                <div className="image-view">
                  <img className="user-image" src={element.image} alt="d" />
                  {element.unseen > 0 && (
                    <div className="unseen-messages"></div>
                  )}
                </div>
                <div className="user-chat-data">
                  <div className="user-chat-name">{element.name}</div>
                  <div className="user-chat-time">{element.date}</div>
                  <div className="user-chat-message">{element.message}</div>
                </div>
              </li>
            );
          })}
        </ul>
        

      </div>
      <MessagesPage />
    </section>
  );
};

export default ChatPage;
