"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
 Grid,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Save,
  Delete,
  Upload,
  Visibility,
  VisibilityOff,
  LockReset,
} from "@mui/icons-material";

export default function CMSUserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: "Deva Kumar",
    email: "deva@gpkvacations.com",
    department: "Development",
    role: "Full Stack Developer",
    dob: "2000-08-12",
    age: 25,
    username: "devakumar",
    image: "/profile-demo.jpg",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile({ ...profile, image: url });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        p: 4,
        background: "#fafafa",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* 🧍 Profile Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "white",
          borderRadius: 3,
          p: 3,
          boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar
            src={profile.image}
            alt={profile.name}
            sx={{
              width: 100,
              height: 100,
              border: "3px solid #1976d2",
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {profile.name}
            </Typography>
            <Typography color="text.secondary">{profile.role}</Typography>
            <Button
              component="label"
              variant="outlined"
              size="small"
              startIcon={<Upload />}
              sx={{ mt: 1 }}
            >
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>
        </Box>

        <Box display="flex" gap={1.5}>
          {isEditing ? (
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={() => setIsEditing(false)}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
          <Button variant="outlined" color="error" startIcon={<Delete />}>
            Delete
          </Button>
        </Box>
      </Box>

      {/* 👤 User Details Section */}
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
        >
          General Information
        </Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Full Name"
              fullWidth
              value={profile.name}
              disabled={!isEditing}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Email"
              fullWidth
              value={profile.email}
              disabled={!isEditing}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Department"
              fullWidth
              value={profile.department}
              disabled={!isEditing}
              onChange={(e) => handleChange("department", e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Role"
              fullWidth
              value={profile.role}
              disabled={!isEditing}
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={profile.dob}
              disabled={!isEditing}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Age"
              fullWidth
              value={profile.age}
              disabled={!isEditing}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Username"
              fullWidth
              value={profile.username}
              disabled={!isEditing}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      {/* 🔒 Password Change Section */}
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "primary.main" }}
        >
          Account Security
        </Typography>

        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              label="Current Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={passwordData.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              fullWidth
              value={passwordData.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={passwordData.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LockReset />}
            sx={{ px: 3, borderRadius: 2 }}
          >
            Update Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
