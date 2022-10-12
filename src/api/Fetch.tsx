import { setLoader } from "../store/slices/loader";
import { setApiMessage } from "../store/slices/apiMessage";
import axios from "axios";

// Fetch API
export const Fetch =
  (
    endpoint = "",
    payload: any = {},
    page = 1,
    limit = 10,
    customPayload?: any
  ) =>
  async (dispatch: any) => {
    const Authorization = localStorage.getItem("accessToken") || "";

    if (!endpoint) throw new Error("Missing Endpoint");
    if (!Authorization) throw new Error("No Authorization");

    dispatch(setLoader(true));

    const data = { ...payload, page, limit, ...customPayload };

    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      });

      const { code, message } = response.data;

      if (code !== 100) throw new Error(message);

      const responseIsArray = Array.isArray(response.data.data);

      dispatch({
        type: endpoint,
        payload: responseIsArray
          ? [...response.data.data]
          : { ...response.data.data, ...customPayload },
      });
      dispatch(setLoader(false));
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
