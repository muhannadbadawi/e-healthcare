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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import { getCounts } from "../../../api/adminService";

const AdminDashboard = () => {
  // Example state for dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeAdmin: 0,
    activeDoctors: 0,
    activeClients: 0,
  });
  const fetchCounts = async () => {
    const counts = (await getCounts()) as {
      adminsCount: number;
      clientsCount: number;
      usersCount: number;
      doctorsCount: number;
    };

    setDashboardData({
      totalUsers: counts.usersCount,
      activeDoctors: counts.doctorsCount,
      activeAdmin: counts.adminsCount,
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
        {/* Active Admins */}
        <Card>
          <CardHeader
            title="Active Admins"
            avatar={<AdminPanelSettingsIcon />}
            sx={{ backgroundColor: "#f5f5f5" }}
          />
          <CardContent>
            <Typography variant="h5">{dashboardData.activeAdmin}</Typography>
          </CardContent>
        </Card>

        {/* Active Doctors */}
        <Card>
          <CardHeader
            title="Active Doctors"
            avatar={<LocalHospitalIcon />}
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
            avatar={<PersonIcon />}
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
