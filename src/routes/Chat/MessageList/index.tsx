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
import {
  IMAGE,
  ITINERARY_STATUS,
  TYPE_OF_MESSAGE,
  USER_TYPE,
} from "../../../constants";
import { UserIcon } from "../../../components/UserIcon";
import NoChatActive from "../NoChatActive";

const MessagePage = () => {
  const [messages, newMessage] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [noChatActive, setNoChatActive] = useState(true);

  const { messages: messageData, itinerary: itineraryData } = useAppSelector(
    (state) => state.messageList
  );
  const profileData = useAppSelector((state) => state.profile);
  const show = useAppSelector((state) => state.loader.active);
  const socketData = useAppSelector((state) => state.socket.socket);

  const dispatch = useAppDispatch();
  const listInnerRef = useRef(null);
  const { channelId } = useParams();

  useEffect(() => {
    if (channelId && messageData) {
      newMessage(messageData);
      setNoChatActive(false);
    }
  }, [messageData, channelId]);

  useEffect(() => {
    if (socketData.id && channelId && profileData._id) {
      socketData.emit("subscribe_channel", {
        channelRef: channelId,
        id: profileData._id,
      });
      dispatch(messageList(channelId));
    }
  }, [channelId, socketData.id, profileData._id, dispatch, socketData]);

  socketData.on("message", (data: any) => {
    newMessage([
      {
        _id: data._id,
        userRef: data.userId,
        message: data.message,
        messageType: data.messageType,
        createdOn: new Date(),
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

      socketData.emit("message", {
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
      socketData.emit("message", {
        channelRef: channelId,
        message,
        id: profileData._id,
        messageType: TYPE_OF_MESSAGE.TEXT,
        type: USER_TYPE.SPECIALIST,
      });
      document.getElementsByClassName("socket-input")[0].innerHTML = "";
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
                    {dayjs(itineraryData.fromDate).format("DD-MMM-YYYY")}
                  </div>
                  <div className="chat-itinerary-text">
                    {itineraryData.location.location}
                  </div>
                </div>
                {show && <LoginSpinner position="relative" />}
              </div>
            </>
          ) : null}

          <ul className="message-data" onScroll={onScroll} ref={listInnerRef}>
            {messages.map((element: any, index: number) => {
              return (
                <div
                  className={`message-container ${
                    element.userRef === profileData._id
                      ? ""
                      : "other-user-container"
                  }`}
                  key={element._id}
                >
                  <li
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
                    ) : (
                      element.message
                    )}
                  </li>
                  <div className="message-date">
                    {dayjs(element.createdOn).format("hh:mm A")}
                  </div>
                </div>
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
              <div className="add-icon">
                <input
                  type="file"
                  id="upload"
                  onChange={imageChange}
                  accept="image/*"
                  hidden
                />
                <label htmlFor="upload">
                  <BsPlus className="img" />
                </label>
              </div>
              <div
                contentEditable="true"
                className="socket-input"
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
