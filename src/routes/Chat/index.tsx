/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import MessagesPage from "./MessageList/index";
import { IMAGE, ITINERARY_STATUS, ICON, API, NAVIGATE } from "../../constants";
import "./index.scss";
import { chatList } from "../../store/Actions/chat";
import dayjs from "dayjs";
import { SET_NAVIGATION } from "../../store/slices/navigation";

const ChatPage = () => {
  const navigate = useNavigate();
  const listInnerRef = useRef(null);

  const chatData = useAppSelector((state) => state.chatList);
  const { page, limit, size, total, data } = chatData;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatList());
    dispatch(SET_NAVIGATION({ value: NAVIGATE.CHAT }));
  }, [dispatch]);

  useEffect(() => {
    if (page === 1 && data.length) {
      let path = `/chat/${data[0].channelRef}`;
      navigate(path);
    }
  }, [page, data, navigate]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(scrollTop, scrollHeight, clientHeight);
      if (scrollTop + clientHeight === scrollHeight) {
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
      }
    }
  };

  return (
    <section className="ChatPage" id="ChatPage">
      <div className="chat-list">
        <div className="heading">
          <div className="heading-text">Chat</div>
        </div>

        <ul className="chat-user-list" onScroll={onScroll} ref={listInnerRef}>
          {data.map((element, index) => {
            return (
              <li
                className="user-chat"
                key={index}
                onClick={() => {
                  let path = `/chat/${element.channelRef}`;
                  navigate(path);
                }}
              >
                <div className="image-view">
                  <img
                    className="user-image"
                    src={IMAGE.SMALL + element.otherUser.image}
                    alt="d"
                  />
                  {element.unseenMessages > 0 && (
                    <div className="unseen-messages"></div>
                  )}
                </div>
                <div className="user-chat-data">
                  <div className="user-chat-name">{element.otherUser.name}</div>
                  <div className="user-chat-time">
                    {dayjs(element.createdOn).format("HH:mm")}
                  </div>
                  <div className="user-chat-message">{element.message}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {data.length > 0 && <MessagesPage />}
    </section>
  );
};

export default ChatPage;
