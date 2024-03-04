import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  SpeedDial,
  Box,
  Paper,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getAllCourse = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/course/allcourses"
      );
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value.trim());
  };

  const getFilteredData = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/course/search", {
        search,
      });
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourse();
  }, []);

  useEffect(() => {
    if (search !== "") {
      getFilteredData();
    } else {
      getAllCourse();
    }
  }, [search]);

  return (
    <>
      <Typography fontWeight={"bold"} variant="h4" textAlign={"center"}>
        All Courses
      </Typography>
      <Box textAlign="right" mb={2}>
        <TextField
          onChange={handleChange}
          placeholder="Search Course...."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 50,
            },
          }}
          variant="outlined"
        />
      </Box>

      <Grid container spacing={3}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={course._id}>
              <Paper elevation={8}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    <Avatar src={course.teachersDetails.photoURL}> T </Avatar>
                    Teacher: {course.teachersDetails.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Course Price: Rs {course.price}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    gutterBottom
                  >
                    {course.shortDescription}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      onClick={() => {
                        navigate(`/student/dashboard/course/${course._id}`);
                      }}
                      variant="contained"
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={400}
            >
              <Typography variant="h5" textAlign="center">
                No Data to Show !!
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CoursesPage;
