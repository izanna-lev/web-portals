/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LoginSpinner from "../../components/LoginSpinner";
import { login } from "../../store/actions/login";
import { ICON } from "../../constants";
import "./index.scss";

const Login = () => {
  const [passVisibleStatus, setPassVisibleStatus] = useState(false);
  const accessToken = useAppSelector((state) => state.login.accessToken);
  const loaderActive = useAppSelector((state) => state.loader.active);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      })
    );
  };

  return (
    <section className="loginPage" id="loginPage">
      <img className="signin-image" src={ICON.SIGNIN} alt="signinImage" />
      <div className="login-form">
        <div className="heading">
          Welcome to <strong className="strong-heading">Onsite Travel</strong>
        </div>

        <form className="user-login" onSubmit={submitForm}>
          <div className="input-field-text">
            <div className="label">Email</div>
            <div className="input-login-containers">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@abc.com"
                className="custom-field"
                autoFocus
                autoComplete="email"
                required
                defaultValue={localStorage.getItem("user") || ""}
              />
            </div>
          </div>

          <div className="input-field-text">
            <div className="label">Password</div>
            <div className="input-login-containers password">
              <input
                id="password"
                name="password"
                type={passVisibleStatus ? "text" : "password"}
                placeholder="XXXXXXXXXXXX"
                className="custom-field"
                autoFocus
                autoComplete="password"
                required
              />
              <div
                className="password-icon"
                onClick={() => {
                  setPassVisibleStatus(!passVisibleStatus);
                }}
              >
                {passVisibleStatus ? (
                  <RiEyeLine className="input-icon" />
                ) : (
                  <RiEyeCloseLine className="input-icon" />
                )}
              </div>
            </div>
          </div>

          <div className="button-login">
            {loaderActive ? (
              <LoginSpinner />
            ) : (
              <button className="button">Log In</button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
