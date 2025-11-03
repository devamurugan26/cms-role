import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Divider,
  Collapse,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, PersonAdd, Lock, ExpandLess, ExpandMore } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../Config/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [departmentRoles, setDepartmentRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    department_Id: "",
    role_Id: "",
    email: "",
    Password: "",
  });
  const [filterDept, setFilterDept] = useState("");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    UserRoleListLoad();
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${API_URL}/Users/RolesLoad`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setDepartmentRoles(res.data.data || []);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const UserRoleListLoad = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${API_URL}/Users/UserRoleListLoad`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setUsers(res.data.data || []);
    } catch (err) {
      console.error("Error loading user list:", err);
    }
  };

  const handleOpen = (user = null, index = null) => {
    if (user) {
      const departmentObj = departmentRoles.find(
        (d) => d.department_Name === user.department
      );
      const roleObj = departmentObj
        ? departmentObj.roles.find((r) => r.role_Name === user.role)
        : null;

      setForm({
        user_Id: user.user_Id,
        name: user.name || "",
        email: user.email || "",
        Password: "",
        department_Id: departmentObj ? departmentObj.department_Id : "",
        role_Id: roleObj ? roleObj.role_Id : "",
      });
      setEditingIndex(index);
    } else {
      setForm({
        name: "",
        email: "",
        Password: "",
        department_Id: "",
        role_Id: "",
      });
      setEditingIndex(null);
    }
    setShowPassword(false);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    if (!form.name || !form.department_Id || !form.role_Id || !form.email) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const param = {
        User_Id: form.user_Id || null,
        Name: form.name,
        Email: form.email,
        Password: form.Password,
        Role_Id: form.role_Id,
        Department_Id: form.department_Id,
      };

      const endpoint =
        editingIndex !== null
          ? `${API_URL}/Users/EditUserRole`
          : `${API_URL}/Users/SaveRole`;

      const res = await axios.post(endpoint, param, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        await UserRoleListLoad();
        setOpen(false);
      } else {
        alert(res.data.message || "Failed to save user!");
      }
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        `${API_URL}/Users/DeleteUserRole`,
        { User_Id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) await UserRoleListLoad();
      else alert(res.data.message || "Failed to delete user!");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const getRolesForDepartment = (department_Id) => {
    const dep = departmentRoles.find((d) => d.department_Id === department_Id);
    return dep ? dep.roles : [];
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          👥 User Management
        </Typography>
        <Button
          startIcon={<PersonAdd />}
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Add User
        </Button>
      </Stack>

      {/* Filter Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <TextField
          select
          label="Filter by Department"
          value={filterDept}
          onChange={(e) => {
            setFilterDept(e.target.value);
            setFilterRole("");
          }}
          size="small"
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="">All</MenuItem>
          {departmentRoles.map((dep) => (
            <MenuItem key={dep.department_Id} value={dep.department_Id}>
              {dep.department_Name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          size="small"
          sx={{ minWidth: 220 }}
          disabled={!filterDept}
        >
          <MenuItem value="">All</MenuItem>
          {filterDept &&
            getRolesForDepartment(filterDept).map((role) => (
              <MenuItem key={role.role_Id} value={role.role_Id}>
                {role.role_Name}
              </MenuItem>
            ))}
        </TextField>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
              {["#", "Name", "Department", "Role", "Email", "Actions"].map((header) => (
                <TableCell key={header} sx={{ fontWeight: 600 }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleOpen(user, index)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(user.user_Id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editingIndex !== null ? "Edit User" : "Add New User"}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Basic Information
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
              size="small"
            />
            <TextField
              label="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              fullWidth
              size="small"
            />
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Access Settings
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              select
              label="Department"
              value={form.department_Id}
              onChange={(e) =>
                setForm({ ...form, department_Id: e.target.value, role_Id: "" })
              }
              fullWidth
              size="small"
            >
              {departmentRoles.map((dep) => (
                <MenuItem key={dep.department_Id} value={dep.department_Id}>
                  {dep.department_Name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Role"
              value={form.role_Id}
              onChange={(e) => setForm({ ...form, role_Id: e.target.value })}
              fullWidth
              size="small"
              disabled={!form.department_Id}
            >
              {getRolesForDepartment(form.department_Id).map((role) => (
                <MenuItem key={role.role_Id} value={role.role_Id}>
                  {role.role_Name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Box mt={2}>
            {editingIndex === null ? (
              <TextField
                label="Password"
                type="password"
                value={form.Password}
                onChange={(e) => setForm({ ...form, Password: e.target.value })}
                fullWidth
                size="small"
              />
            ) : (
              <>
                <Button
                  startIcon={<Lock />}
                  color="secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  Change Password {showPassword ? <ExpandLess /> : <ExpandMore />}
                </Button>
                <Collapse in={showPassword}>
                  <TextField
                    label="New Password"
                    type="password"
                    value={form.Password}
                    onChange={(e) => setForm({ ...form, Password: e.target.value })}
                    fullWidth
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Collapse>
              </>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingIndex !== null ? "Update" : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
