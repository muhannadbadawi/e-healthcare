import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import MyButton from "./my-button"; // Importing MyButton

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  confirmButtonColor?:
    | "primary"
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmButtonColor,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ fontWeight: 600, fontSize: "1.25rem" }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ paddingTop: 2 }}>
        <Typography variant="body1" color="textSecondary" fontSize="1rem">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ padding: "16px 24px", justifyContent: "space-between" }}
      >
        <MyButton
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{ minWidth: 120, padding: "8px 16px" }}
        >
          Cancel
        </MyButton>
        <MyButton
          onClick={onConfirm}
          color={confirmButtonColor || "primary"}
          variant="contained"
          sx={{ minWidth: 120, padding: "8px 16px" }}
        >
          {confirmText}
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
