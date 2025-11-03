"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const TaskTable = () => {
  const data = {
    success: true,
    message: "Task details loaded successfully",
    data: {
      projectName: "test",
      client: "test",
      taskPRIORITY: "hot",
      taskStatusdata: "not started",
      requestDate: "2025-11-12T00:00:00",
      deliveryDate: "2025-11-12T00:00:00",
      requestType: "byh",
      projectLink: "ss",
      remarks: "ss",
      createdBy: "superadmin",
      createdDate: "2025-11-02T09:29:50.546",
      taskDetails: [
        {
          description: "tes",
          notes: "ssss",
          detailer: "dddddddddddddddwww",
          checker: "deva",
          pm: "gggg",
          priority: "hot",
          releasetype: "rav",
        },
      ],
    },
  };

  const task = data.data;

  return (
    <Box sx={{ p: 2 }}>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 2,
          overflowX: "auto", // 👈 Enables horizontal scroll
          whiteSpace: "nowrap", // 👈 Prevents text wrapping in cells
        }}
      >
        <Table sx={{ minWidth: 1400 }} size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                       <TableCell>sno</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Detailer</TableCell>
              <TableCell>Checker</TableCell>
              <TableCell>Production Manager</TableCell>
              <TableCell>Release Type</TableCell>
              <TableCell>Request Type</TableCell>
              <TableCell>Project Link</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Request Date</TableCell>
              <TableCell>Delivery Date</TableCell>
        
            </TableRow>
          </TableHead>

          <TableBody>
            {task.taskDetails.map((detail, index) => (
              <TableRow key={index} hover>
                   <TableCell>{index+1}</TableCell>
                <TableCell>{detail.description}</TableCell>
                <TableCell>{detail.notes}</TableCell>
                <TableCell>{task.client}</TableCell>
                <TableCell>{detail.detailer}</TableCell>
                <TableCell>{detail.checker}</TableCell>
                <TableCell>{detail.pm}</TableCell>
                <TableCell>{detail.releasetype}</TableCell>
                <TableCell>{task.requestType}</TableCell>
                <TableCell>{task.projectLink}</TableCell>
                <TableCell>{detail.priority}</TableCell>
                <TableCell>{task.taskStatusdata}</TableCell>
                <TableCell>{task.remarks}</TableCell>
                <TableCell>
                  {new Date(task.requestDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(task.deliveryDate).toLocaleDateString()}
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaskTable;
