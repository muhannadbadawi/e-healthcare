import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { getDoctorInfo, saveSessionPrice } from "../../../api/doctorService";
import { MedicalSpecialty } from "../../../enums/medical-specialty-enum";

const DoctorSettings = () => {
  const [sessionPrice, setSessionPrice] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    specialty: "",
    address: "",
    age: "",
    gender: "",
  });

  const fetchSessionPrice = async () => {
    setLoading(true);
    try {
      const currentDoctor = await getDoctorInfo();
      setSessionPrice(currentDoctor.sessionPrice || "");
      setFormValues({
        email: currentDoctor.email,
        name: currentDoctor.name,
        specialty: currentDoctor.specialty,
        address: currentDoctor.address,
        age: currentDoctor.age,
        gender: currentDoctor.gender,
      });
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
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name!]: value,
    }));
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
        <Stack spacing={3}>
          <TextField
            size="small"
            label="Email Address"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
            fullWidth
            required
            disabled={true}
          />
          <TextField
            size="small"
            label="Full Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Specialty</InputLabel>
              <Select
                name="specialty"
                value={formValues.specialty}
                label="Specialty"
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleInputChange({
                    target: { name, value },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
              >
                {Object.values(MedicalSpecialty).map((specialty) => (
                  <MenuItem key={String(specialty)} value={String(specialty)}>
                    {String(specialty)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              label="Address"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formValues.age}
              onChange={handleInputChange}
              fullWidth
              inputProps={{ min: 20, max: 80 }}
            />

            <FormControl fullWidth>
              <Typography variant="subtitle2">Gender</Typography>
              <RadioGroup
                row
                name="gender"
                value={formValues.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Stack>
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
