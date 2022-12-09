/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import MessagesPage from "./MessageList/index";
import "./index.scss";
import { chatList } from "../../store/Actions/chat";
import dayjs from "dayjs";
import { UserIcon } from "../../components/UserIcon";
import { compareAbsoluteDates } from "../../util";

const ChatPage = () => {
  const { page, limit, size, total, data } = useAppSelector(
    (state) => state.chatList
  );
  const { totalUnseenChats } = useAppSelector((state) => state.chatList);

  const listInnerRef = useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { channelId } = useParams();

  useEffect(() => {
    dispatch(chatList());
  }, [dispatch]);

  // useEffect(() => {
  //   if (page === 1 && data.length) {
  //     const path = `/chat/${data[0].channelRef}`;
  //     navigate(path);
  //   }
  // }, [data, navigate, page]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      // console.log(scrollTop, scrollHeight, clientHeight);
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
          <div className="heading-text chat-top-heading">
            Chat &nbsp;
            {totalUnseenChats ? (
              <div className="sidebar-count">
                <span className="sidebar-count-view">{totalUnseenChats}</span>
              </div>
            ) : null}
          </div>
        </div>

        <ul className="chat-user-list" onScroll={onScroll} ref={listInnerRef}>
          {data.map((element, index) => (
            <li
              className={`${
                channelId === element.channelRef ? "chat-active" : ""
              } user-chat`}
              key={index}
              onClick={() => {
                const path = `/chat/${element.channelRef}`;
                navigate(path);
              }}
            >
              <div className="image-view">
                <UserIcon
                  image={element.otherUser.image}
                  width={"2.5rem"}
                  height={"2.5rem"}
                />

                {element.unseenMessages > 0 && (
                  <div className="unseen-messages"></div>
                )}
              </div>
              <div className="user-chat-data">
                <div className="user-chat-name">{element.otherUser.name}</div>
                <div className="user-chat-time">
                  {element.message?.createdOn
                    ? compareAbsoluteDates(element.message?.createdOn)
                      ? dayjs(element.message?.createdOn).format("hh:mm A")
                      : dayjs(element.message?.createdOn).format("DD-MMM-YYYY")
                    : null}
                </div>
                <div className="user-chat-message">
                  {element.message
                    ? element.message?.messageType === 1
                      ? element.message?.message
                      : "Image"
                    : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {data.length ? <MessagesPage /> : null}
    </section>
  );
};

export default ChatPage;
