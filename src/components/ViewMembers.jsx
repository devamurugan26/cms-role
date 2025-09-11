import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const demoMembers = [
  { name: "John Doe", role: "Sales Head", createdBy: "Admin" },
  { name: "Alice Smith", role: "Production Manager", createdBy: "Admin" },
  { name: "Bob Johnson", role: "Global Component Viewer", createdBy: "Admin" },
];

const ViewMembers = ({ title = "Department Members", initialMembers = demoMembers }) => {
  const [members, setMembers] = useState(initialMembers);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", createdBy: "" });

  const handleOpen = (index = null) => {
    if (index !== null) {
      setFormData(members[index]);
      setEditingIndex(index);
    } else {
      setFormData({ name: "", role: "", createdBy: "" });
      setEditingIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (editingIndex !== null) {
      const updated = [...members];
      updated[editingIndex] = formData;
      setMembers(updated);
    } else {
      setMembers([...members, formData]);
    }
    handleClose();
  };

  const handleDelete = (index) => setMembers(members.filter((_, i) => i !== index));

  return (
    <Box sx={{ m: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Member
        </Button>
      </Box>

      {/* Members Table */}
      <TableContainer component={Paper} sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>S.No</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Created By</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.length > 0 ? (
              members.map((member, index) => (
                <TableRow key={index} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.createdBy}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpen(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3, color: "text.secondary" }}>
                  No members found. Click "Add Member" to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingIndex !== null ? "Edit Member" : "Add Member"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Created By"
            fullWidth
            value={formData.createdBy}
            onChange={(e) => setFormData({ ...formData, createdBy: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewMembers;
