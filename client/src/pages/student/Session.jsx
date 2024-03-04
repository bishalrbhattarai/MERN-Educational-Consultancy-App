import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Session = () => {
  const user = useSelector((state) => state.user.user);
  const [mySessions, setMySessions] = useState([]);

  const getMySessions = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/student/getmysessions",
        {
          studentId: user._id,
        }
      );
      setMySessions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMySessions();
  }, []);

  const handleExitSession = (sessionId) => {
    // Implement your logic to exit from the session
    console.log(`Exiting session with ID: ${sessionId}`);
  };
  const handleBack = () => {};

  return (
    <>
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

      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            My Sessions
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {mySessions.map((session) => (
            <Grid item xs={12} key={session._id}>
              <Card>
                <CardContent
                  sx={{
                    width: "100%",
                    fontSize: "1rem", // Adjust the font size as needed
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="h6" gutterBottom>
                        Session Details
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Name: {session.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Start Date:{" "}
                        {new Date(session.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        End Date:{" "}
                        {new Date(session.endDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Status: {session.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6" gutterBottom>
                        Course Details
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Title: {session.courseDetails.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Description: {session.courseDetails.completeDescription}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price: {session.courseDetails.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h6" gutterBottom>
                        Teacher Details
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Name: {session.teacherDetails.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Email: {session.teacherDetails.email}
                      </Typography>
                      <Avatar
                        alt={session.teacherDetails.name}
                        src={session.teacherDetails.photoURL}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      // fontSize: "1.2rem", // Adjust the font size as needed
                      mt: 2,
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                        elevation: 2,
                      }, // Add margin top for spacing
                    }}
                    onClick={() => handleExitSession(session._id)}
                  >
                    Exit from Session
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Session;
