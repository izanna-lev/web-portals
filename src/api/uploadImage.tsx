import { setLoader } from "../store/slices/loader";
import { setApiMessage } from "../store/slices/apiMessage";
import axios from "axios";
import { Fetch } from "./Fetch";
import { API } from "../constants";

// Upload Image to server
export const UploadImage =
  (endpoint: string = API.IMAGE_UPLOAD, image: any) =>
  async (dispatch: any) => {
    const ContentType = "multipart/form-data";
    const Authorization = localStorage.getItem("accessToken") || "";

    if (!endpoint) return alert("Missing Endpoint");
    if (!Authorization) return alert("No Authorization");

    dispatch(setLoader(true));

    const data = new FormData();
    data.append("image", image);

    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": ContentType,
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
        return response.data;
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
