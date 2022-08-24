import { RootState } from "..";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoader } from "../Slice/loader" 
import { setError } from "../Slice/error";

import { APPLICATION_ROUTES } from "../../constants";


export const login = ({ email, password }: { email: string, password: string }): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch: (arg0: { payload: any; type: string; }) => void, getState: any) => {
        try {
            dispatch(setError({
                data: {
                    message: "yo",
                    type: "error"
                }
            }))
            dispatch(setLoader(true))
            // const response = await axios.post(APPLICATION_ROUTES.LOGIN, { email, password})
            // console.log(response.data)
            // if (response.data.code === 500) {
            // }
            throw new Error("Invalid")
            dispatch(setLoader(false))
            // localStorage.setItem("accessToken", response.data.data.accessToken);
            // dispatch(getAccessToken(response.data.data))

        } catch (err) {
            // console.log("----------", err)
            // dispatch(setError(true))
        }
    }
}