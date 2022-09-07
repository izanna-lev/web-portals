import { setLoader } from "./Slice/loader";
import { setPopup } from "./Slice/popup";
import axios from "axios";

// Fetch API
export const Fetch = (endpoint: string, payload: any) => (dispatch: any) => {
  try {
    dispatch(setLoader(true));

    const data = { ...payload };
    const Authorization = localStorage.getItem("accessToken") || "";

    axios
      .post(endpoint, data, {
        headers: {
          Authorization,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error.message));
    dispatch(endpoint, { 1: "he" });
    dispatch(setLoader(false));
    // if (response.data.code !== 100) {
    //   throw new Error(response.data.message);
    // }
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
