import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [severity, setSeverity] = useState("warning");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [mainError, setMainError] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      currentPassword == "" ||
      newPassword == "" ||
      confirmNewPassword == ""
    ) {
      if (currentPassword == "") {
        setErrorCurrentPassword("Current Password is empty");
      }

      if (newPassword == "") {
        setErrorNewPassword("New Password is empty");
      }

      if (confirmNewPassword == "") {
        setErrorConfirmPassword("Confirm Password is empty");
      }
    } else {
      if (newPassword != confirmNewPassword) {
        setMainError("New password and Confirm New Password are not same");
        return;
      } else {
        try {
          const { data } = await axios.post(
            "http://localhost:3000/student/changepassword",
            {
              _id: user._id,
              currentPassword: currentPassword,
              newPassword: newPassword,
              confirmNewPassword: confirmNewPassword,
            }
          );

          if (data.success) {
            navigate("/student/dashboard");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }, [severity, message]);

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        color: "black",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        variant="h4"
      >
        <Box> Change Password </Box>
        {/* <IconButton> */}
        <IconButton>
          <VpnKeyIcon
            sx={{
              color: "black",
              fontSize: 36,
            }}
          />
        </IconButton>
        {/* </IconButton> */}
      </Typography>
      <form onSubmit={handleSubmit} sx={{ width: "100%", mt: 3 }}>
        <TextField
          variant="outlined"
          margin="normal"
          //   required
          fullWidth
          id="currentPassword"
          label="Current Password"
          type="password"
          defaultValue={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <span style={{ color: "red" }}> {errorCurrentPassword}</span>
        <TextField
          variant="outlined"
          margin="normal"
          //   required
          fullWidth
          id="newPassword"
          label="New Password"
          type="password"
          defaultValue={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <span style={{ color: "red" }}>{errorNewPassword}</span>
        <TextField
          variant="outlined"
          margin="normal"
          //   required
          fullWidth
          id="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          defaultValue={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <span style={{ color: "red" }}>{errorConfirmPassword}</span>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, backgroundColor: "black", mb: 2 }}
          endIcon={<LockIcon />}
        >
          Change Password
        </Button>
        <span
          style={{
            fontSize: "18px",
            color: "red",
          }}
        >
          {mainError}
        </span>
      </form>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        message="Something went wrong"
        autoHideDuration={2000}
        sx={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Alert
          sx={{
            width: "320px",
            fontSize: "17px",
            alignItems: "center",
            backgroundColor: "black",
            color: "white",
          }}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ChangePassword;
