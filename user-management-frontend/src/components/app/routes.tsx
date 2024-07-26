import { Route, Routes as Router } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout.tsx";
import PrivateLayout from "./layouts/PrivateLayout.tsx";

import Dashboard from "../../pages/dashboard";

import Home from "../../pages";
import Login from "../../pages/Login.tsx";

export function Routes() {
  return (
    <Router>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Router>
  );
}
