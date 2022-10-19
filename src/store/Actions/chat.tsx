import { RootState } from "..";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";

import { API } from "../../constants";

import { setLoader } from "../slices/loader";
import { setApiMessage } from "../slices/apiMessage";
import { getChat } from "../slices/chatList";

export const chatList = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (
    dispatch: (arg0: { payload: any; type: string }) => void,
    getState: any
  ) => {
    try {
      const Authorization = localStorage.getItem("accessToken") || ""
      dispatch(setLoader(true));
      const response = await axios.post(API.CHAT_LIST, {}, {
        headers: {
          Authorization
        },
      });
      dispatch(setLoader(false));
      if (response.data.code !== 100) throw new Error(response.data.message);
      dispatch(getChat(response.data));
    } catch (err: any) {
        dispatch(setLoader(false));
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
