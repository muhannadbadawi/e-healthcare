import { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import image2 from "../../assets/image2.jpg";
import personal from "../../assets/personal.png";
import health from "../../assets/health.png";
import account from "../../assets/account.jpg";
import payment from "../../assets/payment.jpg";
import StepZero from "./steps/step-zero";
import StepOne from "./steps/step-one";
import StepTwo from "./steps/step-two";
import StepThree from "./steps/step-three";
import { registerClientData } from "../../models/register-client-data";
import { register } from "../../api/authService";
import toast from "react-hot-toast";
import MyButton from "../../components/my-button";
const steps = ["Account", "Personal", "Health", "Payment"];
const stepImages = [account, personal, health, payment];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<registerClientData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    address: "",
    height: "",
    weight: "",
    allergies: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (Object.values(formData).some((value) => value === "")) {
      // add alert or error message here
      toast.error("Please fill all fields!", { position: "bottom-center" });
      return;
    }
    try {
      const userData = { ...formData };
      await register(userData);
      toast.success("Registration successful!", { position: "bottom-center" });
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed!", { position: "bottom-center" });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
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
            backgroundImage: `url(${stepImages[activeStep]})`,
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
            <StepZero
              email={formData.email}
              password={formData.password}
              confirmPassword={formData.confirmPassword}
              setEmail={handleChange("email")}
              setPassword={handleChange("password")}
              setConfirmPassword={handleChange("confirmPassword")}
            />
          )}

          {activeStep === 1 && (
            <StepOne
              name={formData.name}
              age={formData.age}
              address={formData.address}
              gender={formData.gender}
              setGender={handleChange("gender")}
              setName={handleChange("name")}
              setAge={handleChange("age")}
              setAddress={handleChange("address")}
            />
          )}

          {activeStep === 2 && (
            <StepTwo
              height={formData.height}
              weight={formData.weight}
              allergies={formData.allergies}
              setHeight={handleChange("height")}
              setWeight={handleChange("weight")}
              setAllergies={handleChange("allergies")}
            />
          )}

          {activeStep === 3 && (
            <StepThree
              cardName={formData.cardName}
              cardNumber={formData.cardNumber}
              expiryDate={formData.expiryDate}
              cvv={formData.cvv}
              setCardName={handleChange("cardName")}
              setCardNumber={handleChange("cardNumber")}
              setExpiryDate={handleChange("expiryDate")}
              setCvv={handleChange("cvv")}
            />
          )}

          {/* Step navigation */}
          <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
            <MyButton
              variant="outlined"
              onClick={() => setActiveStep((prev) => prev - 1)}
              disabled={activeStep === 0}
            >
              Back
            </MyButton>

            {activeStep === steps.length - 1 ? (
              <MyButton variant="contained" onClick={handleRegister}>
                Register
              </MyButton>
            ) : (
              <MyButton
                variant="contained"
                onClick={() => setActiveStep((prev) => prev + 1)}
              >
                Next
              </MyButton>
            )}
          </Box>

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
            onClick={() => navigate("/")}
          >
            Back to Login
          </MyButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
