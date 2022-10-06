import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import "./index.scss";
import { useEffect } from "react";
import { setApiMessage } from "../../store/slices/apiMessage";

const Toast = () => {
  const dispatch = useAppDispatch();

  const { type, message } = useAppSelector(
    (state: {
      apiMessage: {
        message: string;
        type: string;
      };
    }) => state.apiMessage
  );

  useEffect(() => {
    const ToastWrapper = document.getElementById("wrapper") as HTMLElement;

    if (type) {
      ToastWrapper.style.display = "";

      setTimeout(function () {
        ToastWrapper.style.display = "none";
        dispatch(
          setApiMessage({
            type: "",
            message: "",
          })
        );
      }, 3000);
    }
  }, [dispatch, type]);

  return (
    <div
      className="wrapper"
      id="wrapper"
      style={{ display: type ? "block" : "none" }}
    >
      <div className={`toast ${type}`}>
        <div className={`outer-container ${type}icon`}>
          {type === "success" ? (
            <MdDone className="fas done" />
          ) : (
            <IoMdClose className="fas" />
          )}
        </div>
        <div className="inner-container">
          <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
