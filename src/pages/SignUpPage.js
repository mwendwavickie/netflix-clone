import React, {useState} from "react";
import {Box, Container, Typography, TextField, Button, Link, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({email: "", password: "", confirmPassword: ""});

    const validate = () => {
      const err = {};
      if (!email.includes("@")) err.email = "Invalid email address";
      if (password.length < 6) err.password = "Password too short";
      if (password !== confirmPassword) err.confirmPassword = "Passwords do not match";
      setError(err);
      return Object.keys(err).length === 0;
    }

    const handleSignup = async(e) => {
      e.preventDefault();
      if (!validate()) return;
            
            // TODO: Add Firebase or backend signup logic here
            try{
              await createUserWithEmailAndPassword(auth, email, password);
              navigate("/");
            }catch (err){
              if (err.code === "auth/email-already-in-use") {
                setError({ email: "Email already in use"});
              }else {
                alert("Signup failed: " + err.message);
              }
            }
          }
            
          if (user) {
            navigate("/");
            return null;
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
              error={!!error.email}
              helperText={error.email}
              sx={{ my: 2, backgroundColor: "#333", input: { color: "white" }, label: { color: "#aaa" } }}
              
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
              sx={{ my: 2, backgroundColor: "#333", input: { color: "white" }, label: {color:"#aaa"} }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              variant="filled"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!error.confirmPassword}
              helperText={error.confirmPassword}
              sx={{ my: 2, backgroundColor: "#333", input: { color: "white" }, label: { color: "#aaa"} }}
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