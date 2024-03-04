import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user/index.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const theme = useTheme();
  const isScreenMd = useMediaQuery(theme.breakpoints.up("md"));
  const handleChange = (e) => {
    setErrors({});

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};
    for (let key in inputs) {
      if (inputs[key] == "") {
        errors[key] = `${key.charAt(0).toUpperCase()}${key.slice(1)} is empty`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/admin/login",
          inputs
        );
        const result = response.data;
        if (!result.success) {
          handleOpen();
        } else if (result.success) {
          dispatch(setUser(result));
          navigate("/admin/dashboard");
        }
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <>
      <Box
        component={Box}
        boxShadow={12}
        sx={{
          overflow: "hidden",
          margin: "50px auto",
          height: "290px",
          width: {
            md: "390px",
            xs: "330px",
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Admin Login</Typography>
        </Box>
        <TextField
          name="email"
          placeholder="Email"
          defaultValue={inputs.email}
          onChange={handleChange}
          sx={{
            width: "90%",
            margin: "15px 15px 10px 17px",
          }}
          size={isScreenMd ? "small" : "small"}
        />
        <Box sx={{ color: "red", marginLeft: "17px" }}> {errors.email}</Box>

        <TextField
          placeholder="Password"
          name="password"
          type="password"
          defaultValue={inputs.password}
          onChange={handleChange}
          sx={{
            width: "90%",
            margin: "15px 15px 10px 17px",
          }}
          size={isScreenMd ? "small" : "small"}
        />
        <Box sx={{ color: "red", marginLeft: "17px" }}> {errors.password}</Box>

        <Button
          size="large"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 18px",
            backgroundColor: "#000080",
            textTransform: "capitalize",
            fontSize: "18px",
          }}
          variant="contained"
          onClick={handleLogin}
        >
          Log in
        </Button>

        <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
        message="Something went wrong"
        autoHideDuration={3000}
      >
        <Alert
          sx={{
            width: "260px",
            fontSize: "17px",
            alignItems: "center",
          }}
          severity="error"
        >
          Login failed!
          {/* <IconButton>
            {" "}
            <CloseIcon size="small" />{" "}
          </IconButton> */}
          <IconButton sx={{ color: "red" }}>
            {" "}
            <CloseIcon size="small" />{" "}
          </IconButton>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
