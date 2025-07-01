import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  CardHeader,
} from "@mui/material";
import { Doctor } from "../../../models/doctor";
import { useEffect, useState } from "react";
import { getDoctorInfo } from "../../../api/doctorService";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const DoctorHome = () => {
  const [doctorInfo, setDoctorInfo] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      setLoading(true);
      try {
        const doctor = await getDoctorInfo();
        console.log("doctor: ", doctor);
        setDoctorInfo(doctor);
      } catch (error) {
        console.error("Failed to fetch doctor info", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorInfo();
  }, []);

  return (
    <Box p={3}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Card sx={{ width: 300 }}>
          <CardHeader
            title="Personal Information"
            avatar={<PersonIcon />}
            sx={{
              background: "linear-gradient(to left, #7b1fa2, #512da8)",
              color: "#fff",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {loading ? (
              <>
                <Skeleton height={30} width="80%" />
                <Skeleton height={30} width="60%" />
                <Skeleton height={30} width="50%" />
                <Skeleton height={30} width="70%" />
                <Skeleton height={30} width="40%" />
              </>
            ) : doctorInfo ? (
              <>
                <Typography>
                  <strong>Email:</strong> {doctorInfo.email}
                </Typography>
                <Typography>
                  <strong>Name:</strong> {doctorInfo.name}
                </Typography>
                <Typography>
                  <strong>Age:</strong> {doctorInfo.age}
                </Typography>
                <Typography>
                  <strong>Gender:</strong> {doctorInfo.gender}
                </Typography>
              </>
            ) : (
              <Typography>Doctor information not found.</Typography>
            )}
          </CardContent>
        </Card>

        <Card sx={{ width: 300 }}>
          <CardHeader
            title="Expertise & Ratings"
            avatar={<LocalHospitalIcon />}
            sx={{
              background: "linear-gradient(to left, #7b1fa2, #512da8)",
              color: "#fff",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {loading ? (
              <>
                <Skeleton height={30} width="80%" />
                <Skeleton height={30} width="60%" />
                <Skeleton height={30} width="50%" />
                <Skeleton height={30} width="70%" />
                <Skeleton height={30} width="40%" />
              </>
            ) : doctorInfo ? (
              <>
                <Typography>
                  <strong>Specialty:</strong> {doctorInfo.specialty}
                </Typography>
                <Typography>
                  <strong>Rate:</strong> {doctorInfo.rate}
                </Typography>
                <Typography>
                  <strong>Session Price:</strong> ${doctorInfo.sessionPrice}
                </Typography>
                <Typography>
                  <strong>Number of Ratings:</strong>{" "}
                  {doctorInfo.numberOfRatings}
                </Typography>
              </>
            ) : (
              <Typography>Doctor information not found.</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DoctorHome;
