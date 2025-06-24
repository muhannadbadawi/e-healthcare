import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { Doctor } from "../../../models/doctor";
import { useEffect, useState } from "react";
import { getDoctorInfo } from "../../../api/doctorService";

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
      <Typography variant="h4" gutterBottom>
        {loading ? <Skeleton width="60%" /> : `Welcome, Dr. ${doctorInfo?.name}`}
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {loading ? <Skeleton width="30%" /> : "Doctor Information"}
          </Typography>

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
                <strong>Specialty:</strong> {doctorInfo.specialty}
              </Typography>
              <Typography>
                <strong>Rate:</strong> {doctorInfo.rate}
              </Typography>
              <Typography>
                <strong>Session Price:</strong> ${doctorInfo.sessionPrice}
              </Typography>
              <Typography>
                <strong>Number of Ratings:</strong> {doctorInfo.numberOfRatings}
              </Typography>
            </>
          ) : (
            <Typography>Doctor information not found.</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DoctorHome;
