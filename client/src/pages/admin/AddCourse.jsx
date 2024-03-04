import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Alert,
  Snackbar,
} from "@mui/material";

const AddCourse = () => {
  const [teachers, setTeachers] = useState([]);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [completeDescription, setCompleteDescription] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCourse = async () => {
    // Basic validation

    // Create a new course object
    const newCourse = {
      title: title,
      shortDescription: shortDescription,
      completeDescription: completeDescription,
      teacherId: selectedTeacher, // Include the selected teacher
      price: price,
    };
    console.log(newCourse);

    const { data } = await axios.post(
      "http://localhost:3000/course/createcourse",
      newCourse
    );

    if (data.success) {
    }
    setTitle("");
    setShortDescription("");
    setCompleteDescription("");
    setSelectedTeacher("");
    setPrice(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getAllTeachers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/course/getallteachers"
      );
      setTeachers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  return (
    <Box mt={1}>
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

      <Typography variant="h4" fontWeight={"bold"} gutterBottom>
        Add New Course
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Short Description"
            multiline
            rows={2}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Complete Description"
            multiline
            rows={5}
            value={completeDescription}
            onChange={(e) => setCompleteDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            multiline
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="teacher-select-label">Select Teacher</InputLabel>
            <Select
              variant="filled"
              placeholder="Select teacher"
              //   labelId="teacher-select-label"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              {teachers?.map((teacher, index) => (
                <MenuItem key={index} value={teacher._id}>
                  {teacher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
            }}
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddCourse;
