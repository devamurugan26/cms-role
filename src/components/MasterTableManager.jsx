import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Input,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../Config/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
export default function MasterTableManager() {
  const [selectedType, setSelectedType] = useState("Client");
  const [formValue, setFormValue] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    loadData();
  }, []);
  const tableOptions = [
    { name: "Client", icon: <BusinessIcon /> },
    { name: "RequestType", icon: <RequestQuoteIcon /> },
    { name: "ReleaseType", icon: <RocketLaunchIcon /> },
    { name: "priority", icon: <RocketLaunchIcon /> },
    { name: "TaskStatus", icon: <RocketLaunchIcon /> },
  ];

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  // Load data from API
  const loadData = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/Master/MasterLoad`,
        {}, // POST body (empty object if no payload)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      debugger;
      if (res.data.success) {
        setMasterData(res.data.data);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };
  const handleEdit = (item) => {
    setEditingItem(item);
    setEditValue(item.name);
    setEditModalOpen(true);
  };

  // Add or Edit item
  const handleSave = async () => {
    debugger;
    if (!formValue.trim()) return;

    try {
      const Param = { name: formValue, type: selectedType, user: user.user_id };

      await axios.post(`${API_URL}/Master/MasterInsert`, Param, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormValue("");
      setEditingIndex(null);
      loadData();
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {

        const param={
            id:id
        }
      await axios.post(`${API_URL}/Master/MasterDelete`, param,{
        headers: { Authorization: `Bearer ${token}` },
      });
      loadData();
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  // Edit item
  const handleUpdate = async () => {
    if (!editValue.trim()) return;
debugger
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
      setEditingItem(null);
      loadData(); // refresh data
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  return (
    <Grid container spacing={2} sx={{ p: 2, height: "83vh" }}>
      {/* Left Sidebar */}
      <Grid size={2} sx={{ height: "100%" }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: 2,
            bgcolor: "background.paper",
            height: "100%",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Master Tables
          </Typography>
          <List>
            {tableOptions.map((opt) => (
              <ListItemButton
                key={opt.name}
                selected={selectedType === opt.name}
                onClick={() => setSelectedType(opt.name)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                    "& .MuiListItemIcon-root": { color: "white" },
                  },
                }}
              >
                <ListItemIcon>{opt.icon}</ListItemIcon>
                <ListItemText
                  primary={opt.name.replace(/([A-Z])/g, " $1").trim()}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Grid>

      {/* Right Content */}
      <Grid size={10} sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            height: "100%",
            overflowY: "auto",
          }}
        >
          {/* Add / Edit Form */}
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardHeader
              title={`${editingIndex ? "Edit" : "Add"} ${selectedType
                .replace(/([A-Z])/g, " $1")
                .trim()}`}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                p: 2,
              }}
            >
              <Input
                placeholder={`Enter ${selectedType
                  .replace(/([A-Z])/g, " $1")
                  .trim()} name`}
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                sx={{
                  flex: 1,
                  minWidth: 250,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                }}
              />
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleSave}
                sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
              >
                {editingIndex ? "Update" : "Add"}
              </Button>
            </CardContent>
          </Card>

          {/* List Section */}
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardHeader
              title={`${selectedType.replace(/([A-Z])/g, " $1").trim()} List`}
              sx={{
                bgcolor: "grey.100",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />
            <CardContent>
              {!masterData?.some((item) => item.type === selectedType) ? (
                <Typography color="text.secondary" variant="body2">
                  No records yet.
                </Typography>
              ) : (
                <Box
                  component="table"
                  sx={{
                    width: "100%",
                    borderCollapse: "collapse",
                    "& th, & td": {
                      border: "1px solid #e0e0e0",
                      p: 1.5,
                      textAlign: "left",
                    },
                    "& thead": { bgcolor: "grey.100", fontWeight: 600 },
                    "& tr:hover": { bgcolor: "grey.50" },
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>#</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Created At</th>
                      <th>Created By</th>
                      <th style={{ width: "15%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {masterData
                      .filter((item) => item.type === selectedType)
                      .map((item, index) => (
                        <tr key={item.id || index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.type}</td>
                          <td>{new Date(item.createdAt).toLocaleString()}</td>
                          <td>{item.username}</td>
                          <td>
                            <IconButton onClick={() => handleEdit(item)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(item.id)}>
                              <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Grid>
    <Dialog
  open={editModalOpen}
  onClose={() => setEditModalOpen(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle>Edit {editingItem?.type}</DialogTitle>
  <DialogContent dividers>
    <TextField
      label={`${editingItem?.type} Name`}
      variant="outlined"    
      fullWidth
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      sx={{ mt: 1 }}
      autoFocus
    />
  </DialogContent>
  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => setEditModalOpen(false)}
    >
      Cancel
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handleUpdate}
    >
      Update
    </Button>
  </DialogActions>
</Dialog>

    </Grid>
  );
}
