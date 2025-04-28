import {
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
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDialogHook } from "../../../hooks/use-dialog";
import AddDoctorDialog from "./add-doctor-dialog/add-doctor-dialog";
import { deleteDoctor, getDoctors } from "../../../api/adminService";
import ListIcon from "@mui/icons-material/List";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MyButton from "../../../components/my-button";
import ConfirmDialog from "../../../components/confirm-dialog";
import { Doctor } from "../../../models/doctor";

const AdminDoctorsManagement: React.FC = () => {
  const { isOpen, openDialog, closeDialog } = useDialogHook();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null);

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
    setLoading(true);
    const doctors = (await getDoctors()) as Doctor[];
    setDoctors(doctors);
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAdd = () => {
    openDialog();
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    openDialog();
  };

  const handleDelete = (doctor: Doctor) => {
    setDoctorToDelete(doctor); // Set the doctor to delete
    setOpenConfirmDialog(true); // Open the confirmation dialog
  };

  const handleConfirmDelete = async () => {
    if (doctorToDelete) {
      await deleteDoctor(doctorToDelete._id);
      fetchDoctors();
    }
    setOpenConfirmDialog(false); // Close the dialog after confirming
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false); // Just close the dialog
  };

  const onCloseDialog = () => {
    closeDialog();
    fetchDoctors(); // Refetch the doctors after editing
    if (editingDoctor) setEditingDoctor(null);
  };

  return (
    <Box sx={{ flex: 1, padding: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Doctors Management
      </Typography>

      <Box display="flex" justifyContent="flex-start" mb={2}>
        <MyButton variant="contained" onClick={handleAdd} sx={{ px: 3 }}>
          Add Doctor
        </MyButton>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 300, borderRadius: 3 }}
      >
        {loading ? (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Skeleton width={150} />
                </TableCell>
                <TableCell>
                  <Skeleton width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton width={150} />
                </TableCell>
                <TableCell>
                  <Skeleton width={100} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton width={100} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton width={200} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={120} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={180} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={80} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton width={80} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : doctors.length > 0 ? (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Specialty</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Rating</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor._id} hover>
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
                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => handleMenuClick(e, doctor)}
                      sx={{
                        color: "#7b1fa2",
                      }}
                    >
                      <ListIcon />
                    </IconButton>
                  </TableCell>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 2,
                        minWidth: 150,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleEdit(selectedDoctor!);
                        handleMenuClose();
                      }}
                    >
                      <VisibilityIcon sx={{ mr: 1 }} color="primary" />
                      View
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleEdit(selectedDoctor!);
                        handleMenuClose();
                      }}
                    >
                      <EditIcon sx={{ mr: 1 }} color="primary" />
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleDelete(selectedDoctor!);
                        handleMenuClose();
                      }}
                    >
                      <DeleteIcon sx={{ mr: 1 }} color="error" />
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

      <AddDoctorDialog
        isOpen={isOpen}
        onClose={onCloseDialog}
        editingDoctor={editingDoctor}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Doctor"
        message="Are you sure you want to delete this doctor?"
        confirmText="Confirm Delete"
        confirmButtonColor="error"
      />
    </Box>
  );
};

export default AdminDoctorsManagement;
