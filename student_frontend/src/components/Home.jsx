import "../assets/style.css";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

function Home() {
  return (
    <Box
      className="home"
      sx={{
        minHeight: "91vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#4527a0",
                fontWeight: "bold",

              }}
            >
              Student Management System
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#5e35b1",
                mb: 6,

              }}
            >
              Manage student records, attendance, marks, courses and reports
              efficiently from a single modern dashboard.
            </Typography>

            <Link
              to="/login"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#673ab7",
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: "#512da8",
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          px: 5,
          borderTop: "1px solid rgba(69,39,160,0.2)",
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      >
        <Typography
          sx={{
            color: "#4527a0",
            fontWeight: "500",
          }}
        >
          © 2026 Student Management System. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;