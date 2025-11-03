import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BarChartIcon from "@mui/icons-material/BarChart";
import CampaignIcon from "@mui/icons-material/Campaign";
import BuildIcon from "@mui/icons-material/Build";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

const availableIcons = {
  AccountBalanceIcon: <AccountBalanceIcon />,
  BarChartIcon: <BarChartIcon />,
  CampaignIcon: <CampaignIcon />,
  BuildIcon: <BuildIcon />,
};

const Home = () => {
  const [dashboardCards, setDashboardCards] = useState([
    {
      title: "Management",
      icon: <AccountBalanceIcon />,
      description: "Overview of all management activities",
      color: "#4caf50",
    },
    {
      title: "FinancialTeam",
      icon: <BarChartIcon />,
      description: "Track budgets, expenses & reports",
      color: "#2196f3",
    },
    {
      title: "SalesDepartment",
      icon: <CampaignIcon />,
      description: "Monitor sales and marketing campaigns",
      color: "#ff9800",
    },
    {
      title: "Production",
      icon: <BuildIcon />,
      description: "Manage production schedules & output",
      color: "#f44336",
    },
  ]);

  const navigate = useNavigate();

  return (
    <Box sx={{ m: 1 }}>
      {/* Dashboard Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Dashboard
        </Typography>

      
      </Box>

      {/* Cards */}
      <Grid container spacing={3}>
        {dashboardCards.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: "100%",
                minWidth: 280,
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                px: 2,
                py: 3,
                minHeight: 180,
              }}
               onClick={() => {
                if (card.title === "Production") {
                  navigate("/production-team");
                }
                 if (card.title === "Management") {
                  navigate("/ManagementTeam");
                }
                 if (card.title === "FinancialTeam") {
                  navigate("/FinancialTeam");
                }
                 if (card.title === "SalesDepartment") {
                  navigate("/SalesDepartment");
                }
              }}
            >
              <Avatar
                sx={{
                  bgcolor: card.color,
                  width: 56,
                  height: 56,
                  mb: 2,
                }}
              >
                {card.icon}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {card.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Popup Dialog */}
    
    </Box>
  );
};

export default Home;
