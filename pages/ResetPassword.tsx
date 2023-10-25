import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import {
  Link as Anchor,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, LoadingButton } from "@mui/lab";
import { resetPassword, resetPasswordSendEmail, singIn } from "../apis/auth";
import { useAuth } from "../core/auth/AuthProvider";
import { useState } from "react";
import { OutlinedInput } from "@mui/material";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function ResetPassword() {
  const [loading, setLoading] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [searchParams] = useSearchParams();
  const [token] = useState(searchParams.get("token"));
  const [newPass, setNewPass] = useState("");
  const [newPassRepeated, setNewPassRepeated] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    const res = await resetPasswordSendEmail(data.get("email") as string);
    setLoading(false);
    setEmailSent(true);
  };

  const submitNewPassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    const res = await resetPassword(token as string, newPass);
    setLoading(false);
    setEmailSent(true);
    navigate("/sign-in");
  };

  if (token) {
    return (
      <div>
        <ThemeProvider theme={defaultTheme}>
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
              <React.Fragment>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>

                <Box
                  component="form"
                  onSubmit={submitNewPassword}
                  noValidate
                  sx={{ mt: 1 }}
                  autoComplete="off"
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={newPass}
                    autoComplete="current-password"
                    onChange={(evt) => setNewPass(evt.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Repeat Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={newPassRepeated}
                    error={newPass !== newPassRepeated}
                    helperText={
                      newPass !== newPassRepeated
                        ? "repeated password is not equal to password"
                        : null
                    }
                    onChange={(evt) => setNewPassRepeated(evt.target.value)}
                  />
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={loading}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Reset Password
                  </LoadingButton>
                </Box>
              </React.Fragment>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
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
          {!emailSent ? (
            <React.Fragment>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send Email
                </LoadingButton>
              </Box>
            </React.Fragment>
          ) : (
            <Alert severity="info">
              <Typography align="center" fontWeight={500}>
                if you've sign up before an email will be sent to your inbox to
                reset your password.
              </Typography>
            </Alert>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
