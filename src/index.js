import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Spinner } from "react-bootstrap";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import "./i18n";
import "./assets/css/yeti.bootstrap.min.css";
import "./assets/css/fs/css/all.min.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <Spinner
          animation="border"
          style={{ position: "absolute", top: "50%", left: "50%" }}
        />
      }
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
