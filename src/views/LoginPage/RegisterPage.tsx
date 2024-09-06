import { ThemeProvider } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerWithEmailAndPassword } from "../../services/firebaseAuthServices";
import { getErrorMessage } from "../../utils/errorMapper";
import { Copyright } from "./components/Copyright";

const defaultTheme = createTheme();

type RoleType = "buyer" | "seller";

export default function SignUp() {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState<RoleType | "">("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowRePassword = () => setShowRePassword(!showRePassword);
  const handleMouseDownRePassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (role == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Role cannot be empty",
        confirmButtonColor: "#0A7123",
        timer: 3000,
        timerProgressBar: true,
      });
      setLoading(false);
      return;
    }

    if (password != rePassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password does not match with retyped password",
        confirmButtonColor: "#0A7123",
        timer: 3000,
        timerProgressBar: true,
      });
      setLoading(false);
      return;
    }

    try {
      await registerWithEmailAndPassword({
        email,
        password,
        displayName,
        role,
      });

      navigate("/login");

      Swal.fire({
        icon: "success",
        text: "Account Created Successfully. Please login with your credentials",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        position: "top-end",
        toast: true,
      });
    } catch (e: any) {
      Swal.fire({
        icon: "error",
        text: "Error: " + getErrorMessage(e.code),
        timer: 5000,
        timerProgressBar: true,
        position: "top-end",
        toast: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="mt-16 flex flex-col items-center">
          <Avatar className="m-2 !bg-primary">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            className="mt-6"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="displayName"
                  required
                  fullWidth
                  id="displayName"
                  label="Full Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="rePassword"
                  label="Retype Password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  type={showRePassword ? "text" : "password"}
                  id="rePassword"
                  autoComplete="new-rePassword"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowRePassword}
                          onMouseDown={handleMouseDownRePassword}
                          edge="end"
                        >
                          {showRePassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">
                    Select Role
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Select Role"
                    onChange={(e) => setRole(e.target.value as RoleType)}
                  >
                    <MenuItem value={"buyer"}>Buyer</MenuItem>
                    <MenuItem value={"seller"}>Seller</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!mt-6 !mb-4 !bg-primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} className="!text-white" />
              ) : (
                "Sign Up"
              )}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-black transition ease-in-out duration-300 underline"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
