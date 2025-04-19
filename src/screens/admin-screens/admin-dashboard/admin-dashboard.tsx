import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CardHeader,
} from "@mui/material";
import { useState, useEffect } from "react";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import { getCounts } from "../../../api/adminService";

const AdminDashboard = () => {
  // Example state for dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeDoctors: 0,
    activeClients: 0,
  });
  const fetchCounts = async () => {
    const counts = (await getCounts()) as {
      clientsCount: number;
      usersCount: number;
      doctorsCount: number;
    };
    console.log("counts: ", counts);

    setDashboardData({
      totalUsers: counts.usersCount,
      activeDoctors: counts.doctorsCount,
      activeClients: counts.clientsCount,
    });
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ padding: 2 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={12} sx={{ px: 2 }}>
        {/* Total Users */}
        <Card>
          <CardHeader
            title="Total Users"
            avatar={<PeopleIcon />}
            sx={{ backgroundColor: "#f5f5f5" }}
          />
          <CardContent>
            <Typography variant="h5">{dashboardData.totalUsers}</Typography>
          </CardContent>
        </Card>

        {/* Active Doctors */}
        <Card>
          <CardHeader
            title="Active Doctors"
            avatar={<GroupIcon />}
            sx={{ backgroundColor: "#f5f5f5" }}
          />
          <CardContent>
            <Typography variant="h5">{dashboardData.activeDoctors}</Typography>
          </CardContent>
        </Card>

        {/* Active Clients */}
        <Card>
          <CardHeader
            title="Active Clients"
            avatar={<GroupIcon />}
            sx={{ backgroundColor: "#f5f5f5" }}
          />
          <CardContent>
            <Typography variant="h5">{dashboardData.activeClients}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
