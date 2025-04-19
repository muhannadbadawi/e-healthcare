import { Box, TextField, Typography } from "@mui/material";

interface IStepTwoProps {
  height: string;
  setHeight: (height: string) => void;
  weight: string;
  setWeight: (weight: string) => void;
  allergies: string;
  setAllergies: (allergies: string) => void;
}

const StepTwo = ({
  height,
  setHeight,
  weight,
  setWeight,
  allergies,
  setAllergies,
}: IStepTwoProps) => {
  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Health Information
      </Typography>
      <TextField
        fullWidth
        label="Height (cm)"
        variant="outlined"
        margin="normal"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <TextField
        fullWidth
        label="Weight (kg)"
        variant="outlined"
        margin="normal"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <TextField
        fullWidth
        label="Allergies"
        variant="outlined"
        margin="normal"
        value={allergies}
        onChange={(e) => setAllergies(e.target.value)}
      />
    </Box>
  );
};
export default StepTwo;
