import { useEffect, useState } from "react";
import { getDoctors } from "../../../api/clientService";
import { Box, Card, CardContent, Typography, Badge, Button } from "@mui/material";
import { Doctor } from "../../../models/doctor";
import DoctorsList from "./doctor-list/doctor-list"; // Adjust path if needed

const MedicalSpecialties = () => {
  const [doctorGroups, setDoctorGroups] = useState<
    { specialty: string; doctors: Doctor[] }[]
  >([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  useEffect(() => {
    getDoctors().then(setDoctorGroups);
  }, []);

  const handleCardClick = (specialty: string) => {
    setSelectedSpecialty(specialty);
  };

  const handleBack = () => {
    setSelectedSpecialty(null);
  };

  const selectedDoctors =
    doctorGroups.find((group) => group.specialty === selectedSpecialty)?.doctors || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        padding: 3,
      }}
    >
      {selectedSpecialty ? (
        <Box width="100%">
          <Button variant="contained" onClick={handleBack} sx={{ mb: 3 }}>
            Back to Specialties
          </Button>
          <Typography variant="h5" textAlign="center" mb={2}>
            Doctors specialized in {selectedSpecialty}
          </Typography>
          <DoctorsList doctorList={selectedDoctors} />
        </Box>
      ) : (
        doctorGroups.map(({ specialty, doctors }) => (
          <Card
            key={specialty}
            sx={{
              width: 240,
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
              backgroundColor: "#f5f5f5",
            }}
            onClick={() => handleCardClick(specialty)}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Badge
                badgeContent={doctors.length}
                color="primary"
                sx={{
                  mb: 2,
                  borderRadius: "50%",
                  backgroundColor: "#4caf50",
                  padding: "8px",
                }}
              ></Badge>

              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#333",
                  mb: 1,
                  fontSize: "1.1rem",
                }}
              >
                {specialty}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", fontSize: "0.9rem" }}
              >
                {doctors.length} Doctor{doctors.length > 1 ? "s" : ""}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default MedicalSpecialties;
