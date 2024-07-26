import React from "react";
import ReactDOM from "react-dom/client";

import { Routes } from "./components/app/routes.tsx";
import { ToastContainer } from "react-toastify";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/auth-provider.tsx";

import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes />

        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
