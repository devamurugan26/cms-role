import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./page/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
