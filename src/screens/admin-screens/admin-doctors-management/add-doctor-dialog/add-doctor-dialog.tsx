import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MedicalSpecialty } from "../../../../enums/medical-specialty-enum";
import { ChangeEvent, useState } from "react";
import { addDoctor } from "../../../../api/adminService";
import { registerDoctorData } from "../../../../models/register-doctor-data";
import toast from "react-hot-toast";

// Define the Doctor type
interface IAddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDoctorDialog = ({ isOpen, onClose }: IAddDoctorDialogProps) => {
  const [formValues, setFormValues] = useState<Omit<registerDoctorData, "id">>({
    name: "",
    specialty: "",
    email: "",
    age: 30,
    gender: "Male",
    address: "",
    password: "",
  });

  const handleInputChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormValues((prev: Omit<registerDoctorData, "id">) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleModalSubmit = async () => {
    const isSuccess = await addDoctor(formValues);
    if(isSuccess)
        onClose()
    else
        toast.error("Somethig wont wrong")
};

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          width: 550,
          maxHeight: "90vh", // limits modal height to 90% of viewport
          overflowY: "auto", // enables scrolling if content overflows
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {"Add Doctor"}
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel>specialty</InputLabel>
            <Select
              name="specialty"
              value={formValues.specialty}
              label="specialty"
              onChange={handleInputChange} // Use the same handleInputChange for consistency
            >
              {Object.values(MedicalSpecialty).map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  {specialty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formValues.age}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <FormControl component="fieldset">
            <Typography variant="body1">Gender</Typography>
            <RadioGroup
              row
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label="Address"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <Button variant="contained" onClick={handleModalSubmit}>
            {"Add"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddDoctorDialog;
