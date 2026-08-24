import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginToken");
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#673ab7",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          Student Management System
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {!isLoggedIn && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/"
              >
                Home
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/studentlist"
              >
                Student List
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/feedback"
              >
                Feedback
              </Button>

              <Button
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;