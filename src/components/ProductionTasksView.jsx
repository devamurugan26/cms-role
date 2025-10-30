import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Avatar,
  Tooltip,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FolderOpen } from "@mui/icons-material";

const tasks = [
  {
    id: 1,
    projectName: "Website Redesign",
    client: "Acme Corp",
    requestDate: "21/09/2025",
    deliveryDate: "05/10/2025",
    requestType: "FOR APPROVAL",
    assignmentTask: "Revamp landing page",
    description: "Modern responsive redesign with Figma mockups.",
    detailer: "John Smith",
    checker: "Priya Sharma",
    pm: "Michael Lee",
    priority: "HOT",
    releaseRequest: "EMD / UPDATED DWGS / RFI / MAIL REQUEST",
    notes: "Wireframe approved",
    projectFolderLink: "#",
    remarks: "Deliver before launch event",
  },
];

export default function ProductionTaskAccordionTable() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getPriorityColor = (priority) => {
    if (priority === "HOT") return "error";
    if (priority === "ASAP") return "warning";
    return "success";
  };

  const renderAvatar = (name, color) => {
    if (!name) return null;
    return (
      <Tooltip title={name}>
        <Avatar
          sx={{ bgcolor: color, width: 32, height: 32, fontSize: 14 }}
        >
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </Avatar>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      {tasks.map((task) => (
        <Accordion
          key={task.id}
          expanded={expanded === task.id}
          onChange={handleChange(task.id)}
          sx={{
            mb: 2,
            borderRadius: 3,
            boxShadow: 2,
            "&:before": { display: "none" },
          }}
        >
          {/* Accordion Summary */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: "#f9f9f9",
              borderRadius: "12px 12px 0 0",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={12} md={3}>
                <Typography fontWeight="bold">{task.projectName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.client}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Chip
                  label={task.priority}
                  color={getPriorityColor(task.priority)}
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2">
                  Request: {task.requestDate}
                </Typography>
                <Typography variant="body2">
                  Delivery: {task.deliveryDate}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} textAlign="right">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Viewing task: ${task.projectName}`);
                  }}
                >
                  View
                </Button>
              </Grid>
            </Grid>
          </AccordionSummary>

          {/* Accordion Details */}
          <AccordionDetails sx={{ bgcolor: "#fff", borderRadius: "0 0 12px 12px" }}>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Request / Task
                </Typography>
                <Typography variant="body2">
                  Request Type: {task.requestType}
                </Typography>
                <Typography variant="body2">
                  Assignment: {task.assignmentTask}
                </Typography>
                <Typography variant="body2">
                  Description: {task.description}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Team
                </Typography>
                <Box display="flex" gap={1} mt={1}>
                  {renderAvatar(task.detailer, "primary.main")}
                  {renderAvatar(task.checker, "secondary.main")}
                  {renderAvatar(task.pm, "success.main")}
                </Box>
                <Typography variant="body2" mt={1}>
                  Release: {task.releaseRequest}
                </Typography>
                <Typography variant="body2">Notes: {task.notes}</Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Folder / Remarks
                </Typography>
                <Box display="flex" alignItems="center">
                  <FolderOpen sx={{ mr: 1 }} />
                  <Typography
                    component="a"
                    href={task.projectFolderLink}
                    target="_blank"
                    color="primary"
                    sx={{ textDecoration: "none" }}
                  >
                    Open Folder
                  </Typography>
                </Box>
                <Typography variant="body2" mt={1}>
                  Remarks: {task.remarks}
                </Typography>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="contained" color="secondary">
                Assign
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
