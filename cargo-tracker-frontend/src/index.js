import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Use 'react-dom/client' in React 18
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct React 18 syntax
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
