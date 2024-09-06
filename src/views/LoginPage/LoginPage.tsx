import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  // Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import GoogleButton from "react-google-button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  loginWithEmailAndPassword
} from "../../services/firebaseAuthServices";
import { getErrorMessage } from "../../utils/errorMapper";
import { Copyright } from "./components/Copyright";
import { ForgotPasswordModal } from "./components/ForgotPasswordModal";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await loginWithEmailAndPassword({ email, password });

      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (e: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: getErrorMessage(e.code),
        confirmButtonColor: "#0A7123",
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLoginClicked = () => {
  //   try {
  //     loginWithGoogle();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="mt-16 flex flex-col items-center">
          <Avatar className="m-2 !bg-primary">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            className="mt-2"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-primary !mt-6 !mb-4"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} className="!text-white" />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/login"
                  onClick={ForgotPasswordModal}
                  className="text-gray-500 hover:text-black transition ease-in-out duration-300 !underline "
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="/register"
                  className="text-gray-500 hover:text-black transition ease-in-out duration-300 underline "
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>

            {/* <div className="my-6">
              <Divider flexItem>Or</Divider>
            </div>

            <Box className="flex justify-center">
              <GoogleButton onClick={handleGoogleLoginClicked} />
            </Box> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
