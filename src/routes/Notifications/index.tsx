import { useEffect, useState, Key } from "react";
import { API, IMAGE } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./index.scss";
import { Fetch } from "../../api/Fetch";
import { setApiMessage } from "../../store/slices/apiMessage";
import { Create } from "../../api/Create";

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
        onChange={() => {
          selectOne(user._id);
        }}
      />
      <img
        className="user-selection-img"
        src={`${IMAGE.SMALL}${user.image}`}
        alt={user.name}
        onError={(e) => {
          // e.target.src = ICON.USER_PLACEHOLDER;
        }}
        loading="lazy"
      />
      <div className="user-selection-info">
        <div className="user-selection-name">{user.name}</div>
        <div className="user-selection-email">{user.email}</div>
      </div>
    </div>
  );
};

let selectedUsers: any[] = [];

const Notifications = (props: any) => {
  const [selectedAll, setSelectedAll] = useState(false);
  const dispatch = useAppDispatch();
  const { page, limit, size, total, list } = useAppSelector(
    (state) => state.notificationUserList
  );

  useEffect(() => {
    setSelectedAll(false);
    dispatch(
      Fetch(
        API.TRAVELLER_LIST,
        {
          notificationList: true,
        },
        1,
        10000000
      )
    );
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
    if (selectedUsers.indexOf(id) > -1) {
      setSelectedAll(false);
      selectedUsers.splice(selectedUsers.indexOf(id), 1);
    } else {
      selectedUsers.push(id);
    }
  };

  const sendNotifications = () => {
    if (!selectedUsers.length && !selectedAll) {
      dispatch(
        setApiMessage({
          type: "error",
          message: "Please select some users to send notifications to!",
        })
      );
      return;
    }
    if (
      !(document.getElementById("notificationText") as HTMLInputElement).value
    ) {
      dispatch(
        setApiMessage({
          type: "error",
          message: "Notification message cannot be empty!",
        })
      );
      return;
    }

    dispatch(
      Create(
        API.BROADCAST,
        {
          message: (
            document.getElementById("notificationText") as HTMLInputElement
          ).value,
          selectedAll,
          userIds: selectedAll ? [] : selectedUsers,
        },
        false
      )
    );
  };

  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top">
          <div className="content-heading">Send Notifications</div>
          <div className="notifications-main-div">
            <div className="notifications-message-div">
              <div className="notifications-message-heading"></div>
              <textarea
                id="notificationText"
                className="notifications-textarea"
                placeholder="Type your message here."
                autoFocus
              />
              <div className="notifications-message-heading">
                Note: Select users from right pane whom you want to send the
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
            <div className="container-right">
              <div>Select Travelers</div>
              <div className="user-selection-main-div">
                <div className="user-selection-header">
                  <div className="user-selection-left">
                    <div>Travelers List</div>
                    <div className="select-all">
                      <input
                        id={`checkbox-x`}
                        type="checkbox"
                        className="checkbox"
                        onClick={() => handleSelect()}
                        checked={selectedAll}
                      />
                      <div>Select All</div>
                    </div>
                  </div>
                  <div
                    title="Select all users"
                    onClick={selectAll}
                    className="user-selection-right"
                  ></div>
                  <div className="user-selection-right"></div>
                </div>

                <div className="user-selection-list">
                  {list.length &&
                    list.map((user: any, index: number) =>
                      User(user, index, selectOne)
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Notifications;
