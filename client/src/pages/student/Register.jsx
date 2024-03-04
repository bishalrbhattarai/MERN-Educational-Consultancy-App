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
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import OAuth from "../../components/OAuth";
import axios from "axios";
const registerButtonDesign = {
  width: "90%",
  margin: "15px 15px 10px 18px",
  backgroundColor: "red",
  textTransform: "capitalize",
  fontSize: "18px",
  "&:hover": {
    backgroundColor: "#000080",
  },
};

import { useNavigate } from "react-router-dom";
const Register = () => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const theme = useTheme();
  const isScreenMd = useMediaQuery(theme.breakpoints.up("md"));
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = async (e) => {
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
          "http://localhost:3000/student/register",
          inputs
        );
        const result = response.data;
        if (result.success) {
          navigate("/student/login");
        } else {
          setMessage(result.message);
          setSeverity("error");

          handleOpen();
          setInputs({});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (severity == "error") {
      setInputs({});
    }
  }, [severity]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert
          sx={{
            width: "260px",
            fontSize: "17px",
            alignItems: "center",
          }}
          severity={severity}
        >
          {message}
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
      <Box
        component={Box}
        boxShadow={12}
        sx={{
          margin: "60px auto",
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
          <Typography variant="h4">Student Register</Typography>
        </Box>
        <TextField
          name="name"
          onChange={handleChange}
          defaultValue={inputs.name}
          placeholder="Name"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 17px",
          }}
        />
        <Box sx={{ color: "red", marginLeft: "17px" }}> {errors.name}</Box>
        <TextField
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={inputs.email}
          sx={{
            width: "90%",
            margin: "15px 15px 10px 17px",
          }}
          size={isScreenMd ? "small" : "small"}
        />
        <Box sx={{ color: "red", marginLeft: "17px" }}> {errors.email}</Box>

        <TextField
          onChange={handleChange}
          name="password"
          defaultValue={inputs.password}
          type="password"
          placeholder="Password"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 17px",
          }}
          size={isScreenMd ? "small" : "small"}
        />
        <Box sx={{ color: "red", marginLeft: "17px" }}> {errors.password}</Box>

        <Button
          onClick={handleRegister}
          size="large"
          sx={registerButtonDesign}
          variant="contained"
        >
          Register
        </Button>

        <OAuth />
        <Button
          sx={{
            display: "block",
            width: "50%",
            textTransform: "capitalize",
            color: "#000080",
            // color: "black",
            marginLeft: "auto",
            marginRight: "auto",
            cursor: "default",
          }}
        >
          Already have an account ?
        </Button>
        <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
        <Link
          sx={{ textDecoration: "none" }}
          style={{ textDecoration: "none" }}
          to="/student/login"
        >
          <Button
            boxShadow={3}
            variant="contained"
            sx={{
              backgroundColor: "#32CD32",
              width: "40%",
              padding: 1,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "5px",
              marginBottom: "10px",
              textTransform: "capitalize",
              textDecoration: "none",
            }}
          >
            Log in
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Register;
