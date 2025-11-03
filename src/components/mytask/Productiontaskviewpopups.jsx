"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import { FolderOpen } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../../Config/api";

export default function Productiontaskviewpopups({ selectmaintaskid }) {
  const token = localStorage.getItem("token");
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectmaintaskid) {
      myTaskMainLoad();
    }
  }, [selectmaintaskid]);

  const myTaskMainLoad = async () => {
    try {
      debugger;
      const param = { SelectMainTaskId: selectmaintaskid };
      const res = await axios.post(
        `${API_URL}/Task/Productiontaskviewpopup`,
        param,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      debugger;
      if (res.data.success && res.data.data) {
        setTask(res.data.data);
      } else {
        console.error("Failed to load master task data:", res.data.message);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🌀 Show loader while fetching data
  if (loading) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body2" mt={2}>
          Loading task details...
        </Typography>
      </Box>
    );
  }

  // ⚠️ Show message if no data found
  if (!task) {
    return (
      <Box sx={{ p: 5, textAlign: "center" }}>
        <Typography color="error" variant="body1">
          Task data not found.
        </Typography>
      </Box>
    );
  }

  // ✅ Render UI once data is loaded
  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8",  }}>
      {/* Header */}
      <Typography variant="h5" fontWeight={700} color="primary" mb={3}>
        📋 Production Task Overview
      </Typography>

      {/* Overview Section */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: "white",
        }}
      >
        <Grid container spacing={3}>
          {/* Project Info */}
          <Grid size={{ xs: 12, md: 3}}>
            <Typography variant="subtitle2" color="text.secondary">
              Project Name
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {task.projectName || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3}}>
            <Typography variant="subtitle2" color="text.secondary">
              Client
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {task.client?.name || task.client || "-"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3}}>
            <Typography variant="subtitle2" color="text.secondary">
              Request Type
            </Typography>
            <Typography variant="body1">
              {task.requestType?.name || task.requestType || "-"}
            </Typography>
          </Grid>

          {/* Dates */}
          <Grid size={{ xs: 12, md: 3}}>
            <Typography variant="subtitle2" color="text.secondary">
              Request Date
            </Typography>
            <Typography variant="body1">
              {new Date(task.requestDate).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3}}>
            <Typography variant="subtitle2" color="text.secondary">
              Delivery Date
            </Typography>
            <Typography variant="body1">
              {new Date(task.deliveryDate).toLocaleDateString()}
            </Typography>
          </Grid>

          {/* Status & Priority */}
          <Grid size={{ xs: 12, md: 3}}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Chip
              size="small"
              label={task.taskStatusdata?.name || task.taskStatusdata}
              color={
                (task.taskStatusdata?.name || task.taskStatusdata) ===
                "Completed"
                  ? "success"
                  : (task.taskStatusdata?.name || task.taskStatusdata) ===
                    "In Progress"
                  ? "warning"
                  : "default"
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3}}>
            <Typography variant="subtitle2" color="text.secondary">
              Priority
            </Typography>
            <Chip
              size="small"
              variant="outlined"
              label={task.taskPRIORITY?.name || task.taskPRIORITY}
              color={
                (task.taskPRIORITY?.name || task.taskPRIORITY) === "High"
                  ? "error"
                  : (task.taskPRIORITY?.name || task.taskPRIORITY) === "Medium"
                  ? "warning"
                  : "default"
              }
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Divider */}
      <Divider sx={{ my: 3 }} />

      {/* Task Details */}
      <Typography
        variant="h6"
        fontWeight={600}
        color="primary"
        sx={{ mb: 2 }}
      >
        Task Details
      </Typography>

      {task.taskDetails?.length > 0 ? (
        task.taskDetails.map((t, idx) => (
          <Paper
            key={idx}
            elevation={0}
            sx={{
              p: 3,
              mb: 2,
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              backgroundColor: "#fff",
            }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12}}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">{t.description}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 2}}>
                <Typography variant="subtitle2" color="text.secondary">
                  Detailer
                </Typography>
                <Typography variant="body1">{t.detailer}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 2}}>
                <Typography variant="subtitle2" color="text.secondary">
                  Checker
                </Typography>
                <Typography variant="body1">{t.checker}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 2}}>
                <Typography variant="subtitle2" color="text.secondary">
                  PM
                </Typography>
                <Typography variant="body1">{t.pm}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 2}}>
                <Typography variant="subtitle2" color="text.secondary">
                  Priority
                </Typography>
                <Chip
                  size="small"
                  label={t.priority?.name || t.priority}
                  color={
                    (t.priority?.name || t.priority) === "High"
                      ? "error"
                      : (t.priority?.name || t.priority) === "Medium"
                      ? "warning"
                      : "default"
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, md: 2}}>
                <Typography variant="subtitle2" color="text.secondary">
                  Release Type
                </Typography>
                <Typography variant="body1">
                  {t.releasetype?.name || t.releasetype}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 12}}>
                <Typography variant="subtitle2" color="text.secondary">
                  Notes
                </Typography>
                <Typography variant="body1">{t.notes}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No task details available.
        </Typography>
      )}

      {/* Project Link */}
           {/* Remarks */}
      {task.projectLink && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 3,
            borderRadius: 2,
             borderRadius: 3,
              border: "1px solid #e0e0e0",
              backgroundColor: "#fff",
          }}
        >
          <Typography variant="body2">
            <strong>projectLink:</strong> {task.projectLink}
          </Typography>
        </Paper>
      )}

      {/* Remarks */}
      {task.remarks && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 3,
            borderRadius: 2,
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              backgroundColor: "#fff",
          }}
        >
          <Typography variant="body2">
            <strong>Remarks:</strong> {task.remarks}
          </Typography>
        </Paper>
      )}

      {/* Footer */}
      <Stack direction="row" justifyContent="flex-end" mt={2}>
        <Typography variant="caption" color="text.secondary">
          Created by: {task.createdBy} on{" "}
          {new Date(task.createdDate).toLocaleString()}
        </Typography>
      </Stack>
    </Box>
  );
}
