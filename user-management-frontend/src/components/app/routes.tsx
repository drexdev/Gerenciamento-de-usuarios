import { Route, Routes as Router } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout.tsx";
import PrivateLayout from "./layouts/PrivateLayout.tsx";

import Dashboard from "../../pages/dashboard";

// --- PAGES ---
import Home from "../../pages";
import Login from "../../pages/auth/auth-login.tsx";
import Register from "../../pages/auth/auth-register.tsx";
import NotFound from "../../pages/not-found.tsx";

export function Routes() {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Router>
  );
}
