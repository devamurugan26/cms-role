"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Button,
  MenuItem,
  IconButton,
  Paper,
  Select,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../../Config/api";

const CreateProductionTaskPopup = ({ open, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [client, setClient] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [requestType, setRequestType] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [remarks, setRemarks] = useState("");
  const [CLIENT_OPTIONS, setCLIENT_OPTIONS] = useState([]);
  const [RELEASE_REQUEST_OPTIONS, setRELEASE_REQUEST_OPTIONS] = useState([]);
  const [REQUEST_TYPE_OPTIONS, setREQUEST_TYPE_OPTIONS] = useState([]);
  const [CHECKER_OPTIONS, setCHECKER_OPTIONS] = useState([]);
  const [PM_OPTIONS, setPM_OPTIONS] = useState([]);
  const [DETAILER_OPTIONS, setDETAILER_OPTIONS] = useState([]);
  const [PRIORITY_OPTIONS, setPRIORITY_OPTIONS] = useState([]);
  const [taskPRIORITY,settaskPRIORITY]=useState("")
  const[TaskStatus,setTaskStatus]=useState([])
   const[TaskStatusdata,setTaskStatusdata]=useState()
  const [tasks, setTasks] = useState([
    {
      description: "",
      detailer: "",
      checker: "",
      pm: "",
      priority: "",
      release: "",
      notes: "",
    },
  ]);

  useEffect(() => {
    productionmastertaskload();
  }, []);
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const handleAddTask = () =>
    setTasks([
      ...tasks,
      {
        description: "",
        detailer: "",
        checker: "",
        pm: "",
        priority: "Normal",
        release: "",
        notes: "",
      },
    ]);
  const handleRemoveTask = (index) =>
    setTasks(tasks.filter((_, i) => i !== index));
  const handleChange = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };

  const handleAssign = async () => {
    debugger;
    if (!projectName.trim()) {
      alert("Please enter project name.");
      return;
    }
    // Build structured payload for backend
    const param = {
      projectName,
      client,
      taskPRIORITY,
      requestDate,
      deliveryDate,
      TaskStatusdata,
      requestType,
      projectLink,
      remarks,
      createdBy: user?.user_id || "Unknown",
      createdDate: new Date().toISOString(),
      taskDetails: tasks.map((task) => ({
        detailer: task.detailer.user_Id,
        checker: task.checker.user_Id,
        pm: task.pm.user_Id,
        priority: task.priority,
        releasetype: task.release,
        description: task.description,
        notes: task.notes,
      })),
    };

    try {
      const res = await axios.post(
        `${API_URL}/Task/taskproductioncreate`,
        param,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      debugger;
      if (res.status === 200 || res.status === 201) {
        alert("✅ Task created successfully!");
        onClose();
      } else {
        alert("⚠️ Something went wrong while creating task.");
      }
    } catch (error) {
      console.error("❌ Task creation error:", error);
      alert(error.response?.data?.message || "Failed to create task.");
    }
  };

  const productionmastertaskload = async () => {
    try {
      debugger;
      const res = await axios.post(
        `${API_URL}/Task/productionmastertaskload`,
        {}, // POST body (empty object if no payload)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      debugger;
      if (res.data.success && res.data.data) {
        const {
          clienT_OPTIONS,
          releasE_REQUEST_OPTIONS,
          requesT_TYPE_OPTIONS,
          checkeR_OPTIONS,
          detaileR_OPTIONS,
          pM_OPTIONS,
          prioritY_OPTIONS,
          taskStatus_OPTIONS,
        } = res.data.data;

        setCLIENT_OPTIONS(clienT_OPTIONS || []);
        setREQUEST_TYPE_OPTIONS(requesT_TYPE_OPTIONS || []);
        setRELEASE_REQUEST_OPTIONS(releasE_REQUEST_OPTIONS || []);
        setCHECKER_OPTIONS(checkeR_OPTIONS);
        setDETAILER_OPTIONS(detaileR_OPTIONS);
        setPM_OPTIONS(pM_OPTIONS);
        setPRIORITY_OPTIONS(prioritY_OPTIONS);
        setTaskStatus(taskStatus_OPTIONS)
      } else {
        console.error("Failed to load master task data:", res.data.message);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
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
        🧾 Create New Project Task
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
        {/* Header Section */}
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
          <Grid container spacing={2} alignItems="center">
            {/* Project Name */}
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Grid>

            {/* Client Select */}
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="client-select-label">Client</InputLabel>
                <Select
                  labelId="client-select-label"
                  id="client-select"
                  value={client} // stores the client ID
                  label="Client"
                  onChange={(e) => setClient(e.target.value)} // updates ID
                >
                
                  {CLIENT_OPTIONS.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Request Date */}
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="Request Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
              />
            </Grid>

            {/* Request Type */}
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="request-type-label">Request Type</InputLabel>
                <Select
                  labelId="request-type-label"
                  id="request-type"
                  value={requestType}
                  label="RequestType"
                  onChange={(e) => setRequestType(e.target.value)}
                >
               
                  {REQUEST_TYPE_OPTIONS.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Delivery Date */}
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="Delivery Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                select
                label="TaskPriority"
                value={taskPRIORITY}
                onChange={(e) =>
                  settaskPRIORITY(e.target.value)
                }
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
             <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="TaskStatus-label">TaskStatus</InputLabel>
                <Select
                  labelId="TaskStatus-label"
                  id="TaskStatus"
                  value={TaskStatusdata} // stores the client ID
                  label="TaskStatus"
                  onChange={(e) => setTaskStatusdata(e.target.value)} // updates ID
                >
                 
                  {TaskStatus.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Tasks Section */}
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: "#1976d2" }}
        >
          Assignment Tasks
        </Typography>

        {tasks.map((task, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              mb: 2,
              p: 3,
              borderRadius: 2,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
            }}
          >
            <Grid container spacing={2}>
              {/* Row 1: Full-width Description */}

              {/* Row 2: Compact fields */}
              <Grid size={12} container spacing={1} alignItems="center">
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={task.description || ""}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    multiline
                    minRows={3}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    label="Detailer"
                    value={task.detailer}
                    onChange={(e) =>
                      handleChange(index, "detailer", e.target.value)
                    }
                  >
                    {DETAILER_OPTIONS.map((opt) => (
                      <MenuItem key={opt.id || opt} value={opt.id || opt}>
                        {opt.username || opt}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Checker */}
                <Grid size={{ xs: 12, md: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    label="Checker"
                    value={task.checker}
                    onChange={(e) =>
                      handleChange(index, "checker", e.target.value)
                    }
                  >
                    {CHECKER_OPTIONS.map((opt) => (
                      <MenuItem key={opt.id || opt} value={opt.id || opt}>
                        {opt.username || opt}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    label="production manager"
                    value={task.pm}
                    onChange={(e) => handleChange(index, "pm", e.target.value)}
                  >
                    {PM_OPTIONS.map((opt) => (
                      <MenuItem key={opt.id || opt} value={opt.id || opt}>
                        {opt.username || opt}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    label="PRIORITY"
                    value={task.priority}
                    onChange={(e) =>
                      handleChange(index, "priority", e.target.value)
                    }
                  >
                    {PRIORITY_OPTIONS.map((opt) => (
                      <MenuItem key={opt.id || opt} value={opt.id || opt}>
                        {opt.name || opt}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    label="Release"
                    value={task.release}
                    onChange={(e) =>
                      handleChange(index, "release", e.target.value)
                    }
                  >
                    {RELEASE_REQUEST_OPTIONS.map((opt) => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Notes"
                value={task.notes || ""}
                onChange={(e) => handleChange(index, "notes", e.target.value)}
                multiline
                minRows={3}
                sx={{ mt: 3 }}
              />
              {/* Row 3: Full-width Notes */}

              <Grid
                size={12}
                sm={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {index === tasks.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutline />}
                    onClick={handleAddTask}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    Add Task
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<RemoveCircleOutline />}
                    onClick={() => handleRemoveTask(index)}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    Remove Task
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        ))}

        {/* Footer Fields */}
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Project Folder Link"
            placeholder="https://drive.google.com/folder/project123"
            variant="outlined"
            sx={{ mb: 2 }}
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />
          <TextField
            fullWidth
            label="Remarks"
            variant="outlined"
            multiline
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </Box>
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
          color="error"
          onClick={onClose}
          sx={{ fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAssign}
          sx={{ px: 5, fontWeight: 700, borderRadius: 2, boxShadow: 3 }}
        >
          Assign Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProductionTaskPopup;
