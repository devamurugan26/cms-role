"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  Avatar,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Reply as ReplyIcon,
  Visibility as VisibilityIcon,
  SegmentSharp,
} from "@mui/icons-material";
import CreateProductionTaskPopup from "./CreateProductionTaskPopup";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../Config/api";
import { red } from "@mui/material/colors";
import Productiontaskviewpopups from "./Productiontaskviewpopups";
import { Close, AssignmentTurnedIn } from "@mui/icons-material";
import DetailTaskForm from "./DetailTaskForm";
import CheckerTaskForm from "./CheckerTaskForm";
import TaskTableviewproduction from "./TaskTableviewproduction";
import TaskAccordionView from "./TaskAccordionView";
export default function TaskManagerCMS() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openTask, setOpenTask] = useState(null);
  const [openReply, setOpenReply] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectmaintaskid, setselectmaintaskid] = useState("");
  const [replyText, setReplyText] = useState("");
  const token = localStorage.getItem("token");
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [openNewTask, setOpenNewTask] = useState(false);

  useEffect(() => {
    mytaskmainLoad();
  }, []);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [taskpopuptype, settaskpopuptype] = useState(0);
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReplyClick = (task) => {
    setSelectedTask(task);
    setOpenReply(true);
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    const updated = tasks.map((t) =>
      t.id === selectedTask.id
        ? {
            ...t,
            replies: [
              ...t.replies,
              {
                id: Date.now(),
                message: replyText,
                author: "You",
                date: new Date().toLocaleDateString(),
              },
            ],
          }
        : t
    );
    setTasks(updated);
    setReplyText("");
    setOpenReply(false);
  };

  const handleViewTask = (task) => {
    //  setSelectedTask(task);
    setselectmaintaskid(task);
    setOpenView(true);
  };

  const handleclicknewtask = () => setOpenNewTask(true);
  const handleCloseNewTask = () => {
    setOpenNewTask(false);
    setTaskType("");
    setDepartment("");
    setSubDepartment("");
    setDescription("");
  };

  const handleSubmitNewTask = () => {
    if (taskType == "Department") {
      if (department === "Production") {
        settaskpopuptype(1);
      }
    }
    handleCloseNewTask();
  };

  const departments = ["Production", "HR", "Finance", "Sales"];
  const statusColor = {
    "not started": "default",
    "In Progress": "warning",
    Completed: "success",
    "On Hold": "secondary",
  };

  const [taskType, setTaskType] = useState("");
  const [relyTaskType, setrelyTaskType] = useState(false);
  const [department, setDepartment] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [taskrepltselectType, settaskrepltselectType] = useState("");
  const [title, setDescription] = useState("");
  const[selectidexpand,Setselectidexpand]=useState("")
  const priorityColor = {
    hot: "error",
    Medium: "warning",
    Low: "success",
  };

  const mytaskmainLoad = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/Task/mytaskmainLoad`,
        {}, // no body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success && res.data.data) {
        const data = res.data.data.map((t) => ({
          id: t.maintaskid,
          title: t.title,
          priority: t.priority,
          createdAt: t.createdat,
          createdBy: t.createdby,
          createdRole: t.createdrole,
          department: t.department,
          taskStatus: t.taskstatus,
          status: t.status,
        }));

        setTasks(data);
      } else {
        console.error("Failed to load master task data:", res.data.message);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };
 const mytaskmainsubtaskLoad = async () => {
    try {
      const param={
        mytaskmainsubtaskLoad:selectidexpand
      }
      const res = await axios.post(
        `${API_URL}/Task/mytaskmainsubtaskLoad`,
        param, // no body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success && res.data.data) {
      

      } else {
        console.error("Failed to load master task data:", res.data.message);
      }
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };
  const handlerelyClose = () => {
    setOpenReply(false);
  };

  const handlerelydetailcheckerClose = () => {
    setrelyTaskType(false);

    settaskrepltselectType("");
  };
  return (
    <Box sx={{ p: 3, minHeight: "79vh" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          My Tasks
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: "none", borderRadius: 2 }}
            onClick={handleclicknewtask}
          >
            New Task
          </Button>
        </Box>
      </Box>
      <Divider sx={{ fontWeight: "bold" }} />
      {/* Table */}
      <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ tableLayout: "fixed", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{ width: "3%", fontWeight: "bold" }}>
                  S.No
                </TableCell>
                <TableCell sx={{ width: "14%", fontWeight: "bold" }}>
                  Title
                </TableCell>{" "}
                {/* 👈 Expands */}
                <TableCell sx={{ width: "4%", fontWeight: "bold" }}>
                  Priority
                </TableCell>
                <TableCell sx={{ width: "13%", fontWeight: "bold" }}>
                  Created Time
                </TableCell>
                <TableCell sx={{ width: "7%", fontWeight: "bold" }}>
                  Created By
                </TableCell>
                <TableCell sx={{ width: "8%", fontWeight: "bold" }}>
                  Role
                </TableCell>
                <TableCell sx={{ width: "8%", fontWeight: "bold" }}>
                  Department
                </TableCell>
                <TableCell sx={{ width: "7%", fontWeight: "bold" }}>
                  {" "}
                  Status
                </TableCell>
                <TableCell
                  sx={{ width: "9%", fontWeight: "bold" }}
                  align="right"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredTasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task, index) => (
                  <React.Fragment key={task.id}>
                    <TableRow hover>
                      {/* ✅ Checkbox */}
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setOpenTask(openTask === task.id ? null : task.id);
                            Setselectidexpand(task.id);
                          }}
                        >
                          {openTask === task.id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell padding="checkbox">
                        {/* <Checkbox /> */}
                        {index + 1}
                      </TableCell>

                      {/* ✅ Expand/Collapse Icon */}

                      {/* ✅ Task Details */}
                      <TableCell>
                        <Typography>{task.title}</Typography>
                      </TableCell>

                      {/* ✅ Priority with color */}
                      <TableCell>
                        <Chip
                          label={task.priority || "N/A"}
                          color={priorityColor[task.priority] || "default"}
                          size="small"
                        />
                      </TableCell>

                      {/* ✅ Created Time */}
                      <TableCell>
                        {task.createdAt
                          ? new Date(task.createdAt).toLocaleString()
                          : "—"}
                      </TableCell>

                      {/* ✅ Created By */}
                      <TableCell>{task.createdBy || "—"}</TableCell>

                      {/* ✅ Role */}
                      <TableCell>{task.createdRole || "—"}</TableCell>

                      {/* ✅ Department */}
                      <TableCell>{task.department || "—"}</TableCell>

                      {/* ✅ Task Status */}
                      <TableCell>
                        <Chip
                          label={task.taskStatus || "not started"}
                          color={
                            task.taskStatus === "Completed"
                              ? "success"
                              : task.taskStatus === "In Progress"
                              ? "warning"
                              : "default"
                          }
                          size="small"
                        />
                      </TableCell>

                      {/* ✅ Actions */}
                      <TableCell align="right">
                        <IconButton onClick={() => handleViewTask(task.id)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleReplyClick(task)}>
                          <ReplyIcon />
                        </IconButton>
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* ✅ Replies Collapse Section */}
                    <TableRow
                      hover
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                        "&:hover": { backgroundColor: "#f0f7ff" },
                      }}
                    >
                      <TableCell colSpan={10} sx={{ p: 0 }}>
                        <Collapse
                          in={openTask === task.id}
                          timeout="auto"
                          unmountOnExit
                        >
                        {/* <TaskTableviewproduction/> */}
                        <TaskAccordionView/>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredTasks.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>

      {/* View Dialog (Parent + Child) */}
      <Dialog
        open={openView}
        onClose={() => setOpenView(false)}
        maxWidth="lg"
        fullWidth
      >
        <Productiontaskviewpopups selectmaintaskid={selectmaintaskid} />
      </Dialog>

      {/* Reply Dialog */}
      <Dialog
        open={openReply}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, p: 1.5 } }}
      >
        {/* ==== Header ==== */}
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <AssignmentTurnedIn color="primary" />
            Reply to Task
          </Box>
        </DialogTitle>

        {/* ==== Select Task Type ==== */}
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="task-type-label">Select Task Type</InputLabel>
            <Select
              labelId="task-type-label"
              label="Select Task Type"
              value={taskrepltselectType}
              onChange={(e) => settaskrepltselectType(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="detail">Details Task</MenuItem>
              <MenuItem value="checker">Checker Task</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        {/* ==== Footer ==== */}
        <DialogActions>
          <Button onClick={handlerelyClose} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => setrelyTaskType(true)}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* New Task Popup */}
      <Dialog
        open={openNewTask}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            paddingX: 2,
            paddingY: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          Create New Task
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            mt: 1,
          }}
        >
          {/* Task Type */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="task-type-label">Select Task Type</InputLabel>
            <Select
              labelId="task-type-label"
              label="Select Task Type"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Department">Department Task</MenuItem>
              <MenuItem value="Other">Other Department</MenuItem>
            </Select>
          </FormControl>

          {/* Department Dropdown */}
          {taskType && (
            <FormControl fullWidth>
              <InputLabel id="department-label">Select Department</InputLabel>
              <Select
                labelId="department-label"
                label="Select Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {departments.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Sub-Department Dropdown */}
          {/* {department && (
            <FormControl fullWidth>
              <InputLabel id="sub-department-label">
                Select Sub-Department
              </InputLabel>
              <Select
                labelId="sub-department-label"
                label="Select Sub-Department"
                value={subDepartment}
                onChange={(e) => setSubDepartment(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {subDepartments[department]?.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )} */}

          {/* title */}
          {/* <TextField
            label="Task title"
            placeholder="Describe the task..."
            multiline
            minRows={3}
            fullWidth
            value={title}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
        </DialogContent>

        <DialogActions sx={{ pr: 2, pb: 2 }}>
          <Button onClick={handleCloseNewTask}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitNewTask}>
            select Task
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={relyTaskType}
        fullWidth
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            paddingX: 2,
            paddingY: 1,
          },
        }}
      >
        {taskrepltselectType === "detail" && (
          <DetailTaskForm onClickclose={handlerelydetailcheckerClose} />
        )}
        {taskrepltselectType === "checker" && (
          <CheckerTaskForm onClickclose={handlerelydetailcheckerClose} />
        )}
      </Dialog>
      {taskpopuptype === 1 && (
        <CreateProductionTaskPopup
          open={true}
          onClose={() => settaskpopuptype(0)}
        />
      )}

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Filter view</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add view</MenuItem>
        <MenuItem onClick={handleMenuClose}>Reports</MenuItem>
      </Menu>
    </Box>
  );
}
