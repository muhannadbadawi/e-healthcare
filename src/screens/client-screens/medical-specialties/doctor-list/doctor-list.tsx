import {
  Avatar,
  Box,
  Typography,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Rating,
} from "@mui/material";
import { Doctor } from "../../../../models/doctor";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../../../../components/SocketContext";
import { useBalanceContext } from "../../client-layout";
import { NewReleases } from "@mui/icons-material";

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
  const { socket } = useSocketContext();
  const { doctorStatuses } = useSocketContext();
  const { balance, updateSelectedSessionPrice } = useBalanceContext();

  const [waitingDialogOpen, setWaitingDialogOpen] = useState(false); // Dialog control
  const [selectedDoctorName, setSelectedDoctorName] = useState("");

  const activeDoctors = doctorList.filter((doctor) =>
    ["online", "busy", "offline"].includes(doctorStatuses[doctor.userId])
  );

  const openChat = (
    doctorId: string,
    status: DoctorStatus,
    sessionPrice: number
  ) => {
    if (waitingDialogOpen) return;
    if (sessionPrice > (balance ?? 0)) {
      toast.error("Insufficient balance to start a chat with this doctor.");
      return;
    }

    const doctor = doctorList.find((doc) => doc.userId === doctorId);
    updateSelectedSessionPrice?.(sessionPrice);
    if (status === "online") {
      socket?.emit("chatRequest", {
        recipientId: doctorId,
        requestType: "REQUEST",
      });
      setSelectedDoctorName(doctor?.name || "");
      setWaitingDialogOpen(true);
    } else {
      toast.error("The doctor is busy, please try again later.");
    }
  };

  useEffect(() => {
    let timeout: number;
    if (waitingDialogOpen) {
      timeout = setTimeout(() => {
        setWaitingDialogOpen(false);
      }, 15000);
    }
    return () => clearTimeout(timeout);
  }, [waitingDialogOpen]);
  return (
    <>
      <Box p={2} display="grid" gap={2}>
        {activeDoctors.map((doctor) => {
          const status: DoctorStatus = doctorStatuses[doctor.userId];

          return (
            doctor.sessionPrice > 0 && (
              <Paper
                key={doctor._id}
                elevation={2}
                onClick={() =>
                  openChat(doctor.userId, status, doctor.sessionPrice)
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)",
                    backgroundColor: "background.paper",
                  },
                }}
              >
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

                <Box flex={1} minWidth={0}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    flexWrap="wrap"
                    mb={0.5}
                  >
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

                  <Typography variant="body2" color="text.secondary" noWrap>
                    {doctor.specialty}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mt={0.3}>
                    <strong>{doctor.sessionPrice} JOD</strong> Session Price
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
                <Box
                  flex={1}
                  minWidth={0}
                  justifyContent={"center"}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  {doctor.numberOfRatings > 0 ? (
                    <>
                      <Rating
                        name={`doctor-rating-${doctor.userId}`}
                        value={doctor.rate}
                        precision={0.5}
                        readOnly
                        size="medium"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.3}
                        noWrap
                      >
                        {doctor.rate} / 5.0
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={0.3}
                      noWrap
                    >
                      <Chip
                        label={"New"}
                        color={getStatusColor(status)}
                        icon={<NewReleases />}
                        size="small"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.7rem",
                          height: 22,
                          borderRadius: 1,
                        }}
                      />
                    </Typography>
                  )}
                </Box>
              </Paper>
            )
          );
        })}
      </Box>

      {/* Waiting Dialog */}
      <Dialog open={waitingDialogOpen}>
        <DialogTitle>Please wait</DialogTitle>
        <DialogContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CircularProgress size={24} />
          <Typography variant="body1">
            Waiting for {selectedDoctorName} to respond...
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorsList;
