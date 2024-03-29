/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import LoginSpinner from "../../../components/LoginSpinner";
import Image from "../../../components/Image";
import { IoSend } from "react-icons/io5";
import { messageList } from "../../../store/Actions/messageList";
import { uploadImage } from "../../../store/Actions/uploadImage";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useEffect, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";

import "./index.scss";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { IMAGE, TYPE_OF_MESSAGE, USER_TYPE } from "../../../constants";
import { UserIcon } from "../../../components/UserIcon";
import NoChatActive from "../NoChatActive";
import { ICON } from "../../../assets/index";
import Socket from "../../../services/socket";
import { compareAbsoluteDates } from "../../../util";
import { socket } from "../../../components/Socket";

const MessagePage = () => {
  const [messages, newMessage] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [noChatActive, setNoChatActive] = useState(true);
  const [messageType, setmessageType] = useState(false);
  const [messageLink, setmessageLink] = useState(false);

  const { messages: messageData, itinerary: itineraryData } = useAppSelector(
    (state) => state.messageList
  );
  const profileData = useAppSelector((state) => state.profile);
  const show = useAppSelector((state) => state.loader.active);

  const dispatch = useAppDispatch();
  const listInnerRef = useRef(null);
  const { channelId } = useParams();

  const div = document.getElementById("input-message");

  useEffect(() => {
    if (channelId && messageData) {
      newMessage(messageData);
      setNoChatActive(false);
      div?.focus();
    }
  }, [messageData, channelId, div]);

  useEffect(() => {
    if (socket.connected && channelId && profileData._id) {
      Socket.subscribeChannel({
        channelRef: channelId,
        id: profileData._id,
      });
      Socket.chatRead({
        channelRef: channelId,
        id: profileData._id,
      });

      dispatch(messageList(channelId));
    }
  }, [channelId, profileData._id, dispatch, socket.connected]);

  if (socket.connected)
    socket.on("message", (data: any) => {
      newMessage([
        {
          userRef: data.userId,
          createdOn: new Date(),
          ...data,
        },
        ...messages,
      ]);
    });

  const imageChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      // console.log(e.target.files[0]);
      let resp: any = { data: "" };
      resp = await dispatch(
        uploadImage({
          file: e.target.files[0],
          channelRef: channelId,
          id: profileData._id,
          messageType: TYPE_OF_MESSAGE.IMAGE,
          type: USER_TYPE.SPECIALIST,
        })
      );

      setmessageType(false);

      Socket.sendMessage({
        channelRef: channelId,
        message: resp.data,
        id: profileData._id,
        messageType: TYPE_OF_MESSAGE.IMAGE,
        type: USER_TYPE.SPECIALIST,
      });

      e.target.value = null;
    }
  };

  const onScroll = () => {
    // if (listInnerRef.current) {
    //   const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    //   console.log(Math.ceil(Math.abs(scrollTop)), clientHeight, scrollHeight);
    //   if (Math.ceil(Math.abs(scrollTop)) + clientHeight + 20 >= scrollHeight) {
    //     setTheArray([...theArray, ...DUMMY]);
    //   }
    // }
  };

  const handleKeyPress = (event: any, key: string) => {
    if ((event.key === "Enter" || key === "Enter") && message) {
      Socket.sendMessage({
        channelRef: channelId,
        message,
        id: profileData._id,
        messageType: messageLink ? TYPE_OF_MESSAGE.LINK : TYPE_OF_MESSAGE.TEXT,
        type: USER_TYPE.SPECIALIST,
      });

      document.getElementsByClassName("socket-input")[0].innerHTML = "";
      if (messageLink) setmessageLink(false);
    }
  };

  return (
    <section className="MessagePage" id="MessagePage">
      {noChatActive ? (
        <NoChatActive />
      ) : (
        <>
          {messageData ? (
            <>
              <div className="user-data">
                <UserIcon
                  image={itineraryData.userImage}
                  width={"2.5rem"}
                  height={"2.5rem"}
                />

                <div className="chat-user-name">
                  {itineraryData.otherUserName}
                </div>
              </div>

              <div className="chat-itinerary-details">
                <UserIcon
                  image={itineraryData.image}
                  width={"2.5rem"}
                  height={"2.5rem"}
                />
                <div className="itinerary-data">
                  <div className="chat-itinerary-text date">
                    {itineraryData.fromDate}
                  </div>
                  <div className="chat-itinerary-text">
                    {itineraryData.location}
                  </div>
                </div>
                {show && <LoginSpinner position="relative" />}
              </div>
            </>
          ) : null}

          <ul className="message-data" onScroll={onScroll} ref={listInnerRef}>
            {messages.map((element: any, index: number) => {
              return (
                <li
                  className={`message-container ${
                    element.userRef === profileData._id
                      ? ""
                      : "other-user-container"
                  }`}
                  key={element._id}
                >
                  <div
                    className="message-sender-wrapper"
                    id={`${element.userType === 2 ? "my-message" : null}`}
                  >
                    <span className="message-sender-name">
                      {element.userType === 1
                        ? element.traveller.name
                        : element.userType === 2
                        ? "You"
                        : "Admin"}
                    </span>
                  </div>

                  <div
                    className={`user-message ${
                      element.userRef === profileData._id ? "" : "other-user"
                    } ${
                      element.messageType === TYPE_OF_MESSAGE.IMAGE
                        ? ""
                        : "message"
                    } `}
                  >
                    {element.messageType === TYPE_OF_MESSAGE.IMAGE ? (
                      <Image imageUrl={IMAGE.AVERAGE + element.message} />
                    ) : element.messageType === TYPE_OF_MESSAGE.LINK ? (
                      <a
                        href={
                          element.message.includes("http")
                            ? element.message
                            : `https://${element.message}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {element.message}
                      </a>
                    ) : (
                      element.message
                    )}
                  </div>
                  <div className="message-date">
                    {element.createdOn
                      ? compareAbsoluteDates(element.createdOn)
                        ? dayjs(element.createdOn).format("hh:mm A")
                        : dayjs(element.createdOn).format("DD-MMM-YYYY hh:mm A")
                      : null}
                  </div>
                </li>
              );
            })}
          </ul>

          {itineraryData.blockedByTraveller ||
          itineraryData.itineraryStatus === 3 ||
          itineraryData.itineraryStatus === 5 ||
          itineraryData.itineraryStatus === 6 ? (
            <div className="messages-disabled">
              Note: You can not chat with the Traveler.
            </div>
          ) : (
            <div className="socket">
              <div
                className="add-icon"
                onClick={() => setmessageType((prev) => !prev)}
              >
                <BsPlus className="img" />
              </div>
              {messageType ? (
                <div className="message-type-popup">
                  <div className="message-type-wrapper">
                    <input
                      type="file"
                      id="upload"
                      onChange={imageChange}
                      accept="image/*"
                      hidden
                    />
                    <label htmlFor="upload" className="message-type-container">
                      <img src={ICON.MESSAGE_IMAGE} alt="upload" />
                      <span> Upload Image</span>
                    </label>
                  </div>
                  <hr />
                  <div className="message-type-wrapper">
                    <div
                      className="message-type-container"
                      onClick={() => {
                        setmessageLink((prev) => !prev);
                        div?.focus();
                        setmessageType(false);
                      }}
                    >
                      <img src={ICON.MESSAGE_LINK} alt="link" />
                      <span> Add Link</span>
                    </div>
                  </div>
                </div>
              ) : null}
              <div
                contentEditable="true"
                className={`${
                  messageLink ? "socket-input-link" : ""
                } socket-input`}
                id="input-message"
                onInput={(e) => setMessage(e.currentTarget.textContent || "")}
                onKeyPress={(e) => handleKeyPress(e, "")}
              />
              <div className="send-icon">
                <IoSend
                  onClick={(e) => handleKeyPress(e, "Enter")}
                  className="send-img"
                />
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MessagePage;
