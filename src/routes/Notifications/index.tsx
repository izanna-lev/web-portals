import { useEffect, useState, Key } from "react";
import { API, IMAGE } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./index.scss";
import { Fetch } from "../../api/Fetch";
import { setApiMessage } from "../../store/slices/apiMessage";
import { Create } from "../../api/Create";
import { ICON } from "../../assets/index";
import { IoImageOutline } from "react-icons/io5";
import NotificationTemplate from "../../components/NotificationTemplate";

const User = (
  user: any,
  index: Key | null | undefined,
  selectOne: { (id: any): void; (arg0: any): void }
) => {
  return (
    <div className="user-selection-element" key={index}>
      <input
        id={`checkbox-${index}`}
        type="checkbox"
        className="checkbox"
        defaultChecked={selectedUsers.includes(user._id)}
        onChange={() => selectOne(user._id)}
      />
      {user.image ? (
        <img
          className={`${user.image ? "user-selection-img" : "user-dummy-img"} `}
          src={`${
            user.image ? IMAGE.SMALL + user.image : ICON.USER_PLACEHOLDER
          } `}
          alt={user.name}
          onError={(e: any) => {
            e.target.src = ICON.USER_PLACEHOLDER;
          }}
          loading="lazy"
        />
      ) : (
        <div className="user-selection-img-dummy">
          {" "}
          <IoImageOutline className="dummy-image" />
        </div>
      )}
      <div className="user-selection-info">
        <div className="user-selection-name">{user.name}</div>
        <div className="user-selection-email">{user.email}</div>
      </div>
    </div>
  );
};

let selectedUsers: any[] = [];

const Notifications = () => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [message, setMessage] = useState("");

  const { templates } = useAppSelector((state) => state.notificationTemplates);
  const { list } = useAppSelector((state) => state.notificationUserList);
  const apiMessage = useAppSelector((state) => state.apiMessage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setSelectedAll(false);
    dispatch(Fetch(API.TRAVELLER_LIST, { notificationList: true }, 1, 10000));
    dispatch(Fetch(API.LIST_TEMPLATE));
    unselectAll();
  }, []);

  const handleSelect = () => {
    selectedAll ? unselectAll() : selectAll();
    setSelectedAll(!selectedAll);
  };

  const selectAll = () => {
    const checkboxes = document.querySelectorAll("input.checkbox");
    for (let index = 0; index < list.length; index++) {
      if (selectedUsers.indexOf(list[index]._id) === -1) {
        selectedUsers.push(list[index]._id);
      }
    }
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = true;
    });
  };

  const unselectAll = () => {
    const checkboxes = document.querySelectorAll("input.checkbox");
    selectedUsers = [];
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
  };

  const selectOne = (id: any) => {
    if (selectedUsers.indexOf(id) > -1)
      selectedUsers.splice(selectedUsers.indexOf(id), 1);
    else selectedUsers.push(id);

    if (selectedUsers.length === list.length) setSelectedAll(true);
    else setSelectedAll(false);
  };

  const sendNotifications = () => {
    if (!selectedUsers.length && !selectedAll)
      return dispatch(
        setApiMessage({
          type: "error",
          message: "Please select some travelers to send notifications to!",
        })
      );

    if (!message)
      return dispatch(
        setApiMessage({
          type: "error",
          message: "Notification message cannot be empty!",
        })
      );

    dispatch(
      Create(API.BROADCAST, {
        message,
        selectedAll,
        userIds: selectedAll ? [] : selectedUsers,
      })
    );
  };

  useEffect(() => {
    const { type } = apiMessage;
    if (type === "success") {
      setMessage("");
      unselectAll();
      setSelectedAll(false);
    }
  }, [apiMessage]);

  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top">
          <div className="content-heading">Send Notifications</div>
        </section>
        <section className="content-bottom notifications-main-div">
          <div className="notifications-message-div">
            <div className="notifications-message-heading"></div>
            <textarea
              autoFocus
              value={message}
              id="notificationText"
              className="notifications-textarea"
              placeholder="Type your message here or select one below."
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="notifications-message-heading">
              Note: Select travelers from right pane whom you want to send the
              notification.
            </div>
            <button
              onClick={sendNotifications}
              className="notifications-send-btn"
              title="Send notification"
            >
              Send
            </button>
            <NotificationTemplate
              setmessage={setMessage}
              templates={templates}
            />
          </div>
          <div className="container-right">
            <div>Select Travelers</div>
            <div className="user-selection-main-div">
              <div className="user-selection-header">
                <div className="user-selection-left">
                  <div>Travelers List</div>
                  <div
                    className="select-all"
                    title="Select all travelers"
                    onClick={handleSelect}
                  >
                    <input
                      id="checkbox-x"
                      type="checkbox"
                      className="checkbox"
                      onChange={handleSelect}
                      checked={selectedAll}
                    />
                    <span>Select All</span>
                  </div>
                </div>
                <div className="user-selection-right"></div>
                <div className="user-selection-right"></div>
              </div>

              <div className="user-selection-list">
                {list.map((user: any, index: number) =>
                  User(user, index, selectOne)
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Notifications;
