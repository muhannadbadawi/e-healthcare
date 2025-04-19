import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

interface IStepOneProps {
  name: string;
  setName: (name: string) => void;
  age: string;
  setAge: (age: string) => void;
  address: string;
  setAddress: (address: string) => void;
  gender: string;
  setGender: (gender: string) => void;
}
const StepOne = ({
  name,
  setName,
  age,
  setAge,
  address,
  setAddress,
  gender,
  setGender,
}: IStepOneProps) => {
  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Personal Information
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        autoComplete="name"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box display="flex" gap={2} alignItems="center">
        <TextField
          label="Age"
          variant="outlined"
          margin="normal"
          type="number"
          inputProps={{ min: 0, max: 100 }} // Set min and max values for age
          value={age}
          onChange={(e) => setAge(e.target.value)}
          sx={{
            width: {
              xs: "40%", // 100% width on small screens
              sm: "50%", // Auto width on larger screens
              md: "50%", // Auto width on larger screens
              lg: "50%", // Auto width on larger screens
            },
          }}
        />
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <TextField
        fullWidth
        label="Address"
        variant="outlined"
        autoComplete="address"
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </Box>
  );
};

export default StepOne;
