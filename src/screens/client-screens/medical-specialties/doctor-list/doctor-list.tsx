import { Avatar, Box, Typography, Paper, Chip } from "@mui/material";
import { Doctor } from "../../../../models/doctor";

interface IDoctorsListProps {
  doctorList: Doctor[];
}

type DoctorStatus = "online" | "offline" | "busy";

const getStatusColor = (status: DoctorStatus) => {
  switch (status) {
    case "online":
      return "success";
    case "busy":
      return "warning";
    case "offline":
    default:
      return "default";
  }
};

const DoctorsList = ({ doctorList }: IDoctorsListProps) => {
  return (
    <Box p={2} display="grid" gap={2}>
      {doctorList.map((doctor) => {
        const status: DoctorStatus = "offline"; // Static for now

        return (
          <Paper
            key={doctor._id}
            elevation={2}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-2px)",
                backgroundColor: "background.paper",
              },
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 64,
                height: 64,
                fontSize: "1.8rem",
              }}
            >
              {doctor.name.charAt(0).toUpperCase()}
            </Avatar>

            {/* Info */}
            <Box flex={1} minWidth={0}>
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mb={0.5}>
                <Typography
                  fontWeight="bold"
                  color="text.primary"
                  fontSize="1.2rem"
                  noWrap
                >
                  {doctor.name}
                </Typography>

                <Chip
                  label={status.charAt(0).toUpperCase() + status.slice(1)}
                  color={getStatusColor(status)}
                  size="small"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.7rem",
                    height: 22,
                    borderRadius: 1,
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                noWrap
              >
                {doctor.specialty}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.3}
              >
                <strong>${doctor.rate}</strong> per minute
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.3}
                noWrap
              >
                {doctor.email}
              </Typography>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default DoctorsList;
