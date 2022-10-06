import { RootState } from "..";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";

import { API } from "../../constants";
import { setApiMessage } from "../slices/apiMessage";
import Socket from "../../services/socket";

export const uploadImage = (
  payload: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (
    dispatch: (arg0: { payload: any; type: string }) => void,
    getState: any
  ) => {
    try {
      const Authorization = localStorage.getItem("accessToken") || "";
      let data = new FormData();
      data.append("image", payload.file);
      const response = await axios.post(API.CHAT_IMAGE, data, {
        headers: {
          Authorization,
          "content-type": "multipart/form-data",
        },
      });
      // console.log(response)
      if (response.data.code !== 100) throw new Error(response.data.message);

      Socket.sendMessage({
        channelRef: payload.channelRef,
        message: response.data.data,
        id: payload.id,
        messageType: payload.messageType,
        type: 2, //specialist
      });
    } catch (err: any) {
      dispatch(
        setApiMessage({
          data: {
            message: err.message,
            type: "error",
          },
        })
      );
    }
  };
};
