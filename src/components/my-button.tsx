import { Button, ButtonProps } from "@mui/material";

const MyButton = ({ sx, variant = "contained", color = undefined, ...props }: ButtonProps) => {
  const baseStyles =
    variant === "contained" && !color
      ? {
          background: "linear-gradient(to right, #7b1fa2, #512da8)",
          color: "#fff",
          '&:hover': {
            background: "linear-gradient(to left, #7b1fa2, #512da8)",
            boxShadow: "0px 4px 20px rgba(123, 31, 162, 0.3)",
          },
        }
      : variant === "outlined" && !color
      ? {
          border: "1px solid #7b1fa2",
          color: "#7b1fa2",
          backgroundColor: "#fff",
          '&:hover': {
            backgroundColor: "#f3e5f5",
            borderColor: "#512da8",
            color: "#512da8",
          },
        }
      : undefined;

  // Ensure the `color` prop is passed to the MUI Button for standard color handling
  return (
    <Button
      variant={variant}
      color={color} // Pass color directly to MUI Button component
      {...props}
      sx={{
        borderRadius: 3,
        fontWeight: 600,
        textTransform: "none",
        transition: "0.3s ease-in-out",
        ...baseStyles,
        ...sx,
      }}
    >
      {props.children}
    </Button>
  );
};

export default MyButton;
