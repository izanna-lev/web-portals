/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LoginSpinner from "../../components/LoginSpinner";
import { login } from "../../store/login";
import { ICON } from "../../assets/index";
import "./index.scss";

import { FIREBASE_VAPID_KEY } from "../../constants";
import { getToken } from "firebase/messaging";
import { messaging } from "../../services/firebase";

const Login = () => {
  const [passVisibleStatus, setPassVisibleStatus] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  const accessToken = useAppSelector((state) => state.login.accessToken);
  const loaderActive = useAppSelector((state) => state.loader.active);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { SHOW_PASSWORD, HIDE_PASSWORD } = ICON;

  useEffect(() => {
    localStorage.getItem("accessToken") && navigate("/dashboard");
  }, [accessToken, navigate]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      login({
        email: (document.getElementById("email") as HTMLInputElement).value,
        password: (document.getElementById("password") as HTMLInputElement)
          .value,
        fcmToken,
        device: "web",
      })
    );
  };

  const requestNotificationPermission = () => {
    Notification.requestPermission().then(async (permission) => {
      if (permission === "granted") {
        const messageToken = await getToken(messaging, {
          vapidKey: FIREBASE_VAPID_KEY,
        });
        console.log(messageToken);
        setFcmToken(messageToken);
      } else
        alert(
          "Notification permission denied, you will not receive any notifications."
        );
    });
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <section className="loginPage" id="loginPage">
      <div className="loginPageLeft">
        <div className="loginPage-logo">
          <img src={ICON.APP_LOGO} alt="logo" loading="lazy" />
        </div>
      </div>

      <div className="loginPageRight">
        <div className="heading">
          Welcome to <strong className="strong-heading">Onsite Travel</strong>
        </div>

        <form className="login-form" onSubmit={submitForm}>
          <div className="input-data-container">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="input-wrapper">
              <div className="input-container">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                  className="custom-field"
                  autoFocus
                  autoComplete="email"
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-data-container">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="input-wrapper">
              <div className="input-container">
                <input
                  id="password"
                  name="password"
                  type={passVisibleStatus ? "text" : "password"}
                  placeholder="XXXXXXXXXXXX"
                  className="custom-field"
                  autoComplete="password"
                  required
                />
              </div>
              <div
                className="password-icon"
                onClick={() => {
                  setPassVisibleStatus(!passVisibleStatus);
                }}
              >
                {passVisibleStatus ? (
                  <img src={SHOW_PASSWORD} alt="show" className="input-icon" />
                ) : (
                  <img src={HIDE_PASSWORD} alt="hide" className="input-icon" />
                )}
              </div>
            </div>
          </div>

          <div className="button-login">
            {loaderActive ? <LoginSpinner /> : <button>Log In</button>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
