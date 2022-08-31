/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { LOGIN_PAYLOAD, FETCHING } from "./actionTypes";
import { APPLICATION_ROUTES } from "../../constants";
import { Dispatch } from "react";

/**
 * trigger user login
 * @param {String} username
 * @param {String} password
 * @param {Boolean} login
 */
export const userLogin =
  ({ email, password, login = true }:  { email: string, password: string, login: boolean }) =>
  (dispatch: Dispatch<any>) => {
    const body = { username: email, password, login };
    dispatch(FETCHING({ fetching: true }));

    axios
      .post(APPLICATION_ROUTES.LOGIN, body, { headers: {} })
      .then((response) => {
        // handle the server success response
        console.log("-----------", response)
        const {
          data: { code, message,data },
        } = response;
        console.log("=======", code , data)
        dispatch(LOGIN_PAYLOAD({ code, message,data }));
        dispatch(FETCHING({ fetching: false }));
      })
      .catch(() => {
        // handle no connection to the server
        dispatch(FETCHING({ fetching: false }));
      });
  };
