import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import image2 from "../../assets/image2.jpg";
import personal from "../../assets/personal.png";
import health from "../../assets/health.png";
import account from "../../assets/account.jpg";
import payment from "../../assets/payment.jpg";

const steps = ["Account", "Personal", "Health", "Payment"];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering user:", {
      name,
      email,
      password,
      age,
      address,
      healthConditions,
    });
    navigate("/");
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleLoginRedirect = () => {
    console.log("Navigate back to login page");
    navigate("/");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={"100%"}
      sx={{
        backgroundImage: `url(${image2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(4px)",
        padding: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          overflow: "hidden",
          width: { xs: "100%", sm: "90%", md: 900 },
          maxWidth: "100%",
        }}
      >
        {/* Left Image Section */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${
              activeStep === 0
                ? account
                : activeStep === 1
                ? personal
                : activeStep === 2
                ? health
                : payment
            })`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backdropFilter: "blur(4px)",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Right Form Section */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: 4, sm: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create Account
          </Typography>

          <Stepper activeStep={activeStep} nonLinear>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepButton onClick={() => setActiveStep(index)}>
                  {step}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Account Information
              </Typography>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Personal Information
              </Typography>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Age"
                variant="outlined"
                margin="normal"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Health Information
              </Typography>
              <TextField
                fullWidth
                label="Height (cm)"
                variant="outlined"
                margin="normal"
                value={healthConditions}
                onChange={(e) => setHealthConditions(e.target.value)}
              />
              <TextField
                fullWidth
                label="Weight (kg)"
                variant="outlined"
                margin="normal"
                value={healthConditions}
                onChange={(e) => setHealthConditions(e.target.value)}
              />
              <TextField
                fullWidth
                label="Allergies"
                variant="outlined"
                margin="normal"
                value={healthConditions}
                onChange={(e) => setHealthConditions(e.target.value)}
              />
            </Box>
          )}
          {activeStep === 3 && (
            <Box>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Payment Information
              </Typography>
              <TextField
                fullWidth
                label="Cardholder Name"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Card Number"
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 19 }}
                placeholder="XXXX XXXX XXXX XXXX"
              />
              <Box display="flex" gap={2}>
                <TextField
                  label="Expiry Date"
                  variant="outlined"
                  margin="normal"
                  placeholder="MM/YY"
                  fullWidth
                />
                <TextField
                  label="CVV"
                  variant="outlined"
                  margin="normal"
                  placeholder="XXX"
                  inputProps={{ maxLength: 4 }}
                  fullWidth
                />
              </Box>
            </Box>
          )}

          <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
              >
                Register
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
            }}
            onClick={handleLoginRedirect}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
