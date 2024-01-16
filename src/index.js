import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./Redux/Store";
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-5D7VZ67M'
};

TagManager.initialize(tagManagerArgs);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);

reportWebVitals();

