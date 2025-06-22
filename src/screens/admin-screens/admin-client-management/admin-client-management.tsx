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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteClient,
  getClients,
  resetClientPassword,
} from "../../../api/adminService";
import ListIcon from "@mui/icons-material/List";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../../../components/confirm-dialog";
import TableSkeleton from "../table-skeleton/table-skeleton";
import toast from "react-hot-toast";
import { useDialogHook } from "../../../hooks/use-dialog";
import ViewClientDialog from "./view-client-dialog/view-client-dialog";

export interface Client {
  _id: string;
  name: string;
  email: string;
  age: number;
  gender: "male" | "female";
  address: string;
  height: string;
  weight: string;
  allergies: string;
  userId: string;
}

const AdminClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [targetClient, setTargetClient] = useState<Client | null>(null);
  const { isOpen, openDialog, closeDialog } = useDialogHook();

  const open = Boolean(anchorEl);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    client: Client
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClient(null);
  };

  const fetchClients = async () => {
    setLoading(true);
    const clients = (await getClients()) as Client[];
    setClients(clients);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleView = (client: Client) => {
    setTargetClient(client);
    openDialog("viewClient");
  };

  const onCloseView = () => {
    setTargetClient(null)
    closeDialog()
  }

  const handleDelete = (client: Client) => {
    setClientToDelete(client); // Set the client to delete
    setOpenConfirmDialog(true); // Open the confirmation dialog
  };

  const resetPassword = async (client: Client) => {
    const reset = await resetClientPassword(client.userId);
    if (reset) {
      toast.success(`Password reset successfully to ${client.name}.`, {
        duration: 2000,
        position: "bottom-left",
      });
    } else {
      toast.error("Failed to reset password.", {
        duration: 2000,
        position: "bottom-left",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (clientToDelete) {
      await deleteClient(clientToDelete._id);
      fetchClients();
    }
    setOpenConfirmDialog(false); // Close the dialog after confirming
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false); // Just close the dialog
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
          <TableSkeleton />
        ) : clients.length > 0 ? (
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
              {clients.map((client) => (
                <TableRow key={client._id} hover>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.age}</TableCell>
                  <TableCell>{client.gender}</TableCell>
                  <TableCell>{client.address}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => handleMenuClick(e, client)}
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
                        handleView(selectedClient!);
                        handleMenuClose();
                      }}
                    >
                      <VisibilityIcon sx={{ mr: 1 }} color="primary" />
                      View
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        resetPassword(selectedClient!);
                        handleMenuClose();
                      }}
                    >
                      <LockResetIcon sx={{ mr: 1 }} color="primary" />
                      Reset Password
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleDelete(selectedClient!);
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
        message={`Are you sure you want to delete ${clientToDelete?.name}?`}
        confirmText="Confirm Delete"
        confirmButtonColor="error"
      />
      {targetClient && (
        <ViewClientDialog
          client={targetClient}
          isOpen={isOpen === "viewClient"}
          onClose={onCloseView}
        />
      )}
    </Box>
  );
};

export default AdminClientManagement;
