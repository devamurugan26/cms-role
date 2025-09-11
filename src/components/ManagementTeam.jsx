import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Avatar,
  CircularProgress,
  Divider,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// Utility: Render dynamic icons
const renderIcon = (iconName) => {
  const IconComponent = Icons[iconName];
  if (!IconComponent) return null;
  return <IconComponent fontSize="large" style={{ color: "#fff" }} />;
};

const ManagementTeam = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Simulated API call
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: [
                  {
                    role: "General Management",
                    icon: "Work",
                    color: "#1976d2",
                  },
                  {
                    role: "HR Management",
                    icon: "Groups",
                    color: "#9c27b0",
                  },
                 
                ],
              }),
            1000
          )
        );
        setRoles(response.data);
      } catch (err) {
        console.error("Failed to load roles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <Box sx={{ m: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
          letterSpacing: "0.5px",
          color: "text.primary",
        }}
      >
        Management Team
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {roles.map((role, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  p: 4,
                  borderRadius: 4,
                  background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: role.color,
                    width: 80,
                    height: 80,
                    mb: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    border: "4px solid #fff",
                  }}
                >
                  {renderIcon(role.icon)}
                </Avatar>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    mb: 1,
                  }}
                >
                  {role.role}
                </Typography>

                <Divider sx={{ width: "40%", my: 1 }} />

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                  }}
                >
                  Key function ensuring effective leadership and coordination.
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ManagementTeam;
