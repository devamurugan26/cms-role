"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider,
  Chip,
  Link,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

// ✅ Example data (your provided JSON)
const base = [
  {
    maintaskid: "main-001",
    title: "Website Redesign Project",
    createdat: "2025-11-02T10:00:00Z",
    status: "Active",
    createdby: "Devakumar",
    createdrole: "Project Manager",
    department: "Design",
    priority: "High",
    taskstatus: "In Progress",
    productiontask: [
      {
        productiontaskid: "child-001",
        projectName: "Landing Page Revamp",
        client: "ABC Corp",
        taskPriority: "High",
        taskStatus: "In Progress",
        requestDate: "2025-11-01",
        deliveryDate: "2025-11-07",
        requestType: "UI Update",
        projectLink: "https://example.com/landing",
        remarks: "Modernize look and feel",
        createdBy: "John",
        createdDate: "2025-11-01T12:30:00Z",
        taskDetails: [
          {
            description: "Redesign the landing banner",
            notes: "Use new brand color palette",
            detailer: "Sarah",
            checker: "Mike",
            pm: "Devakumar",
            priority: "High",
            releaseType: "Final",
            replies: [
              {
                id: "rep-001",
                author: "Sarah",
                date: "2025-11-02T13:00:00Z",
                message: "Request: need final logo and weight of header image",
              },
              {
                id: "rep-002",
                author: "Mike",
                date: "2025-11-02T14:00:00Z",
                message: "Approved with minor change: reduce banner height",
              },
            ],
          },
        ],
      },
      {
        productiontaskid: "child-002",
        projectName: "Dashboard UI Creation",
        client: "ABC Corp",
        taskPriority: "Medium",
        taskStatus: "In Progress",
        requestDate: "2025-11-01",
        deliveryDate: "2025-11-10",
        requestType: "New Page",
        projectLink: "https://example.com/dashboard",
        remarks: "Add analytics section",
        createdBy: "Liam",
        createdDate: "2025-11-01T14:00:00Z",
        taskDetails: [
          {
            description: "Create dashboard layout",
            notes: "Include graphs and summary cards",
            detailer: "Ava",
            checker: "Noah",
            pm: "Devakumar",
            priority: "Medium",
            releaseType: "Beta",
            replies: [
              {
                id: "rep-003",
                author: "Ava",
                date: "2025-11-02T15:00:00Z",
                message:
                  "Request: need mockup confirmation for analytics chart",
              },
              {
                id: "rep-004",
                author: "Noah",
                date: "2025-11-02T16:00:00Z",
                message: "Mockup approved; proceed with chart integration",
              },
            ],
          },
        ],
      },
      {
        productiontaskid: "child-003",
        projectName: "Mobile Optimization",
        client: "ABC Corp",
        taskPriority: "High",
        taskStatus: "Pending Review",
        requestDate: "2025-11-02",
        deliveryDate: "2025-11-05",
        requestType: "Responsive Design",
        projectLink: "https://example.com/mobile",
        remarks: "Ensure full mobile responsiveness",
        createdBy: "Ethan",
        createdDate: "2025-11-02T10:30:00Z",
        taskDetails: [
          {
            description: "Fix mobile layout issues",
            notes: "Adjust margins and font scaling",
            detailer: "Olivia",
            checker: "Sophia",
            pm: "Devakumar",
            priority: "High",
            releaseType: "Final",
            replies: [
              {
                id: "rep-005",
                author: "Olivia",
                date: "2025-11-02T11:00:00Z",
                message: "Weight check: page load 2.5 MB — need optimization",
              },
              {
                id: "rep-006",
                author: "Sophia",
                date: "2025-11-02T11:30:00Z",
                message:
                  "Confirmed; optimize images to reduce weight below 1.5 MB",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function TaskAccordionView() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (_, isExpanded) =>
    setExpanded(isExpanded ? panel : null);

  return (
    <Box sx={{ p: 3 }}>
      {base.map((main) => (
        <Paper
          key={main.maintaskid}
          elevation={3}
          sx={{ p: 3, mb: 4, borderRadius: 3 }}
        >
          <Typography variant="h5" fontWeight={700} mb={1}>
            {main.title}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Department: {main.department} | Created By: {main.createdby} (
              {main.createdrole})
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} mx={2}>
              Priority: {main.priority} | Status: {main.taskstatus}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {main.productiontask.map((prod, index) => (
            <Accordion
              key={prod.productiontaskid}
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{ mb: 1, borderRadius: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  background: "#f9f9f9",
                  borderRadius: 2,
                  "&:hover": { background: "#f1f1f1" },
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {prod.projectName}
                  </Typography>
                  <Box sx={{display:'flex'}}>

                  <Typography variant="body2" color="text.secondary">
                    Client: {prod.client} | Type: {prod.requestType}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                    mx={2}
                  >
                    Priority: {main.priority} | Status: {main.taskstatus}
                  </Typography>
                  </Box>

                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<PriorityHighIcon />}
                    label={`Priority: ${prod.taskPriority}`}
                    color={
                      prod.taskPriority === "High"
                        ? "error"
                        : prod.taskPriority === "Medium"
                        ? "warning"
                        : "default"
                    }
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<AssignmentIcon />}
                    label={`Status: ${prod.taskStatus}`}
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                 
                </Box>

                <Typography variant="body2" mb={1}>
                  Request Date: {prod.requestDate}
                </Typography>
                <Typography variant="body2" mb={1}>
                  Remarks: {prod.remarks}
                </Typography>
                <Typography variant="body2" mb={1}>
                  Project Link:{" "}
                  <Link href={prod.projectLink} target="_blank">
                    {prod.projectLink}
                  </Link>
                </Typography>
                <Typography variant="body2" mb={2}>
                  Created By: {prod.createdBy} on{" "}
                  {new Date(prod.createdDate).toLocaleString()}
                </Typography>

                {prod.taskDetails.map((detail, dIdx) => (
                  <Box
                    key={dIdx}
                    sx={{
                      background: "#fafafa",
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography fontWeight={600}>
                      Detail: {detail.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Notes: {detail.notes}
                    </Typography>
                    <Typography variant="body2">
                      Detailer: {detail.detailer} | Checker: {detail.checker} |
                      PM: {detail.pm}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      Priority: {detail.priority} | Release Type:{" "}
                      {detail.releaseType}
                    </Typography>

                    <Divider sx={{ my: 1 }} />
                    <Typography fontWeight={500} mb={1}>
                      Replies:
                    </Typography>
                    {detail.replies.map((rep) => (
                      <Box
                        key={rep.id}
                        sx={{
                          mb: 1,
                          pl: 2,
                          borderLeft: "3px solid #1976d2",
                          background: "#f5f9ff",
                          borderRadius: 1,
                        }}
                      >
                        <Typography fontWeight={600}>{rep.author}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(rep.date).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {rep.message}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      ))}
    </Box>
  );
}
