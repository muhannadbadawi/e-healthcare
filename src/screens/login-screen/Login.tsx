import { useState } from "react";
import { TextField, Typography, Box, Paper } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import MedicalConsultation from "../../assets/MedicalConsultation.jpg";
import { login } from "../../api/authService";
import image2 from "../../assets/image2.jpg";
import { UserTypeEnum } from "../../enums/user-type-enum";
import MyButton from "../../components/my-button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await login(email, password);
    if (user.role === UserTypeEnum.ADMIN) {
      navigate("/admin");
    } else if(user.role === UserTypeEnum.DOCTOR){
      navigate("/doctor");
    } else if(user.role === UserTypeEnum.CLIENT){
      navigate("/client/home",{state:{user}});
    }
  };

  const handleRegister = () => {
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <MyButton
            fullWidth
            variant="contained"
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
          </MyButton>

          <MyButton
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
          </MyButton>
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
