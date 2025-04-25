import {
  Button,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Rating,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDialogHook } from "../../../hook/use-dialog";
import AddDoctorDialog from "./add-doctor-dialog/add-doctor-dialog";
import { getDoctors } from "../../../api/adminService";
import ListIcon from "@mui/icons-material/List";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  email: string;
  rate: number;
  age: number;
  gender: "Male" | "Female" | "Other";
  address: string;
}

const AdminDoctorsManagement: React.FC = () => {
  const { isOpen, openDialog, closeDialog } = useDialogHook();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    doctor: Doctor
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoctor(doctor);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDoctor(null);
  };

  const fetchDoctors = async () => {
    const doctors = (await getDoctors()) as Doctor[];
    setDoctors(doctors);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAdd = () => {
    openDialog();
  };

  const handleDelete = (id: string) => {
    setDoctors((prevDoctors) =>
      prevDoctors.filter((doctor) => doctor._id !== id)
    );
    toast.success("Doctor deleted successfully!");
  };

  const handleEdit = (doctor: Doctor) => {
    console.log("doctor: ", doctor);
    toast("Edit functionality not implemented yet.");
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        Add Doctor
      </Button>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        {doctors.length > 0 ? (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Specialty</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor._id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>
                    <Rating
                      value={Number(doctor.rate) || 0}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, doctor)}>
                      <ListIcon />
                    </IconButton>
                  </TableCell>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 5,
                      },
                    }}
                  >
                    <MenuItem
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                      onClick={() => {
                        handleEdit(selectedDoctor!);
                        handleMenuClose();
                      }}
                    >
                      <VisibilityIcon color="primary" />
                      View
                    </MenuItem>
                    <MenuItem
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                      onClick={() => {
                        handleEdit(selectedDoctor!);
                        handleMenuClose();
                      }}
                    >
                      <EditIcon color="primary" />
                      Edit
                    </MenuItem>
                    <MenuItem
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                      onClick={() => {
                        handleDelete(selectedDoctor!._id);
                        handleMenuClose();
                      }}
                    >
                      <DeleteIcon color="error" />
                      Delete
                    </MenuItem>
                  </Menu>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1" color="textSecondary" p={2}>
            No doctors available.
          </Typography>
        )}
      </TableContainer>
      <AddDoctorDialog isOpen={isOpen} onClose={closeDialog} />
    </Box>
  );
};

export default AdminDoctorsManagement;
