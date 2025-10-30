"use client";
import React from "react";
import { Box, Paper, Grid, Typography, Chip, Button } from "@mui/material";
import { FolderOpen } from "@mui/icons-material";

export default function Productiontaskviewpopups() {
  const task = {
    projectName: "Corporate Branding Website",
    client: "NextGen Designs Pvt Ltd",
    taskPRIORITY: "High",
    TaskStatusdata: "In Progress",
    requestDate: "2025-10-15",
    deliveryDate: "2025-11-10",
    requestType: "Web Development",
    projectLink: "https://example.com/project/branding",
    remarks: "Awaiting final brand guideline approval.",
    createdBy: "Devakumar",
    createdDate: "2025-10-14",
    TaskDetails: [
      {
        description: "Design responsive homepage UI",
        notes: "Use new branding color palette.",
        detailer: "Arun Kumar",
        checker: "Meena Raj",
        pm: "Vikram",
        priority: "High",
        releasetype: "Initial Release",
      },
      {
        description: "Design responsive homepage UI",
        notes: "Use new branding color palette.",
        detailer: "Arun Kumar",
        checker: "Meena Raj",
        pm: "Vikram",
        priority: "High",
        releasetype: "Initial Release",
      },
    ],
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* 🔹 Header */}
      <Typography variant="h5" fontWeight={700} color="primary" mb={3}>
        Production Task Overview
      </Typography>

      {/* 🔹 Top Row */}
  <Paper
  elevation={0}
  sx={{
    p: 3,
    mb: 2,
    border: "1px solid #e0e0e0",
    borderRadius: 2,
    background: "#fafafa",
  }}
>
  <Grid container spacing={2} alignItems="center">
    {/* Project Name */}
    <Grid size={{ xs: 12, md: 2.5 }}>
      <Typography variant="body2" fontWeight={600}>
        Project Name
      </Typography>
      <Typography variant="body2">{task.projectName}</Typography>
    </Grid>

    {/* Client */}
    <Grid size={{ xs: 12, md: 2.2 }}>
      <Typography variant="body2" fontWeight={600}>
        Client
      </Typography>
      <Typography variant="body2">{task.client}</Typography>
    </Grid>

    {/* Request Date */}
    <Grid size={{ xs: 12, md: 1.5 }}>
      <Typography variant="body2" fontWeight={600}>
        Request Date
      </Typography>
      <Typography variant="body2">{task.requestDate}</Typography>
    </Grid>

    {/* Delivery Date */}
    <Grid size={{ xs: 12, md: 1.5 }}>
      <Typography variant="body2" fontWeight={600}>
        Delivery Date
      </Typography>
      <Typography variant="body2">{task.deliveryDate}</Typography>
    </Grid>

    {/* Request Type */}
    <Grid size={{ xs: 12, md: 1.8 }}>
      <Typography variant="body2" fontWeight={600}>
        Request Type
      </Typography>
      <Typography variant="body2">{task.requestType}</Typography>
    </Grid>

    {/* Status */}
    <Grid
      size={{ xs: 6, md: 1.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "flex-start", md: "flex-start" },
        gap: 0.5,
      }}
    >
      <Typography variant="body2" fontWeight={600}>
        Status
      </Typography>
      <Chip
        size="small"
        label={task.TaskStatusdata}
        color={
          task.TaskStatusdata === "Completed"
            ? "success"
            : task.TaskStatusdata === "In Progress"
            ? "warning"
            : "default"
        }
      />
    </Grid>

    {/* Priority */}
    <Grid
      size={{ xs: 6, md: 1 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "flex-start", md: "flex-end" },
        gap: 0.5,
      }}
    >
      <Typography variant="body2" fontWeight={600}>
        Priority
      </Typography>
      <Chip
        size="small"
        label={task.taskPRIORITY}
        variant="outlined"
        color={
          task.taskPRIORITY === "High"
            ? "error"
            : task.taskPRIORITY === "Medium"
            ? "warning"
            : "default"
        }
      />
    </Grid>
  </Grid>
</Paper>


      {/* 🔹 Task Details Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="primary" fontWeight={600} gutterBottom>
          Task Details
        </Typography>

        {task.TaskDetails.map((t, idx) => (
          <Paper
            key={idx}
            elevation={0}
            sx={{
              p: 3,
              mb: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              background: "#fafafa",
            }}
          >
            {/* Description - One Full Row */}
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" fontWeight={600}>
                  Description
                </Typography>
                <Typography variant="body2">{t.description}</Typography>
              </Grid>

              {/* Detailer, Checker, PM, Priority, Release Type - One Row */}
              <Grid size={{ xs: 12, md: 2 }}>
                <Typography variant="body2" fontWeight={600}>
                  Detailer
                </Typography>
                <Typography variant="body2">{t.detailer}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Typography variant="body2" fontWeight={600}>
                  Checker
                </Typography>
                <Typography variant="body2">{t.checker}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Typography variant="body2" fontWeight={600}>
                  PM
                </Typography>
                <Typography variant="body2">{t.pm}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Typography variant="body2" fontWeight={600}>
                  Priority
                </Typography>
                <Chip
                  size="small"
                  label={t.priority}
                  color={
                    t.priority === "High"
                      ? "error"
                      : t.priority === "Medium"
                      ? "warning"
                      : "default"
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="body2" fontWeight={600}>
                  Release Type
                </Typography>
                <Typography variant="body2">{t.releasetype}</Typography>
              </Grid>

              {/* Notes - One Full Row */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" fontWeight={600}>
                  Notes
                </Typography>
                <Typography variant="body2">{t.notes}</Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
      {task.projectLink && (
        <Box sx={{ mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<FolderOpen />}
            href={task.projectLink}
            target="_blank"
          >
            Open Project Folder
          </Button>
        </Box>
      )}
      {/* 🔹 Remarks & Footer */}
      <Box sx={{ mt: 3 }}>
        {task.remarks && (
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#f9f9f9",
              p: 2,
              borderRadius: 1,
            }}
          >
            <strong>Remarks:</strong> {task.remarks}
          </Typography>
        )}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 2, display: "block" }}
        >
          Created by: {task.createdBy} on {task.createdDate}
        </Typography>
      </Box>
    </Box>
  );
}
