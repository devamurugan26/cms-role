"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";

export default function WorkerDetailForm({ onClickclose }) {
  const [formData, setFormData] = React.useState({
    weight: "",
    revisionHours: "",
    changeOrder: "",
    projectLink: "",
    detailType: "",
    remarks: "",
    action: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
  
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 1200,
        margin: "auto",
        backgroundColor: "transparent",
      }}
    >
      {/* 🔹 Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: "#1565c0",
          letterSpacing: 0.5,
        }}
      >
        Worker Task Details
      </Typography>

      {/* 🔹 Form Fields */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="Weight (LBS)"
            variant="outlined"
            value={formData.weight}
            onChange={handleChange("weight")}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="Revision Hours"
            variant="outlined"
            value={formData.revisionHours}
            onChange={handleChange("revisionHours")}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            label="Change Order"
            variant="outlined"
            value={formData.changeOrder}
            onChange={handleChange("changeOrder")}
            size="small"
            fullWidth
          />
        </Grid>

        {/* Action Dropdown */}
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Action</InputLabel>
            <Select
              label="Action"
              value={formData.action}
              onChange={handleChange("action")}
            >
              <MenuItem value="complete">✅ Complete</MenuItem>
              <MenuItem value="request_info">📄 Request Info</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Project Folder Link"
            placeholder="https://drive.google.com/folder/..."
            value={formData.projectLink}
            onChange={handleChange("projectLink")}
            size="small"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Detail Type</InputLabel>
            <Select
              label="Detail Type"
              value={formData.detailType}
              onChange={handleChange("detailType")}
            >
              <MenuItem value="drawing">Drawing</MenuItem>
              <MenuItem value="spec">Specification</MenuItem>
              <MenuItem value="update">Update</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={12}>
          <TextField
            label="Remarks"
            multiline
            rows={3}
            value={formData.remarks}
            onChange={handleChange("remarks")}
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>

      {/* 🔹 Footer */}
      <Divider sx={{ my: 4, borderColor: "#e0e0e0" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClickclose}
          sx={{
            borderColor: "#1976d2",
            color: "#1976d2",
            textTransform: "none",
            "&:hover": { borderColor: "#115293" },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background: "linear-gradient(90deg, #1976d2, #2196f3)",
            textTransform: "none",
            px: 3,
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(90deg, #1565c0, #1e88e5)",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
