import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ named import


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ new
  const navigate = useNavigate();

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken) {
    try {
      const decoded = jwtDecode(storedToken);
      const now = Date.now() / 1000; // current time in seconds

      if (decoded.exp && decoded.exp < now) {
        // Token expired
        logout();
      } else {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    } catch {
      logout(); // Invalid token
    }
  }

  if (storedUser) setUser(JSON.parse(storedUser));

  setLoading(false);
}, []);

  const login = (userData, redirectPath = "/MyTask") => {debugger
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(userData.token);
    setUser(userData);
    setIsAuthenticated(true);

    navigate(redirectPath);
  };

  const logout = () => {debugger
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    navigate("/loginpage");
  };

  if (loading) return null; // ✅ wait until auth state is ready

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
