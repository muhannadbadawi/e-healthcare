import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { JSX, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useBalanceContext } from "../screens/client-screens/client-layout";

interface ILayoutProps {
  navItems: (
    | {
        text: string;
        path: string;
        icon: JSX.Element;
        action?: undefined;
      }
    | {
        text: string;
        action: () => void;
        icon: JSX.Element;
        path?: undefined;
      }
  )[];
  defaultRout: string;
}

const Layout = ({ navItems, defaultRout }: ILayoutProps) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [chargeAmount, setChargeAmount] = useState<number | "">("");
  const { balance, updateBalance } = useBalanceContext();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(defaultRout);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const drawer = (
    <div style={{ marginTop: 60 }}>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                if (item.path) navigate(item.path);
                else item.action?.();

                if (mobileOpen) setMobileOpen(false);
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#7b1fa2",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(to left, #7b1fa2, #512da8)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar>{user?.name?.charAt(0).toUpperCase()}</Avatar>
            <Typography variant="h6" noWrap component="div">
              {user.name.toUpperCase()}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {balance !== undefined && (
            <Box onClick={handleDialogOpen} sx={{ cursor: "pointer" }}>
              <Typography>{`${balance} JOD`}</Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 240px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Recharge Balance</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Enter the amount you want to recharge:
          </Typography>
          <TextField
            label="Amount (JOD)"
            type="number"
            fullWidth
            value={chargeAmount}
            onChange={(e) => setChargeAmount(Number(e.target.value))}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={async () => {
              if (chargeAmount && chargeAmount > 0) {
                if (updateBalance) {
                  if (typeof balance === "number") {
                    await updateBalance(chargeAmount + balance);
                  }
                }

                // Reset & close dialog
                setChargeAmount("");
                handleDialogClose();
              }
            }}
            variant="contained"
            color="primary"
          >
            Recharge
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Layout;
