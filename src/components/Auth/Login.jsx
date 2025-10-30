import React, { createContext, useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../../Config/api"; // ✅ correct
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const { login } = useAuth(); // ✅ use context

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/UserLogin`, {
        Email: email,
        Password: password,
      });
      debugger;

      if (res.data.success) {
        // Optional: store user info in localStorage or context
        const userData = res.data.data;

        // Save the token to localStorage
        localStorage.setItem("token", userData.token);

        // Optionally save user info as well
        localStorage.setItem(
          "user",
          JSON.stringify({
            user_id: userData.user_id,
            username: userData.username,
            email: userData.email,
          })
        );

        // Update your state if needed
       login(userData); // second argument is redirect path
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Left Branding */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#0d3b66", // deep corporate blue
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 5,
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
          Global Bar Drafting
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 400 }}>
          Professional platform for bar drafting and management. Manage your
          team, roles, and workflow efficiently.
        </Typography>
      </Box>

      {/* Right Login Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f7fa", // subtle neutral tone
          p: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            boxShadow: "0px 15px 40px rgba(0,0,0,0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: "#0d3b66",
              textAlign: "center",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, textAlign: "center", color: "#555" }}
          >
            Sign in to continue to Global Bar Drafting
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            onClick={handleLogin}
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 2,
              backgroundColor: "#0d3b66",
              "&:hover": {
                backgroundColor: "#0b3155",
              },
            }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            sx={{
              mt: 3,
              textAlign: "center",
              color: "#777",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline", color: "#0d3b66" },
            }}
            onClick={() => alert("Forgot password?")}
          >
            Forgot Password?
          </Typography>

          <Box sx={{ mt: 4, textAlign: "center", color: "#aaa" }}>
            &copy; 2025 Global Bar Drafting
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
