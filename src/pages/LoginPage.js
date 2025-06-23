import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });

  const validate = () => {
    const newError = {};
    if (!email.includes("@")) newError.email = "Invalid email address";
    if (password.length < 6)
      newError.password = "Password must be at least 6 characters";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError({ email: "User not found" });
      } else if (err.code === "auth/wrong-password") {
        setError({ password: "Incorrect password" });
      } else {
        alert("Login failed: " + err.message);
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
        background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,1))",
        backgroundColor: "#141414",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            background: "rgba(28,28,28,0.95)",
            backdropFilter: "blur(6px)",
            borderRadius: 2,
            boxShadow: "0 0 12px rgba(0,0,0,0.5)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: "white",
              fontWeight: "bold",
              textShadow: "1px 1px 4px rgba(255,0,0,0.3)",
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            align="center"
            variant="subtitle2"
            sx={{ color: "#ccc", mb: 3 }}
          >
            Log in to continue watching your favorites
          </Typography>

          <form onSubmit={handleLogin}>
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
              type="password"
              fullWidth
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error.password}
              helperText={error.password}
              sx={{
                mb: 3,
                backgroundColor: "#333",
                input: { color: "white" },
                label: { color: "#aaa" },
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
                letterSpacing: 0.5,
              }}
            >
              Sign In
            </Button>
          </form>

          <Typography align="center" sx={{ color: "#aaa" }}>
            Don&apos;t have an account?{" "}
            <Link
              underline="hover"
              sx={{ color: "#f44336", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
