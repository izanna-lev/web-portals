import { setLoader } from "../store/slices/loader";
import { setApiMessage } from "../store/slices/apiMessage";
import axios from "axios";
import { Fetch } from "./Fetch";

// Create API
export const Create =
  (
    endpoint: string = "",
    payload: any = {},
    multipart: boolean = false,
    image: any = null,
    listingEndpoint: string = "",
    listingPayload: any = {},
    page: number = 1,
    limit: number = 10
  ) =>
  async (dispatch: any) => {
    const Authorization = localStorage.getItem("accessToken") || "";
    const ContentType = multipart ? "multipart/form-data" : "application/json";

    if (!endpoint) return alert("Missing Endpoint");
    if (!Authorization) return alert("No Authorization");

    dispatch(setLoader(true));

    let data = { ...payload };

    if (multipart) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (image) formData.append("image", image);
      data = formData;
    }

    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": ContentType,
          Authorization,
        },
      });

      const { code, message } = response.data;
      // console.log("submit", response);

      if (code !== 100) throw new Error(message);
      if (code === 100) {
        // console.log(response);
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
