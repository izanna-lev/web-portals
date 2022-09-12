import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";

import Toast from "./components/Toast";
import { store } from "./store/index";
import "./styles/index.scss";
import App from "./routes";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Toast />
      <App />
    </BrowserRouter>
  </Provider>
);
