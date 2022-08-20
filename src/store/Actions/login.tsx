import { RootState } from "..";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit"; 
import axios from "axios";
import { getAccessToken } from "../Slice/login";
import { setLoader } from "../Slice/loader"

export const login = ({ email, password }: { email: string, password: string }): ThunkAction<void, RootState, unknown, AnyAction> => {
   return async(dispatch, getState) => {
    try {
        dispatch(setLoader(true))
        const response = await axios.post('http://44.206.33.81:3000/api/admin/login', { email, password})
        localStorage.setItem("accessToken", response.data.data.accessToken);
        dispatch(getAccessToken(response.data.data))
        dispatch(setLoader(false))
    } catch(err) {

    }
   }
}