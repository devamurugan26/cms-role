import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./page/Home";
import ProductionTeam from "./components/ProductionTeam";
import ManagementTeam from "./components/ManagementTeam";
import FinancialTeam from "./components/FinancialTeam";
import SalesDepartment from "./components/SalesDepartment";
import ViewMembers from "./components/ViewMembers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
        
          <Route path="/" element={<Home />} />
          <Route path="/production-team" element={<ProductionTeam />} />
          <Route path="/ManagementTeam" element={<ManagementTeam />} />
          <Route path="/FinancialTeam" element={<FinancialTeam />} />
          <Route path="/SalesDepartment" element={<SalesDepartment />} />
            <Route path="/ViewMembers" element={<ViewMembers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
