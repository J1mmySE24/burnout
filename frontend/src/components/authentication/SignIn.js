import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useGoogleLogin } from "@react-oauth/google";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import Navbar from "../Navbar";
import useToken from "./useToken";
import { updateState } from "../../burnoutReducer";

function SignIn(props) {
  const history = useHistory();
  const defaultTheme = createTheme();
  const [loginForm, setloginForm] = useState({ email: "", password: "" });
  const { saveToken } = useToken();
  const [user, setUser] = useState([]); // state for Google login

  // Handle regular login
  function logMeIn(event) {
    event.preventDefault();

    axios({
      method: "POST",
      url: "/token",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((response) => {
        let logInState = {
          loggedIn: true,
          token: response.data.access_token,
        };
        props.dispatch(updateState(logInState));
        saveToken(response.data.access_token);
        history.push("/");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Login error:", error.response);
          // Show a toast message for invalid credentials
          if (error.response.data.message === "Invalid email or password") {
            toast.error("Invalid email or password");
          } else {
            toast.error("An error occurred. Please try again.");
          }
        }
      });

    setloginForm({ email: "", password: "" });
  }

  // Handle changes to login form fields
  function handleChange(event) {
    const { name, value } = event.target;
    setloginForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  // Handle Google login
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          // Directly use res.data for the Google login API call
          axios({
            method: "POST",
            url: "/google-login",
            data: {
              email: res.data.email,
              first_name: res.data.given_name,
              last_name: res.data.family_name,
            },
          })
            .then((response) => {
              let logInState = {
                loggedIn: true,
                token: response.data.access_token,
              };
              props.dispatch(updateState(logInState));
              saveToken(response.data.access_token);
              history.push("/");
            })
            .catch((error) => {
              if (error.response) {
                toast.error("Google login failed. Please try again.");
              }
            });
        })
        .catch((err) => console.error("Error fetching Google profile:", err));
    }
  }, [user, props, saveToken, history]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={logMeIn} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={loginForm.email}
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={loginForm.password}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Button onClick={login} fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
            Sign In With Google
          </Button>
        </Box>
        {/* ToastContainer for showing toasts */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
