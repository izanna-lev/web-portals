/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import LoginSpinner from "../../../components/LoginSpinner";
import Image from "../../../components/Image";
import { IoSend } from "react-icons/io5";
import { DUMMY } from "./dummy";
import { messageList } from "../../../store/Actions/messageList";
import { uploadImage } from "../../../store/Actions/uploadImage";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useEffect, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import Socket, { socket } from "../../../services/socket";

import "./index.scss";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { IMAGE, TYPE_OF_MESSAGE } from "../../../constants";

const MessagePage = () => {
  const dispatch = useAppDispatch();
  const [messages, newMessage] = useState<any>([]);
  const [message, setMessage] = useState('');


  const profileData = useAppSelector((state) => state.profile);
  const messageData = useAppSelector((state) => state.messageList);
  const show = useAppSelector(
    (state: { loader: { active: boolean } }) => state.loader.active
  );

  const listInnerRef = useRef(null);

  const { channelId } = useParams();

  useEffect(() => {
    if (channelId) {
      newMessage(messageData.data.messages)
    }
  }, [messageData.data.messages]);

  useEffect(() => {
    if (channelId) {
      Socket.subscribeChannel({
        channelRef: channelId,
        id: profileData._id
      })
      dispatch(messageList(channelId));
    }
  }, [channelId]);



  socket.on('message', (data) => {
    newMessage([{
      userRef: data.userId,
      message: data.message,
      createdOn: new Date()
    }, ...messages])
    console.log("Message data----->", data)
  })


  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      dispatch(uploadImage({
        file: e.target.files[0],
        channelRef: channelId,
        id: profileData._id,
        messageType: TYPE_OF_MESSAGE.IMAGE,
        type: 2 //specialist
      }));
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

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter' && message) {
      Socket.sendMessage({
        channelRef: channelId,
        message,
        id: profileData._id,
        messageType: TYPE_OF_MESSAGE.TEXT,
        type: 2 //specialist
      })
      document.getElementsByClassName('socket-input')[0].innerHTML = '';
    }
  }


  return (
    <section className="MessagePage" id="MessagePage">
      <div className="user-data">
        <img
          className="user-image"
          src={IMAGE.SMALL + messageData.data.itinerary.image}
          alt="msg"
        />
        <div className="user-name">{messageData.data.itinerary.name}</div>
      </div>

      <div className="itinerary-details">
        <img
          className="user-image"
          src={IMAGE.SMALL + messageData.data.itinerary.image}
          alt="msg"
        />
        <div className="itinerary-data">
          <div className="itinerary-text date">{dayjs(messageData.data.itinerary.fromDate).format('DD-MMM-YYYY')}</div>
          <div className="itinerary-text">{messageData.data.itinerary.location.location}</div>
        </div>
        {show && <LoginSpinner position="relative" />}
      </div>
      <ul className="message-data" onScroll={onScroll} ref={listInnerRef}>
        {messages.map((element: any, index: number) => {
          return (
            <li
              key={element._id}
              className={`user-message ${element.userRef === profileData._id ? "" : "other-user"} ${element.messageType === TYPE_OF_MESSAGE.IMAGE ? "" :"message"} `}
            >
              {element.messageType === TYPE_OF_MESSAGE.IMAGE ? <Image imageUrl={IMAGE.SMALL +  element.message}/>: element.message }
              <div className="message-date">{dayjs(element.createdOn).format('hh:mmA')}</div>
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
