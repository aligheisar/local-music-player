import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./context/context";
import { Buffer } from "buffer";
import process from "process";

if (!window.Buffer) window.Buffer = Buffer;
if (!window.process) window.process = process;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
