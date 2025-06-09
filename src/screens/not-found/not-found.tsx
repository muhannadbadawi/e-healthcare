import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
      textAlign="center"
      p={2}
      margin="auto"
    >
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" mb={2}>
        Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
