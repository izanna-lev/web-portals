import { useEffect, useState, useLayoutEffect } from "react";

import { API, IMAGE, ICON, navigationIndexer } from "../../constants";
import "./index.scss";

const User = (user, index, selectOne) => (
  <div className="user-selection-element" key={user._id + index}>
    <input
      id={`checkbox-${index}`}
      type="checkbox"
      className="checkbox"
      defaultChecked={selectedUsers.includes(user._id)}
      onChange={() => {
        selectOne(user._id);
      }}
    />
    <img
      className="user-selection-img"
      src={`${IMAGE.SMALL}${user.image}`}
      alt={user.name}
      onError={(e) => {
        e.target.src = ICON.USER_PLACEHOLDER;
      }}
      loading="lazy"
    />
    <div className="user-selection-info">
      <div className="user-selection-name">{user.firstName}</div>
      <div className="user-selection-email">{user.email}</div>
    </div>
  </div>
);

let selectedUsers = [];

const Notifications = (props) => {
  const [newUserList, setnewUserList] = useState([]);

  useLayoutEffect(() => {
    document.title = "Notifications";
    selectedUsers = [];
  }, []);

  // useEffect(() => {
  //   FetchEntity(
  //     API.USERS,
  //     {
  //       notificationList: true,
  //     },
  //     1,
  //     100000000
  //   );
  // }, []);

  const selectAll = () => {
    const checkboxes = document.querySelectorAll("input.checkbox");
    if (selectedUsers.length === newUserList.length) {
      unselectAll(checkboxes);
    } else {
      for (let index = 0; index < newUserList.length; index++) {
        if (selectedUsers.indexOf(newUserList[index]._id) === -1) {
          selectedUsers.push(newUserList[index]._id);
        }
      }
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      // handleActiveState(NOTIFICATION_LIST.ALL);
    }
  };

  const unselectAll = (checkboxes) => {
    selectedUsers = [];
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    // handleActiveState(NOTIFICATION_LIST.NONE);
  };

  const selectOne = (id) => {
    if (selectedUsers.indexOf(id) > -1) {
      selectedUsers.splice(selectedUsers.indexOf(id), 1);
    } else {
      selectedUsers.push(id);
    }

    // if (selectedUsers.length === newUserList.length) {
    // } else handleActiveState(NOTIFICATION_LIST.SELECTED);
  };

  const sendNotifications = () => {
    // if (!selectedUsers.length) {
    //   return toast.warn("Please select some users to send notifications to!");
    // }
    // if (!document.getElementById("notificationText").value) {
    //   return toast.warn("Notification message cannot be empty!");
    // }
    // props.triggerGenericApiHit(API.NOTIFICATION_BROADCAST, {
    //   userIds: selectedUsers,
    //   message: document.getElementById("notificationText").value,
    // });
    // document.getElementsByClassName("user-selection-list")[0].scrollTo(0, 0);
  };

  // if (apiMessage.message) {
  //   // eslint-disable-next-line no-unused-expressions

  //   if (apiMessage.code === 100) {
  //     selectedUsers = [];
  //     const checkboxes = document.querySelectorAll("input.checkbox");
  //     checkboxes.forEach((checkbox) => {
  //       checkbox.checked = false;
  //     });

  //     document.getElementById("notificationText").value = "";
  //   } else {
  //   }
  //   triggerNullifyApiMessage();
  // }

  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top">
          <div className="content-heading">Notifications</div>
          <div className="notifications-main-div">
            <div className="notifications-message-div">
              <div className="notifications-message-heading"></div>
              <textarea
                id="notificationText"
                className="notifications-textarea"
                autoFocus
              />
              <div className="notifications-message-heading">
                Note: Select users from right pane who you want to send the
                notification.
              </div>
              <button
                onClick={sendNotifications}
                className="notifications-send-btn"
                title="Send notification"
              >
                Send
              </button>
            </div>
            <div className="user-selection-main-div">
              <div className="user-selection-header">
                <div className="user-selection-left">Travellers List</div>

                <div
                  title="Select all users"
                  onClick={selectAll}
                  className="user-selection-right"
                >
                  {/* {value !== 0 ? "Select All" : "Unselect All"} */}
                </div>
              </div>

              <div className="user-selection-list">
                {newUserList &&
                  newUserList.map((user, index) =>
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
