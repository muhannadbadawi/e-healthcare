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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import { getCounts } from "../../../api/adminService";

const AdminDashboard = () => {
  // Example state for dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    activeAdmin: 0,
    activeDoctors: 0,
    activeClients: 0,
    chats: 0,
  });
  const fetchCounts = async () => {
    const counts = (await getCounts()) as {
      adminsCount: number;
      clientsCount: number;
      usersCount: number;
      doctorsCount: number;
      chatsCount: number;
    };

    setDashboardData({
      totalUsers: counts.usersCount,
      activeDoctors: counts.doctorsCount,
      activeAdmin: counts.adminsCount,
      activeClients: counts.clientsCount,
      chats: counts.chatsCount,
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
        <Card sx={{ width: 170 }}>
          <CardHeader
            title="Total Users"
            avatar={<PeopleIcon />}
            sx={{
              background: "linear-gradient(to left, #7b1fa2, #512da8)",
              color: "#fff",
            }}
          />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>{dashboardData.totalUsers} Users</Typography>
          </CardContent>
        </Card>
        {/* Active Admins */}
        <Card sx={{ width: 170 }}>
          <CardHeader
            title="Active Admins"
            avatar={<AdminPanelSettingsIcon />}
            sx={{
              background: "linear-gradient(to left, #7b1fa2, #512da8)",
              color: "#fff",
            }}
          />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>{dashboardData.activeAdmin} Admins</Typography>
          </CardContent>
        </Card>

        {/* Active Doctors */}
        <Card sx={{ width: 170 }}>
          <CardHeader
            title="Active Doctors"
            avatar={<LocalHospitalIcon />}
            sx={{
              background: "linear-gradient(to left, #7b1fa2, #512da8)",
              color: "#fff",
            }}
          />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>{dashboardData.activeDoctors} Doctors</Typography>
          </CardContent>
        </Card>

        {/* Active Clients */}
        <Card sx={{ width: 170 }}>
          <CardHeader
            title="Active Clients"
            avatar={<PersonIcon />}
            sx={{
              background: "linear-gradient(to left, #7b1fa2, #512da8)",
              color: "#fff",
            }}
          />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>{dashboardData.activeClients} Clients</Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 170 }}>
          <CardHeader
            title="Total Chats"
            avatar={<ChatIcon />}
            sx={{
              background: "linear-gradient(to left, #7b1fa2, #512da8)",
              color: "#fff",
            }}
          />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>{dashboardData.chats} Total Chats</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
