import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  Card,
  Grid,
  CardContent
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCurrentClient, updateClient } from "../../../api/clientService";
import { registerClientData } from "../../../models/register-client-data";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [client, setClient] = useState<registerClientData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const currentClient = await getCurrentClient();
        setClient(currentClient);
      } catch (error) {
        console.error("Error fetching client:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!client) return;
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handlePasswordConfirm = async () => {
    if (!client || !user?.id || !password) return;

    setSaving(true);
    try {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, name: client.name })
      );
      await updateClient({ ...client, password });
      toast.success("Profile updated successfully");
      setPasswordDialogOpen(false);
      setPassword("");
      navigate("/client/home");
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = () => {
    if (!client || !user?.id) return;
    setPasswordDialogOpen(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!client) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Client information not available.</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} maxWidth={1000} mx="auto">
      <Typography variant="h4" gutterBottom textAlign="center">
        Client Settings
      </Typography>

      <Grid container spacing={3}>

        {/* Personal Info */}
        <Grid item xs={12} md={4} minWidth={1000}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <TextField
                label="Name"
                name="name"
                value={client.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={client.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Gender"
                name="gender"
                value={client.gender}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={client.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Info */}
        <Grid item xs={12} md={4} minWidth={1000}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Information
              </Typography>
              <TextField
                label="Card Name"
                name="cardName"
                value={client.cardName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Card Number"
                name="cardNumber"
                value={client.cardNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Expiry Date"
                name="expiryDate"
                placeholder="MM/YY"
                inputProps={{ maxLength: 5 }}
                fullWidth
                margin="normal"
                value={client.expiryDate}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
                  const formatted =
                    raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw;
                  setClient({ ...client, expiryDate: formatted });
                }}
              />
              <TextField
                label="CVV"
                name="cvv"
                type="password"
                value={client.cvv}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Health Info */}
        <Grid item xs={12} md={4} minWidth={1000}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Health Information
              </Typography>
              <TextField
                label="Height (cm)"
                name="height"
                value={client.height}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Weight (kg)"
                name="weight"
                value={client.weight}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Allergies"
                name="allergies"
                value={client.allergies}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>


      </Grid>

      {/* Save Button */}
      <Box mt={4}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{minWidth: 1000}}
          fullWidth
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>

      {/* Password Dialog */}
      <Dialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
      >
        <Box p={3} minWidth={300}>
          <Typography variant="h6" gutterBottom>
            Confirm Your Password
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
            <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handlePasswordConfirm}
              disabled={saving || !password}
            >
              {saving ? "Saving..." : "Confirm"}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Settings;
