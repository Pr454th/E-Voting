import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import store from "./store";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
import { ethers } from "ethers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThirdwebProvider
    activeChain={Mumbai}
    clientId={process.env.REACT_APP_CLIENT_ID}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ThirdwebProvider>
);
