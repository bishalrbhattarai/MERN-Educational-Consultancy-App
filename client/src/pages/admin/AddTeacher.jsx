import { Children, useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Avatar,
  Grid,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const AddTeacherForm = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [file, setFile] = useState({});
  const fileRef = useRef(null);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    for (let key in inputs) {
      if (inputs[key] == "") {
        errors[key] = `${key} is empty`;
      }
    }

    if (inputs.password != inputs.confirmPassword) {
      // setInputs({
      //   name: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // });

      setInputs({
        ...inputs,
        password: "",
        confirmPassword: "",
      });

      setSeverity("error");
      setMessage("Passwords are not same..");
      handleOpen();

      return;
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);

      return;
    } else {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:3000/admin/addteacher",
          { ...inputs, file: file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(data);
        if (data.success) {
          setLoading(false);
          setSeverity("success");
          setMessage(data.message);
          handleOpen();
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setSeverity("error");
        setMessage(error.response.data.message);
        handleOpen();
      }
    }
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <>
      {loading ? (
        <>
          <Box
            textAlign={"center"}
            sx={{
              marginTop: "100px",
              // width: "200px", height: "200px", mx: "auto"
            }}
          >
            <CircularProgress
              size={160}
              // disableShrink
            />
          </Box>
        </>
      ) : (
        <Container maxWidth="sm">
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography
              variant="h5"
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              Add Teacher
            </Typography>
          </Box>
          <Paper sx={{ p: 1.5, borderRadius: 4, boxShadow: 3 }}>
            <Box
              onClick={(e) => {
                fileRef.current.click();
              }}
              sx={{ display: "flex", justifyContent: "center", mb: 1 }}
            >
              <Avatar
                sx={{ width: 110, height: 110 }}
                src={file?.name ? URL.createObjectURL(file) : null}
                alt="Profile Image"
              >
                {file?.name ? null : <AddPhotoAlternateIcon />}
              </Avatar>

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                ref={fileRef}
              />
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={(e) => handleChange(e)}
                name="name"
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
              />
              <span style={{ color: "red" }}>{errors.name}</span>
              <TextField
                onChange={(e) => handleChange(e)}
                name="email"
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
              />
              <span style={{ color: "red" }}>{errors.email}</span>

              <TextField
                onChange={(e) => handleChange(e)}
                name="password"
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
              />
              <span style={{ color: "red" }}>{errors.password}</span>

              <TextField
                onChange={(e) => handleChange(e)}
                name="confirmPassword"
                fullWidth
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                type="password"
              />
              <span style={{ color: "red" }}>{errors.confirmPassword}</span>

              <Box mt={1}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  component="span"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ bgcolor: "black", color: "white" }}
                >
                  Add Teacher
                </Button>
              </Box>
            </form>
          </Paper>

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
      )}
    </>
  );
};

export default AddTeacherForm;
