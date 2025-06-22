import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MyButton from "../../../../components/my-button";
import { Client } from "../admin-client-management";

interface IViewClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
}

const ViewClientDialog = ({
  isOpen,
  onClose,
  client,
}: IViewClientDialogProps) => {

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
        {`${client.gender === "male" ? "Mr." : "Ms."} ${client.name}`}
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
              value={client.email}
              fullWidth
              disabled
            />
            <TextField
              size="small"
              label="Full Name"
              name="name"
              value={client.name}
              fullWidth
              disabled
            />
            <TextField
              size="small"
              label="Address"
              name="address"
              value={client.address}
              fullWidth
              disabled
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Age"
                name="age"
                type="number"
                value={client.age}
                fullWidth
                disabled
              />
              <FormControl fullWidth>
                <Typography variant="subtitle2">Gender</Typography>
                <RadioGroup row name="gender" value={client.gender}>
                  <FormControlLabel
                    value="male"
                    control={<Radio checked={client.gender === "male"}/>}
                    label="Male"
                    disabled
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio checked={client.gender === "female"}/>}
                    label="Female"
                    disabled
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                size="small"
                label="Height"
                name="height"
                value={client.height}
                fullWidth
                disabled
              />
              <TextField
                size="small"
                label="Weight"
                name="weight"
                value={client.weight}
                fullWidth
                disabled
              />
            </Stack>
            <TextField
              size="small"
              label="Allergies"
              name="allergies"
              value={client.allergies}
              fullWidth
              disabled
              multiline
              minRows={2}
            />
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3, pt: 2, background: "#f3e5f5" }}>
        <MyButton
          onClick={onClose}
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          Cancel
        </MyButton>
      </DialogActions>
    </Dialog>
  );
};

export default ViewClientDialog;
