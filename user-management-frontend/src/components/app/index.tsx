import { Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout.tsx";
import Home from "../../pages";
import PrivateLayout from "./layouts/PrivateLayout.tsx";
import Dashboard from "../../pages/dashboard";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
