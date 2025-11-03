import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
const miniWidth = 60;

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "MyTask", icon: <ArticleIcon />, path: "/MyTask" },

    { text: "Dashboard", icon: <HomeIcon />, path: "/Dashboard" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "MasterTableManager", icon: <SettingsIcon />, path: "/MasterTableManager" },
    { text: "Settings", icon: <ContactEmergencyIcon />, path: "/settings" },

  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: miniWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: miniWidth,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <Tooltip title={item.text} placement="right">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.path)} // ✅ navigate on click
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
