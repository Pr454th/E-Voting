import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import store from "./store";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThirdwebProvider activeChain="mumbai">
    <Provider store={store}>
      <App />
    </Provider>
  </ThirdwebProvider>
);
