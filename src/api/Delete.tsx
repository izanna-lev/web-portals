import { setLoader } from "../store/slices/loader";
import { setApiMessage } from "../store/slices/apiMessage";
import axios from "axios";
import { Fetch } from "./Fetch";

// Delete API
export const DeleteEntity =
  (
    endpoint = "",
    payload: any = {},
    listingEndpoint = "",
    listingPayload: any = {},
    page = 1,
    limit = 10
  ) =>
  async (dispatch: any) => {
    const Authorization = localStorage.getItem("accessToken") || "";

    if (!endpoint) return alert("Missing Endpoint");
    if (!Authorization) return alert("No Authorization");

    dispatch(setLoader(true));

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      });

      const { code, message } = response.data;
      if (code !== 100) throw new Error(message);

      if (code === 100) {
        dispatch(setLoader(false));
        dispatch(
          setApiMessage({
            type: "success",
            message: message,
          })
        );

        if (listingEndpoint)
          dispatch(
            Fetch(listingEndpoint, listingPayload, page, limit, listingPayload)
          );
      }
    } catch (error: any) {
      dispatch(setLoader(false));
      dispatch(
        setApiMessage({
          type: "error",
          message: error.message,
        })
      );
    }
  };
