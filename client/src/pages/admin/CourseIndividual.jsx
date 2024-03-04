import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const CoursePage = () => {
  const { id } = useParams();
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

  return (
    <Box py={4}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Course Detail
        </Typography>

        {Object.keys(courseData).length > 0 ? (
          <Card sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              image={courseData.teachersDetails.photoURL}
              alt={courseData.teachersDetails.name}
              style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {courseData.title}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body1">Teacher:</Typography>
                <Typography variant="body1">
                  {courseData.teachersDetails.name}
                </Typography>
              </Stack>
              <Divider light />
              <Typography variant="body1" paragraph>
                Price: Rs {courseData.price}
              </Typography>
              <Typography variant="body2" paragraph>
                {courseData.shortDescription}
              </Typography>
              <Typography variant="body2" paragraph>
                {courseData.completeDescription}
              </Typography>
            </CardContent>
          </Card>
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
