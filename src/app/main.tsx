import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {worker} from "~/mocks/browser";
import "~/styles/index.css";
import App from "./App";

worker.start();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
