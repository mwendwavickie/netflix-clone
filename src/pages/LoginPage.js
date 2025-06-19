import React, {useState} from "react";
import { Container, Box, Button, TextField, Typography, Link, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext"

const LoginPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] =  useState({ email:"", password:""});

    const validate = () => {
        const newError = {};
        if (!email.includes("@")) newError.email = "Invalid email address";
        if (password.length < 6) newError.password = "Password must be at least 6 characters";
        setError(newError);
        return Object.keys(newError).length === 0;
      };

    const handleLogin = async(e) => {
        e.preventDefault();
        if (!validate()) return;

        try{
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
                backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9))`,
                backgroundColor: "#141414",
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
            Login
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
                        my: 2,
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
                    sx={{ mb: 2 }}
                >
                    Login
                </Button>
            </form>
                    <Typography align="center" sx={{ color: "#aaa" }}>
                    Don't have an account?{" "}
                        <Link
                        underline="hover"
                        sx={{ color: "#f44336", cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                        >
                            SignUp
                        </Link>
                    </Typography>

            </Paper>
        </Container>
    </Box>

    )
}
export default LoginPage;

