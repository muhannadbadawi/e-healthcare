import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { MedicalSpecialty } from "../../../../enums/medical-specialty-enum";
import { ChangeEvent, useState } from "react";
import { registerDoctorData } from "../../../../models/register-doctor-data";
import MyButton from "../../../../components/my-button";
import { Doctor } from "../../../../models/doctor";

interface IViewDoctorDialogProps {
  isOpen: boolean;
  onClose: (fromSubmit?: boolean) => void;
  editingDoctor: Doctor;
}

const ViewDoctorDialog = ({
  isOpen,
  onClose,
  editingDoctor,
}: IViewDoctorDialogProps) => {
  const [formValues, setFormValues] = useState<Omit<registerDoctorData, "id">>({
    name: editingDoctor.name,
    specialty: editingDoctor.specialty,
    email: editingDoctor.email,
    age: editingDoctor.age,
    gender: editingDoctor.gender,
    address: editingDoctor.address,
    password: "",
  });

  const handleInputChange = (
    e:
      | ChangeEvent<
          | HTMLInputElement
          | HTMLTextAreaElement
          | { name?: string; value: unknown }
        >
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose(false)}
      maxWidth="sm"
      fullWidth
      scroll="body"
      TransitionProps={{
        onEntering: (node: HTMLElement) => {
          node.style.transform = "scale(0.95)";
          setTimeout(() => {
            node.style.transform = "scale(1)";
            node.style.transition = "transform 300ms ease-in-out";
          }, 10);
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: "1.6rem",
          background: "linear-gradient(135deg, #3f51b5, #9c27b0)",
          color: "#fff",
          py: 2,
        }}
      >
        {`Dr. ${editingDoctor.name} `}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          px: 0,
          py: 0,
          background: "linear-gradient(135deg, #f3e5f5, #e8eaf6)",
          borderColor: "#d1c4e9",
        }}
      >
        <Box sx={{ px: 4, py: 3 }}>
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
              disabled={true}
            />
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Specialty</InputLabel>
                <Select
                  name="specialty"
                  value={formValues.specialty}
                  label="Specialty"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  disabled={true}
                >
                  {Object.values(MedicalSpecialty).map((specialty) => (
                    <MenuItem key={specialty} value={specialty}>
                      {specialty}
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
                disabled={true}
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
                disabled={true}
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
                    disabled={true}
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                    disabled={true}
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3, pt: 2, background: "#f3e5f5" }}>
        <MyButton
          onClick={() => {
            onClose(false);
          }}
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          Cancel
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDoctorDialog;
