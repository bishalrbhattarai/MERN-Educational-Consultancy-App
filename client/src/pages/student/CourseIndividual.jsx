import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({});

  const getCourseData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/course/detail/${id}`
      );
      setCourseData(data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const handleBack = () => {
    navigate("/student/dashboard/courses");
  };

  return (
    <Box py={4}>
      <Container maxWidth="md">
        {Object.keys(courseData).length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8}>
              <Paper elevation={6} sx={{ p: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <IconButton
                    onClick={handleBack}
                    sx={{
                      backgroundColor: "black",
                      color: "white",

                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Box>
                <Typography textAlign={"center"} variant="h5" gutterBottom>
                  Course Name: {courseData.title}
                </Typography>
                <Box textAlign="center">
                  <Typography variant="body1" gutterBottom>
                    Teacher Name: {courseData.teachersDetails.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Teacher Email: {courseData.teachersDetails.email}
                  </Typography>
                  <Avatar
                    src={courseData.teachersDetails.photoURL}
                    alt={courseData.teachersDetails.name}
                    sx={{
                      width: 100,
                      height: 100,
                      marginBottom: 2,
                      mx: "auto",
                    }}
                  />
                  <Typography variant="body1" gutterBottom>
                    Price: Rs {courseData.price}
                    <Divider />
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Short Description: {courseData.shortDescription}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Complete Description: {courseData.completeDescription}
                  </Typography>
                  <Grid container justifyContent="center">
                    <Grid item xs={12} md={6}>
                      <Button
                        variant="contained"
                        component={Link}
                        to={`/student/dashboard/course/${id}/sessions`}
                        fullWidth
                        sx={{ backgroundColor: "#000", color: "#fff" }}
                      >
                        Find Sessions
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default CoursePage;
