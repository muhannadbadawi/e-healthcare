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
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDialogHook } from "../../../hook/use-dialog";
import AddDoctorDialog from "./add-client-dialog/add-client-dialog";
import { deleteDoctor, getClients } from "../../../api/adminService";
import ListIcon from "@mui/icons-material/List";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../../../components/confirm-dialog";

export interface Client {
  _id: string;
  name: string;
  email: string;
  age: number;
  gender: "Male" | "Female";
  address: string;
  height: string;
  weight: string;
  allergies: string;
}

const AdminClientManagement: React.FC = () => {
  const { isOpen, openDialog, closeDialog } = useDialogHook();
  const [doctors, setDoctors] = useState<Client[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Client | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<Client | null>(null);

  const open = Boolean(anchorEl);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    doctor: Client
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
    const doctors = (await getClients()) as Client[];
    setDoctors(doctors);
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = (doctor: Client) => {
    setDoctorToDelete(doctor); // Set the doctor to delete
    setOpenConfirmDialog(true); // Open the confirmation dialog
  };

  const resetPassword = (doctor: Client) => {
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
    if (editingDoctor) {
      fetchDoctors(); // Refetch the doctors after editing
      setEditingDoctor(null);
    }
  };

  return (
    <Box sx={{ flex: 1, padding: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Clients Management
      </Typography>

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
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Age</strong>
                </TableCell>
                <TableCell>
                  <strong>Gender</strong>
                </TableCell>
                <TableCell>
                  <strong>Location</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor._id} hover>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.age}</TableCell>
                  <TableCell>{doctor.gender}</TableCell>
                  <TableCell>{doctor.address}</TableCell>

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
                        handleMenuClose();
                      }}
                    >
                      <VisibilityIcon sx={{ mr: 1 }} color="primary" />
                      View
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        resetPassword(selectedDoctor!);
                        handleMenuClose();
                      }}
                    >
                      <LockResetIcon sx={{ mr: 1 }} color="primary" />
                      Reset Password
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
            No clients available.
          </Typography>
        )}
      </TableContainer>


      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Client"
        message="Are you sure you want to delete this doctor?"
        confirmText="Confirm Delete"
        confirmButtonColor="error"
      />
    </Box>
  );
};

export default AdminClientManagement;
