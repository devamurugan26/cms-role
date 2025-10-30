"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
  Button,
  TextField,
  Paper,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Grid,
} from "@mui/material";
import {
  Send,
  FileCopy as FileCopyIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import TaskWorkerReply from "./TaskWorkerReplyview";
const demoTasks = [
  {
    id: 1,
    title: "Design Homepage Banner",
    assignedBy: "Alice (Design Lead)",
    assignedTo: "John Smith",
    department: "Design",
    deadline: "2025-10-14",
    priority: "HOT",
    description:
      "Create a new promotional banner for homepage redesign. Ensure alignment with new brand color guidelines.",
    projectLink: "https://drive.google.com/project/banner",
    remarks: "Awaiting review from design lead.",
    subTasks: [
      {
        description: "Draft banner layout and color theme proposal.",
        detailer: "John",
        checker: "Alice",
        pm: "David",
        priority: "HOT",
        release: "R2",
        notes: "Ensure to include product highlights in the design.",
      },
      {
        description: "Finalize assets and export in web formats.",
        detailer: "John",
        checker: "Alice",
        pm: "David",
        priority: "ASAP",
        release: "Final Release",
        notes: "Optimize for mobile view.",
      },
    ],
    replies: [
      {
        id: 1,
        user: "John Smith",
        message: "Started initial design drafts, will share by tomorrow.",
        date: "2025-10-09",
      },
    ],
  },
  {
    id: 2,
    title: "Setup Email Automation",
    assignedBy: "David (Marketing Manager)",
    assignedTo: "Sara Khan",
    department: "Marketing",
    deadline: "2025-10-16",
    priority: "ASAP",
    description:
      "Configure Mailchimp automation for the product launch sequence.",
    projectLink: "https://mailchimp.com/automation",
    remarks: "Automation sequence live and functional.",
    subTasks: [
      {
        description: "Connect Mailchimp API and import customer data.",
        detailer: "Sara",
        checker: "David",
        pm: "Emma",
        priority: "ASAP",
        release: "R1",
        notes: "Ensure GDPR compliance for imported data.",
      },
    ],
    replies: [],
  },
];

const getPriorityColor = (priority) => {
  if (priority === "HOT") return "error";
  if (priority === "ASAP") return "warning";
  return "success";
};

export default function ProductionTaskGridTable() {
  const [selectedTask, setSelectedTask] = useState(demoTasks[0]);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      user: "You",
      message: replyText,
      date: new Date().toISOString().split("T")[0],
    };

    setSelectedTask({
      ...selectedTask,
      replies: [...selectedTask.replies, newReply],
    });

    setReplyText("");
  };

  // State to control popup
  const [open, setOpen] = useState(false);

  // Actions
  const actions = [
    {
      icon: <ContactSupportIcon />,
      name: "otherDepartment ",
      onClick: () => alert("Request clicked"),
    },
    {
      icon: <ContactSupportIcon />,
      name: "REQUEST ARRAISING",
      onClick: () => alert("Request clicked"),
    },
    {
      icon: <NoteAddIcon />,
      name: "Create  Prouduction",
      onClick: () => setOpen(true),
    }, // <-- open popup
  ];

  const handlenewcreaatetask = {};

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb:1,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Task
        </Typography>
      </Box>
      <Box sx={{ display: "flex", height: "84vh", bgcolor: "#f9fafb" }}>
        {/* ===== LEFT SIDEBAR ===== */}
        <Box
          sx={{
            width: { xs: 240, sm: 280, md: 320 },
            bgcolor: "white",
            borderRight: "1px solid #e0e0e0",
            overflowY: "auto",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 2, color: "primary.main" }}
          >
            Inbox
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <List dense>
            {demoTasks.map((task) => (
              <ListItemButton
                key={task.id}
                onClick={() => setSelectedTask(task)}
                selected={selectedTask?.id === task.id}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  p: 2,
                  alignItems: "flex-start",
                  "&.Mui-selected": {
                    bgcolor: "primary.light",
                    color: "white",
                  },
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <ListItemText
                  primary={
                    <Typography fontWeight={600}>{task.title}</Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color={
                        selectedTask?.id === task.id
                          ? "white"
                          : "text.secondary"
                      }
                    >
                      {task.assignedBy}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* ===== CENTER: TASK DETAILS & REPLIES ===== */}
        {/* ===== CENTER: TASK DETAILS & REPLIES ===== */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "#f5f5f5",
            overflowY: "auto",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          {selectedTask ? (
            <Paper
              elevation={1}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                mb: 3,
                maxWidth: "100%",
              }}
            >
              {/* ===== HEADER ===== */}
              <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                {selectedTask.title}
              </Typography>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" fontWeight={600}>
                    client
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    xyz client
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" fontWeight={600}>
                    Request time
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTask.deadline}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" fontWeight={600}>
                    Request type
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    mail
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" fontWeight={600}>
                    Delivery Date
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTask.deadline}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" fontWeight={600}>
                    Department
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTask.department}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" fontWeight={600}>
                    Deadline
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTask.deadline}
                  </Typography>
                </Grid>
              </Grid>

              {/* ===== DESCRIPTION & NOTES ===== */}
              <Typography variant="subtitle1" fontWeight={600} sx={{ my: 1 }}>
                Description
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  background: "#f8f9fa",
                  p: 1.5,
                  borderRadius: 2,
                  mb: 2,
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedTask.description}
              </Typography>

              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                Notes
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  background: "#f8f9fa",
                  p: 1.5,
                  borderRadius: 2,
                  mb: 3,
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedTask.remarks || "—"}
              </Typography>

              {/* ===== SUB-TASKS ===== */}
              {selectedTask.subTasks?.length > 0 ? (
                <Grid spacing={2} sx={{ my: 1 }}>
                  {selectedTask.subTasks.map((task, index) => (
                    <Grid
                      item
                      xs={12}
                      key={index}
                      sx={{
                        p: 2,
                        my: 1,
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        backgroundColor: "#fdfdfd",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6} sm={2.4}>
                          <Typography variant="caption" color="text.secondary">
                            Detailer
                          </Typography>
                          <Typography variant="body2">
                            {task.detailer}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={2.4}>
                          <Typography variant="caption" color="text.secondary">
                            Checker
                          </Typography>
                          <Typography variant="body2">
                            {task.checker}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={2.4}>
                          <Typography variant="caption" color="text.secondary">
                            PM
                          </Typography>
                          <Typography variant="body2">{task.pm}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={2.4}>
                          <Typography variant="caption" color="text.secondary">
                            Priority
                          </Typography>
                          <Box>
                            <Chip
                              label={task.priority}
                              color={
                                task.priority === "HOT"
                                  ? "error"
                                  : task.priority === "ASAP"
                                  ? "warning"
                                  : "success"
                              }
                              size="small"
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6} sm={2.4}>
                          <Typography variant="caption" color="text.secondary">
                            Release
                          </Typography>
                          <Typography variant="body2">
                            {task.release}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  No sub-tasks found for this project.
                </Typography>
              )}

              {/* ===== PROJECT LINK ===== */}
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                Project Folder Link
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  background: "#f8f9fa",
                  p: 1.5,
                  borderRadius: 2,
                  mb: 2,
                  wordBreak: "break-all",
                }}
              >
                {selectedTask.projectLink || "—"}
              </Typography>

              {/* ===== SEND REPLY ===== */}
              <Button
                variant="contained"
                endIcon={<Send />}
                onClick={handleReply}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Send Reply
              </Button>
            </Paper>
          ) : (
            <Typography color="text.secondary" textAlign="center" mt={20}>
              Select a task from the left to view details.
            </Typography>
          )}

          {/* ===== FLOATING ADD BUTTON ===== */}
        
<TaskWorkerReply/>
          {/* ===== FLOATING SPEEDDIAL ===== */}
          <Box
            sx={{
              position: "fixed",
              bottom: { xs: 10, sm: 20 },
              right: { xs: 10, sm: 20 },
            }}
          >
            <SpeedDial
              ariaLabel="Task Actions"
              icon={<SpeedDialIcon />}
              direction="up"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.onClick}
                />
              ))}
            </SpeedDial>
          </Box>
        </Box>
      </Box>
    </>
  );
} 