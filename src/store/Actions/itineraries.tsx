import { RootState } from "..";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";

import { API } from "../../constants";

import { setLoader } from "../Slice/loader";
import { setItineraries } from "../Slice/itineraries";
import { setPopup } from "../Slice/popup";

export const itineraries = (
  page: number = 1,
  limit: number = 10
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (
    dispatch: (arg0: { payload: any; type: string }) => void,
    getState: any
  ) => {
    try {
      dispatch(setLoader(true));
      const response = await axios.post(
        API.ITINERARIES,
        { page, limit },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken")!,
          },
        }
      );
      dispatch(setLoader(false));
      if (response.data.code !== 100) {
        throw new Error(response.data.message);
      }
      dispatch(setItineraries({ data: response.data.data }));
    } catch (err: any) {
      dispatch(
        setPopup({
          data: {
            message: err.message,
            type: "error",
          },
        })
      );
    }
  };
};
