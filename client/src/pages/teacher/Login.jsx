import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { setUser } from "../../redux/slices/user";
const Login = () => {
  const theme = useTheme();
  const isScreenMd = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    setErrors({});
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
          "http://localhost:3000/teacher/login",
          inputs
        );
        const data = response.data;
        if (!data.success) {
          setSeverity("error");
          setMessage(data.message);
          return handleOpen();
        }
        if (data.success) {
          dispatch(setUser(data));
          navigate("/teacher/dashboard");
        }

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          paddingTop: "10px",
          margin: "40px auto 0px auto ",
          height: "auto",
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
          <Typography variant="h4">Teacher Login</Typography>
        </Box>
        <TextField
          name="email"
          onChange={handleChange}
          placeholder="Email"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 17px",
          }}
          size={isScreenMd ? "small" : "small"}
        />
        <Box sx={{ color: "red", marginLeft: "17px" }}> {errors.email}</Box>

        <TextField
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 17px",
          }}
          size={isScreenMd ? "small" : "small"}
        />
        <Box sx={{ color: "red", marginLeft: "17px" }}> {errors.password}</Box>

        <Button
          onClick={handleLogin}
          size="large"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 18px",
            backgroundColor: "#000080",
            textTransform: "capitalize",
            fontSize: "18px",
          }}
          variant="contained"
        >
          Log in
        </Button>

        <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert
          sx={{
            textAlign: "center",
            width: "320px",
            fontSize: "17px",
            alignItems: "center",
          }}
          severity={severity}
        >
          {message}

          <IconButton sx={{ color: "red" }}>
            <CloseIcon size="small" />
          </IconButton>
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
