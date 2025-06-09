import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getSessionPrice, saveSessionPrice } from "../../../api/doctorService";

const DoctorSettings = () => {
  const [sessionPrice, setSessionPrice] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchSessionPrice = async () => {
    setLoading(true);
    try {
      const price = await getSessionPrice();
      setSessionPrice(price || "");
    } catch {
      setErrorMsg("Failed to load session price.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      await saveSessionPrice(Number(sessionPrice));
      setSuccessMsg("Session price updated successfully.");
    } catch {
      setErrorMsg("Failed to update session price.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionPrice();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Doctor Settings
      </Typography>

      {loading && <CircularProgress size={24} />}

      {successMsg && <Alert severity="success">{successMsg}</Alert>}
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Box mt={2}>
        <TextField
          label="Session Price ($)"
          type="number"
          fullWidth
          value={sessionPrice}
          onChange={(e) => setSessionPrice(Number(e.target.value))}
          inputProps={{ min: 1 }}
        />
      </Box>

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading || sessionPrice === ""}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default DoctorSettings;
