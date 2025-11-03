import {
  Box,
  Typography,
Grid,
  Paper,
  TextField,
  Button,
  Divider,
} from "@mui/material";

const CheckerTaskForm = ({ onClickclose }) => {
  return (
  <Box>
      {/* Title */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{ color: "#1976d2", mb: 2 }}
      >
        Checker Task
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* First Row: Weight, Rev Hours, Change Order */}
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField fullWidth size="small" label="Weight (LBS)" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField fullWidth size="small" label="Revision Hours" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField fullWidth size="small" label="Change Order" />
        </Grid>
      </Grid>

      {/* Second Row: Project Folder + Delivery Date */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            size="small"
            label="Project Folder Link"
            placeholder="https://drive.google.com/folder/..."
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            size="small"
            label="Delivery Date"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {/* Third Row: Remarks */}
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Remarks"
          multiline
          rows={3}
        />
      </Box>

      {/* Action Buttons */}
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap={2}
        sx={{ mt: 3 }}
      >
        <Button variant="outlined" color="warning">
          Revise
        </Button>
        <Button variant="contained" color="success">
          Approve
        </Button>
        <Button variant="outlined" color="error" onClick={onClickclose}>
          Close
        </Button>
      </Box>
 </Box>
  );
};

export default CheckerTaskForm;
