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

const MessagePage = () => {
  const dispatch = useAppDispatch();
  const [messages, newMessage] = useState<any>([]);
  const [message, setMessage] = useState('');


  const profileData = useAppSelector((state) => state.profile);
  const messageData = useAppSelector((state) => state.messageList);
  const socketData = useAppSelector((state) => state.socket);
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
    if (socketData?.socket?.id && channelId && profileData._id) {
      socketData.socket.emit("subscribe_channel",{
        channelRef: channelId,
        id: profileData._id
      })
      dispatch(messageList(channelId));
    }

  }, [channelId, socketData?.socket?.id, profileData._id]);



  socketData.socket.on('message', (data: any) => {
    newMessage([{
      _id: data._id,
      userRef: data.userId,
      message: data.message,
      messageType: data.messageType,
      createdOn: new Date()
    }, ...messages])
  })


  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      dispatch(uploadImage({
        file: e.target.files[0],
        channelRef: channelId,
        id: profileData._id,
        messageType: TYPE_OF_MESSAGE.IMAGE,
        type: USER_TYPE.SPECIALIST
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

  const handleKeyPress = (event: any, key: string) => {
    if ((event.key === 'Enter' || key === 'Enter') && message) {
      socketData.socket.emit("message",{
        channelRef: channelId,
        message,
        id: profileData._id,
        messageType: TYPE_OF_MESSAGE.TEXT,
        type: USER_TYPE.SPECIALIST
      })
      document.getElementsByClassName('socket-input')[0].innerHTML = '';
    }
  }


  return (
    <section className="MessagePage" id="MessagePage">
      { messageData.data && 
      <>
            <div className="user-data">
            <img
              className="chat-user-image"
              src={IMAGE.SMALL + messageData.data.itinerary.image}
              alt="msg"
            />
            <div className="chat-user-name">{messageData.data.itinerary.name}</div>
          </div>
    
          <div className="chat-itinerary-details">
            <img
              className="chat-user-image"
              src={IMAGE.SMALL + messageData.data.itinerary.image}
              alt="msg"
            />
            <div className="itinerary-data">
              <div className="chat-itinerary-text date">{dayjs(messageData.data.itinerary.fromDate).format('DD-MMM-YYYY')}</div>
              <div className="chat-itinerary-text">{messageData.data.itinerary.location.location}</div>
            </div>
            {show && <LoginSpinner position="relative" />}
          </div>
          </>
    }

      <ul className="message-data" onScroll={onScroll} ref={listInnerRef}>
        {messages.map((element: any, index: number) => {
          return (
            <div className={`message-container ${element.userRef === profileData._id ? "" : "other-user-container"}`}>

              <li
                key={element._id}
                className={`user-message ${element.userRef === profileData._id ? "" : "other-user"} ${element.messageType === TYPE_OF_MESSAGE.IMAGE ? "" : "message"} `}
              >
                {element.messageType === TYPE_OF_MESSAGE.IMAGE ? <Image imageUrl={IMAGE.AVERAGE + element.message} /> : element.message}
              </li>
              <div className="message-date">{dayjs(element.createdOn).format('hh:mmA')}</div>

            </div>
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
          onInput={e => setMessage(e.currentTarget.textContent || "")} onKeyPress={e => handleKeyPress(e,  "")}  />
        <div className="send-icon">
          <IoSend  onClick={e => handleKeyPress(e,  "Enter")} className="send-img" />
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
