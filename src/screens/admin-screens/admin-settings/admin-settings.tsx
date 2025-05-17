import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updateAdmin } from "../../../api/adminService";
import toast from "react-hot-toast";

const AdminSettings = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Show confirmation dialog before finalizing changes
    setShowConfirmDialog(true);
  };

  const finalizeSave = async () => {
    const updatedUser = { ...user, name };

    if (password) {
      console.log("Update password on server:", password);
    }

    const isUpdated = await updateAdmin(user.id, {
      name,
      newPassword: password,
      currentPassword,
    });

    if (isUpdated) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setConfirmPassword("");
      setPassword("");
      setName(user.name);
      toast.success("Profile updated successfully!", {
        position: "bottom-left",
      });
    } else {
      toast.error("Failed to update profile. Please try again.", {
        position: "bottom-left",
      });
    }
    // You would verify `currentPassword` with the server here
    setShowConfirmDialog(false);
    setCurrentPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Profile Settings
      </Typography>
      <Card sx={{ margin: "auto", p: 2, maxWidth: 700 }}>
        <CardContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm New Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={password !== confirmPassword && confirmPassword.length > 0}
            helperText={
              password !== confirmPassword && confirmPassword.length > 0
                ? "Passwords do not match"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Confirm Current Password Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            To save your changes, please enter your current password.
          </Typography>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
          <Button
            onClick={finalizeSave}
            variant="contained"
            disabled={!currentPassword}
          >
            Confirm & Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminSettings;
