import { Box, TextField, Typography } from "@mui/material";

interface IStepThreeProps {
  cardName: string;
  setCardName: (cardName: string) => void;
  cardNumber: string;
  setCardNumber: (cardNumber: string) => void;
  expiryDate: string;
  setExpiryDate: (expiryDate: string) => void;
  cvv: string;
  setCvv: (cvv: string) => void;
}
const StepThree = ({
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
}: IStepThreeProps) => {
  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Payment Information
      </Typography>
      <TextField
        fullWidth
        label="Cardholder Name"
        variant="outlined"
        autoComplete="cc-name"
        margin="normal"
        value={cardName}
        onChange={(e) => setCardName(e.target.value.toUpperCase())} 
      />
      <TextField
        fullWidth
        label="Card Number"
        variant="outlined"
        margin="normal"
        inputProps={{ maxLength: 19 }}
        placeholder="XXXX XXXX XXXX XXXX"
        value={cardNumber}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "").slice(0, 16); // Allow only digits and limit to 16 characters
          const formattedValue = value.replace(/(.{4})/g, "$1 ").trim(); // Format as XXXX XXXX XXXX XXXX
          setCardNumber(formattedValue);
        }}
      />
      <Box display="flex" gap={2}>
        <TextField
          label="Expiry Date"
          variant="outlined"
          margin="normal"
          placeholder="MM/YY"
          fullWidth
          inputProps={{ maxLength: 5 }}
          value={expiryDate}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 4); // Allow only digits and limit to 4 characters
            const formattedValue = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value; // Format as MM/YY
            setExpiryDate(formattedValue);
          }}
        />
        <TextField
          label="CVV"
          variant="outlined"
          margin="normal"
          placeholder="XXX"
          inputProps={{ maxLength: 3 }}
          fullWidth
          value={cvv}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 3); // Allow only digits and limit to 3 characters
            setCvv(value);
          }}
        />
      </Box>
    </Box>
  );
};
export default StepThree;
