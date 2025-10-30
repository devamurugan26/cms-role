import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { InfoOutlined, CheckCircleOutline } from "@mui/icons-material";

export default function ProductionTaskReply({ open, onClose, taskData }) {
  const [weight, setWeight] = useState("");
  const [revisionHours, setRevisionHours] = useState("");
  const [changeOrder, setChangeOrder] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    const payload = {
      taskId: taskData.taskId,
      weight,
      revisionHours,
      changeOrder,
      projectLink,
      remarks,
      updatedBy: "currentUserId",
    };

    console.log("Submit payload:", payload);
    // axios.post("/api/production/SubmitReply", payload);
    onClose();
  };

  const handleRequestInfo = () => {
    // optional API to request clarification
    alert("Request for more info sent to Manager");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: 22,
          textAlign: "center",
          bgcolor: "#1976d2",
          color: "#fff",
          borderBottom: "2px solid #1565c0",
          py: 1.5,
        }}
      >
        🧾 Task Reply / Update
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          backgroundColor: "#f5f5f5",
          maxHeight: "80vh",
          overflowY: "auto",
          py: 3,
        }}
      >
        {/* Project Info */}
        <Paper
          elevation={1}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: "#1976d2" }}
          >
            Project Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                size="small"
                label="Project Name"
                value={taskData.projectName}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Client"
                value={taskData.client}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                size="small"
                label="Request Date"
                type="date"
                value={taskData.requestDate}
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                size="small"
                label="Request Type"
                value={taskData.requestType}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Delivery Date"
                type="date"
                value={taskData.deliveryDate}
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Task Details Section */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            p: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: "#1976d2" }}
          >
            Task Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Description"
                value={taskData.description}
                multiline
                minRows={3}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                size="small"
                label="Priority"
                value={taskData.priority}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                size="small"
                label="Release"
                value={taskData.release}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Worker Reply Section */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            p: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: "#1976d2" }}
          >
            Worker Reply
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                size="small"
                label="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                size="small"
                label="Revision Hours"
                value={revisionHours}
                onChange={(e) => setRevisionHours(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                size="small"
                label="Change Order"
                value={changeOrder}
                onChange={(e) => setChangeOrder(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Folder Link"
                placeholder="https://drive.google.com/folder/yourwork"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks / Notes"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                multiline
                minRows={3}
              />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2.5,
          bgcolor: "#f0f0f0",
          borderTop: "1px solid #ddd",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          color="info"
          startIcon={<InfoOutlined />}
          onClick={handleRequestInfo}
          sx={{ fontWeight: 600 }}
        >
          Request Info
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckCircleOutline />}
          onClick={handleSubmit}
          sx={{
            px: 5,
            fontWeight: 700,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          Submit Reply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
