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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../Config/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [departmentRoles, setDepartmentRoles] = useState([]); // array of departments with roles
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "",
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
      if (!token) return console.error("No token found");

      const res = await axios.get(`${API_URL}/Users/RolesLoad`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setDepartmentRoles(res.data.data || []);
      } else {
        console.error("Failed to load roles:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const UserRoleListLoad = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      const res = await axios.get(`${API_URL}/Users/UserRoleListLoad`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setUsers(res.data.data || []);
      } else {
        console.error("Failed to load roles:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching roles:", err);
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
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    debugger
    if (!form.name || !form.department_Id || !form.role_Id || !form.email) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

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
      console.error("Error saving role:", err);
    }
  };

  const handleDelete = async (userId) => {
    debugger
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      const res = await axios.post(
        `${API_URL}/Users/DeleteUserRole`,
        { User_Id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        await UserRoleListLoad();
      } else {
        alert(res.data.message || "Failed to delete user!");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const getRolesForDepartment = (department_Id) => {
    const dep = departmentRoles.find((d) => d.department_Id === department_Id);
    return dep ? dep.roles : [];
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, fontFamily: "Roboto, sans-serif" }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        User Management
      </Typography>

      {/* Filters & Add Button */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={3}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <TextField
          select
          label="Filter by Department"
          value={filterDept}
          onChange={(e) => {
            setFilterDept(e.target.value);
            setFilterRole("");
          }}
          sx={{ minWidth: 220 }}
          size="small"
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
          sx={{ minWidth: 220 }}
          size="small"
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

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          sx={{ height: 40 }}
        >
          Add User
        </Button>
      </Stack>

      {/* User Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {["S.No", "Name", "Department", "Role", "Email", "Actions"].map(
                (header) => (
                  <TableCell key={header} sx={{ fontWeight: 600 }}>
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => {
                return (
                  <TableRow key={index} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name ?? "N/A"}</TableCell>
                    <TableCell>{user.department ?? "N/A"}</TableCell>
                    <TableCell>{user.role ?? "N/A"}</TableCell>
                    <TableCell>{user.email ?? "N/A"}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpen(user, index)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(user.user_Id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editingIndex !== null ? "Edit User" : "Add User"}
        </DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              fullWidth
              size="small"
            />

            {/* Show password only on add */}
            {editingIndex === null && (
              <TextField
                label="Password"
                type="password"
                value={form.Password}
                onChange={(e) => setForm({ ...form, Password: e.target.value })}
                fullWidth
                size="small"
              />
            )}

            {/* Department dropdown */}
            <TextField
              select
              label="Department"
              value={form.department_Id || ""}
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

            {/* Role dropdown (depends on department) */}
            {form.department_Id && (
              <TextField
                select
                label="Role"
                value={form.role_Id || ""}
                onChange={(e) => setForm({ ...form, role_Id: e.target.value })}
                fullWidth
                size="small"
              >
                {getRolesForDepartment(form.department_Id).map((role) => (
                  <MenuItem key={role.role_Id} value={role.role_Id}>
                    {role.role_Name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
