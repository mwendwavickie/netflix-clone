import React, {useState} from "react";
import {Box, Container, Typography, TextField, Button, Link, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
            if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
            }
            // TODO: Add Firebase or backend signup logic here
            console.log("Sign Up:", { email, password });
    }

    return (
        <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#141414",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9))`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, backgroundColor: "#1c1c1c" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "white", fontWeight: "bold" }}
          >
            Create Account
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                input: { color: "white" },
                label: { color: "#aaa" },
                backgroundColor: "#333",
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
                input: { color: "white" },
                label: { color: "#aaa" },
                backgroundColor: "#333",
              }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              variant="filled"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                mb: 3,
                input: { color: "white" },
                label: { color: "#aaa" },
                backgroundColor: "#333",
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              size="large"
              sx={{ mb: 2 }}
            >
              Sign Up
            </Button>
          </form>

          <Typography align="center" sx={{ color: "#aaa" }}>
            Already have an account?{" "}
            <Link
              underline="hover"
              sx={{ color: "#f44336", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Log In
            </Link>
          </Typography>
        </Paper>
      </Container>
      </Box>

    )


}
export default SignUpPage;