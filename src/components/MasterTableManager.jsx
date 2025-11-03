import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../Config/api";
import TaskIcon from '@mui/icons-material/Task';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
export default function MasterTableManager() {
  const [selectedType, setSelectedType] = useState("Client");
  const [formValue, setFormValue] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const tableOptions = [
    { name: "Client", icon: <BusinessIcon /> },
    { name: "RequestType", icon: <RequestQuoteIcon /> },
    { name: "ReleaseType", icon: <RocketLaunchIcon /> },
    { name: "priority", icon: <PriorityHighIcon /> },
    { name: "TaskStatus", icon: <TaskIcon /> },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.post(`${API_URL}/Master/MasterLoad`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setMasterData(res.data.data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  const handleSave = async () => {
    if (!formValue.trim()) return;
    try {
      const Param = { name: formValue, type: selectedType, user: user.user_id };
      await axios.post(`${API_URL}/Master/MasterInsert`, Param, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormValue("");
      loadData();
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`${API_URL}/Master/MasterDelete`, { id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadData();
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditValue(item.name);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editValue.trim()) return;
    try {
      const Param = {
        id: editingItem.id,
        Name: editValue,
        Type: editingItem.type,
        user: user.user_id,
      };
      await axios.post(`${API_URL}/Master/MasterUpdate`, Param, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditModalOpen(false);
      loadData();
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "85vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4ebf5 100%)",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(0,0,0,0.1)",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}
        >
          Master Tables
        </Typography>
        <List sx={{ flex: 1 }}>
          {tableOptions.map((opt) => (
            <ListItemButton
              key={opt.name}
              selected={selectedType === opt.name}
              onClick={() => setSelectedType(opt.name)}
              sx={{
                borderRadius: 2,
                mb: 1,
                color: selectedType === opt.name ? "#1f2937" : "#333",
                backgroundColor: selectedType === opt.name ? "#1f2937" : "transparent",
                "&:hover": {
                  backgroundColor:
                    selectedType === opt.name
                      ? "#115293"
                      : "rgba(25,118,210,0.1)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: selectedType === opt.name ? "#1f2937" : "#1976d2",
                  minWidth: 35,
                }}
              >
                {opt.icon}
              </ListItemIcon>
              <ListItemText
                primary={opt.name.replace(/([A-Z])/g, " $1").trim()}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, p: 3, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            background:
              "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
            p: 2,
            borderRadius: 2,
            color: "white",
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            {selectedType.replace(/([A-Z])/g, " $1").trim()} Management
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <InputBase
              placeholder={`Enter ${selectedType} name`}
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              sx={{
                px: 2,
                py: 0.8,
                bgcolor: "white",
                borderRadius: 2,
                width: 300,
                fontSize: 14,
              }}
            />
            <Button
              variant="contained"
              color="inherit"
              onClick={handleSave}
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                color: "#1976d2",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                bgcolor: "#fff",
                "&:hover": { bgcolor: "#e3f2fd" },
              }}
            >
              Add
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            borderRadius: 2,
            bgcolor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& th, & td": {
                borderBottom: "1px solid #eee",
                p: 1.5,
                textAlign: "left",
                fontSize: 14,
              },
              "& th": {
                bgcolor: "#f5f5f5",
                fontWeight: 700,
                color: "#333",
              },
              "& tr:hover td": {
                bgcolor: "#f9fafc",
              },
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "5%" }}>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Created By</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {masterData
                .filter((i) => i.type === selectedType)
                .map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>{item.username}</td>
                    <td>
                      <IconButton size="small" onClick={() => handleEdit(item)}>
                        <EditIcon fontSize="small" color="primary" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(item.id)}>
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Box>
        </Box>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit {editingItem?.type}</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label={`${editingItem?.type} Name`}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
