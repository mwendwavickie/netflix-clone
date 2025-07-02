import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const err = {};
    if (!email.includes("@")) err.email = "Invalid email address";
    if (password.length < 6) err.password = "Password too short";
    if (password !== confirmPassword)
      err.confirmPassword = "Passwords do not match";
    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError({ email: "Email already in use" });
      } else {
        alert("Signup failed: " + err.message);
      }
    }
  };

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#141414",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            backgroundColor: "rgba(28,28,28,0.95)",
            borderRadius: 3,
            boxShadow: "0 0 20px rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: "white",
              fontWeight: "bold",
              textShadow: "1px 1px 6px rgba(255,0,0,0.4)",
            }}
          >
            Create Your Account
          </Typography>

          <Typography
            align="center"
            variant="subtitle2"
            sx={{ color: "#ccc", mb: 3 }}
          >
            Join Streamify and start streaming instantly
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error.email}
              helperText={error.email}
              sx={{
                mb: 2,
                backgroundColor: "#333",
                input: { color: "white" },
                label: { color: "#aaa" },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error.password}
              helperText={error.password}
              sx={{
                mb: 2,
                backgroundColor: "#333",
                input: { color: "white" },
                label: { color: "#aaa" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#aaa" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="filled"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!error.confirmPassword}
              helperText={error.confirmPassword}
              sx={{
                mb: 3,
                backgroundColor: "#333",
                input: { color: "white" },
                label: { color: "#aaa" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#aaa" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              size="large"
              sx={{
                mb: 2,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Sign Up
            </Button>
          </form>

          <Typography align="center" sx={{ color: "#aaa", mt: 2 }}>
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
  );
};

export default SignUpPage;
