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

        <ToastContainer
          position="top-right"
          theme="dark"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
