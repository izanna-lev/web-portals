/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "react-toastify/dist/ReactToastify.css";

import { toast, ToastContainer } from "react-toastify";
import React, { Dispatch, useLayoutEffect, useState } from "react";
import Button from "@mui/material/Button";
import { connect } from "react-redux";

import { userLogin } from "../../redux/actions";
import "./index.scss";

type Props = {
  triggerLoginUser: (email: string,  password: string ) => void,
  fetching: boolean,
  login: {
    code: Number,
    data: string,
    message: string,
  }
}
const LandingPage = ({ triggerLoginUser, fetching = false, login }: Props) => {



  return (
    <section className="clientPage" id="clientPage">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="heading">Clients</div>
      
       <div className="client-row">


       </div>
    </section>
  );
};

// handles the outgoing dispatches
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    triggerLoginUser: (email: string, password: string) =>
      dispatch(userLogin({ email, password, login: true })),
  };
};

// handles incoming state changes
const mapStateToProps = (state: any) => {
  const { fetching, login } = state;
  return { fetching, login };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
