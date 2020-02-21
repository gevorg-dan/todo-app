import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import App from "./App";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
