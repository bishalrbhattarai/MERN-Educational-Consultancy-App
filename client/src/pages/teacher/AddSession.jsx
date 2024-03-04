import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const SessionForm = () => {
  const user = useSelector((state) => state.user.user);

  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    startDate: "",
    endDate: "",
    courseId: "",
    status: "upcoming",
    teacherId: user._id,
  });

  // Sample array of course names

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/teacher/createsession",
        formData
      );
      if (data.success) {
        setFormData({
          name: "",
          duration: "",
          startDate: "",
          endDate: "",
          courseId: "",
          status: "upcoming",
          teacherId: user._id,
        });
        setSeverity("success");
        setMessage(data.message);
        handleOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCoursesDetail = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/teacher/mycourses",
        {
          _id: user._id,
        }
      );
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoursesDetail();
  }, []);

  return (
    <>
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

      <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
        <Typography variant="h5" fontWeight={"bold"} gutterBottom>
          Add Session Detail
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* First Row */}
            <Grid item xs={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Course Name"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              >
                {courses.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Second Row */}
            <Grid item xs={6}>
              <TextField
                label="Duration (hours)"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              >
                {["upcoming", "ongoing", "completed", "cancelled"].map(
                  (status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            {/* Third Row */}
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "black" }}
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default SessionForm;
