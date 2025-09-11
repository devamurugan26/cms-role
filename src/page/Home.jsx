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

  const [open, setOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    title: "",
    icon: "AccountBalanceIcon",
    description: "",
    color: "#4caf50",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const handleAddCard = () => {
    setDashboardCards((prev) => [
      ...prev,
      {
        ...newCard,
        icon: availableIcons[newCard.icon], // convert string to JSX
      },
    ]);
    setNewCard({
      title: "",
      icon: "AccountBalanceIcon",
      description: "",
      color: "#4caf50",
    });
    handleClose();
  };

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
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Dashboard
        </Typography>

        <IconButton color="primary" onClick={handleOpen}>
          <AddCircleIcon sx={{ fontSize: 32 }} />
        </IconButton>
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Card</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={newCard.title}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            select
            fullWidth
            label="Icon"
            name="icon"
            value={newCard.icon}
            onChange={handleChange}
            margin="dense"
          >
            {Object.keys(availableIcons).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newCard.description}
            onChange={handleChange}
            margin="dense"
            multiline
          />
          <TextField
            fullWidth
            label="Color (Hex Code)"
            name="color"
            value={newCard.color}
            onChange={handleChange}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCard}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
