import { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import MedicalConsultation from "../../assets/MedicalConsultation.jpg";
import { login } from "../../api/authService";
import image2 from "../../assets/image2.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userInfo = await login(email, password);
    if(userInfo.role === "admin"){
      navigate("/admin/home");
    } else if(userInfo.role === "doctor"){
      navigate("/doctor/home");
    } else if(userInfo.role === "client"){
      navigate("/client/home");
    }
    else {
      console.error("Invalid role or user not found");
      alert("Invalid credentials or user not found");
    }
  };

  const handleRegister = () => {
    console.log("Navigate to registration page");
    navigate("/register");
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
        {/* Left Background Section */}
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
          <Typography variant="subtitle1" gutterBottom>
            Welcome Back
          </Typography>

          <Typography variant="h4" color="text.secondary" sx={{ mb: 3 }}>
            Login to Your Account
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
            autoFocus
            autoComplete="email"
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
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

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
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
        {/* Right Login Form */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${MedicalConsultation})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
            minHeight: { md: 500 },
          }}
        />
      </Paper>
    </Box>
  );
};

export default Login;
