import React from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Avatar,
  Chip,
  Card,
  CardContent,
  CardHeader,
  Dialog,
} from "@mui/material";
import { Assignment, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductionTasksView from "./ProductionTasksView";

export default function Memebertaskprofile() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState(0); // 0: Created, 1: Assigned
  const [filterTab, setFilterTab] = React.useState(0); // 0: Today, 1: Week, 2: Month

  const handleTabChange = (event, newValue) => setTab(newValue);
  const handleFilterChange = (event, newValue) => setFilterTab(newValue);

  const member = {
    name: "John Doe",
    role: "Developer",
    createdBy: "Admin",
  };
const [openDialog, setOpenDialog] = React.useState(false);
const [selectedTask, setSelectedTask] = React.useState(null);

const handleproductiontaskview = (task) => {
  setSelectedTask(task);
  setOpenDialog(true);
};

  // Demo tasks
  const tasks = {
    created: {
      today: [
        { title: "Create UI Component", assignedBy: "Admin" },
        { title: "Write Docs", assignedBy: "Admin" },
      ],
      week: [
        { title: "Setup Backend API", assignedBy: "Manager 1" },
        { title: "Design DB Schema", assignedBy: "Manager 2" },
      ],
      month: [
        { title: "Deploy to Server", assignedBy: "Admin" },
        { title: "Optimize Queries", assignedBy: "Manager 1" },
      ],
    },
    assigned: {
      today: [
        { title: "Fix Bug #23", assignedBy: "Manager 1" },
        { title: "Code Review", assignedBy: "Admin" },
      ],
      week: [
        { title: "Implement Feature X", assignedBy: "Manager 2" },
        { title: "Update Docs", assignedBy: "Admin" },
      ],
      month: [
        { title: "Refactor Module", assignedBy: "Manager 1" },
        { title: "Performance Test", assignedBy: "Admin" },
      ],
    },
  };

  const currentTasks =
    tab === 0
      ? tasks.created[filterTab === 0 ? "today" : filterTab === 1 ? "week" : "month"]
      : tasks.assigned[filterTab === 0 ? "today" : filterTab === 1 ? "week" : "month"];



  return (
    <>
    <Box sx={{ m: 4 }}>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "#1976d2", width: 60, height: 60 }}>
            {member.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5">{member.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Role: {member.role} | Created By: {member.createdBy}
            </Typography>
          </Box>
        </Box>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Paper>

      {/* Main Tabs */}
      <Paper sx={{ mb: 2, borderRadius: 3 }} elevation={2}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Created" icon={<Assignment />} iconPosition="start" />
          <Tab label="Assigned" icon={<Person />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Filter Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 3 }} elevation={2}>
        <Tabs
          value={filterTab}
          onChange={handleFilterChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Today" />
          <Tab label="This Week" />
          <Tab label="This Month" />
        </Tabs>
      </Paper>

      {/* Task List */}
      {currentTasks.length > 0 ? (
        <Box display="grid" gap={2}>
          {currentTasks.map((task, idx) => (
            <Card key={idx} elevation={3} sx={{ borderRadius: 3 }} >
              <CardHeader
             onClick={handleproductiontaskview}
                avatar={
                  <Avatar sx={{ bgcolor: tab === 0 ? "primary.main" : "secondary.main" }}>
                    {tab === 0 ? <Assignment /> : <Person />}
                  </Avatar>
                }
                title={<Typography variant="h6">{task.title}</Typography>}
                subheader={`Assigned by: ${task.assignedBy}`}
                action={
                  <Chip
                    label={tab === 0 ? "Created" : "Assigned"}
                    color={tab === 0 ? "primary" : "secondary"}
                    variant="outlined"
                  />
                }
              />
            </Card>
          ))}
        </Box>
      ) : (
        <Paper
          elevation={2}
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "#fafafa",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            🚀 No tasks found for this period.
          </Typography>
        </Paper>
      )}
    </Box>

  <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
  {selectedTask && <ProductionTasksView task={selectedTask} />}
</Dialog>


    </>
  );
}
