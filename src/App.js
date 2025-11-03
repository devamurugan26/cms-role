import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./page/Home";
import ProductionTeam from "./components/ProductionTeam";
import ManagementTeam from "./components/ManagementTeam";
import FinancialTeam from "./components/FinancialTeam";
import SalesDepartment from "./components/SalesDepartment";
import ViewMembers from "./components/ViewMembers";
import LoginPage from "./components/Auth/Login";
import Memebertaskprofile from "./components/Memebertaskprofile";
import MyTask from "./components/mytask/MyTask";
import Users from "./components/Users";
import MasterTableManager from "./components/MasterTableManager";
import UserProfile from "./components/UserProfile";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public route */}
      <Route path="/LoginPage" element={<LoginPage />} />

      {/* Redirect root "/" based on authentication */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/MyTask" replace />
          ) : (
            <Navigate to="/LoginPage" replace />
          )
        }
      />

      {/* Protected dashboard routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/Dashboard" element={<Home />} />
        <Route path="/MyTask" element={<MyTask />} /> {/* ✅ URL will be /MyTask */}
        <Route path="/Users" element={<Users />} />
        <Route path="/production-team" element={<ProductionTeam />} />
        <Route path="/ManagementTeam" element={<ManagementTeam />} />
        <Route path="/FinancialTeam" element={<FinancialTeam />} />
        <Route path="/SalesDepartment" element={<SalesDepartment />} />
        <Route path="/ViewMembers" element={<ViewMembers />} />
        <Route path="/Memebertaskprofile" element={<Memebertaskprofile />} />
        <Route path="/MasterTableManager" element={<MasterTableManager />} />
         <Route path="/Settings" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
