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
import { addDoctor, updateDoctor } from "../../../../api/adminService";
import { registerDoctorData } from "../../../../models/register-doctor-data";
import toast from "react-hot-toast";
import MyButton from "../../../../components/my-button";
import { Doctor } from "../admin-client-management";
import { useEffect } from "react";

interface IAddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingDoctor: Doctor | null;
}

const AddDoctorDialog = ({
  isOpen,
  onClose,
  editingDoctor = null,
}: IAddDoctorDialogProps) => {
  // loading
  const submitText = editingDoctor ? "Edit Doctor" : "Add Doctor";
  const dialogTitle = editingDoctor
    ? `Edit ${editingDoctor.name} Doctor`
    : "Add a New Doctor";
  const [formValues, setFormValues] = useState<Omit<registerDoctorData, "id">>({
    name: editingDoctor ? editingDoctor.name : "",
    specialty: editingDoctor ? editingDoctor.specialty : "",
    email: editingDoctor ? editingDoctor.email : "",
    age: editingDoctor ? editingDoctor.age : 30,
    gender: editingDoctor ? editingDoctor.gender : "Male",
    address: editingDoctor ? editingDoctor.address : "",
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

  const handleModalSubmit = async () => {
    if (formValues.name && formValues.email && (formValues.password || editingDoctor)) {
      if (editingDoctor) {
        const isSuccess = await updateDoctor(editingDoctor._id, formValues);
        console.log("isSuccess: ", isSuccess);
        if (isSuccess) {
          toast.success("Doctor updated successfully!");
          onClose();
        } else {
          toast.error("Failed to update doctor.");
        }
      } else {
        const isSuccess = await addDoctor(formValues);
        if (isSuccess) {
          toast.success("Doctor added successfully!");
          onClose();
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };
  


useEffect(() => {
  if (editingDoctor) {
    setFormValues({
      name: editingDoctor.name,
      specialty: editingDoctor.specialty,
      email: editingDoctor.email,
      age: editingDoctor.age,
      gender: editingDoctor.gender,
      address: editingDoctor.address,
      password: "", 
    });
  } else {
    setFormValues({
      name: "",
      specialty: "",
      email: "",
      age: 30,
      gender: "Male",
      address: "",
      password: "",
    });
  }
}, [editingDoctor]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
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
        {dialogTitle}
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
              label="Email Address"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={!!editingDoctor}
            />
            <TextField
              label="Full Name"
              name="name"
              value={formValues.name}
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
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Specialty</InputLabel>
                <Select
                  name="specialty"
                  value={formValues.specialty}
                  label="Specialty"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                >
                  {Object.values(MedicalSpecialty).map((specialty) => (
                    <MenuItem key={specialty} value={specialty}>
                      {specialty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
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
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3, pt: 2, background: "#f3e5f5" }}>
        <MyButton onClick={onClose} variant="outlined" sx={{ minWidth: 120 }}>
          Cancel
        </MyButton>
        <MyButton onClick={handleModalSubmit} variant="contained" fullWidth>
          {submitText}
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddDoctorDialog;
