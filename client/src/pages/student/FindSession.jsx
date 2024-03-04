import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  Button,
  Rating,
  Grid,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import esewaLogo from "../../images/only_e.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";

const FindSession = () => {
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const [sessionId, setSessionId] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [sessionsData, setSessionsData] = useState([]);
  const navigate = useNavigate();

  const getSessionsOfSpecificCourse = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/course/${id}/sessions`
      );
      setSessionsData(data);

      let enrolled = false;
      data.forEach((session) => {
        const check = session.participants.find(
          (par) => par.studentId.toString() === user._id.toString()
        );
        if (check) {
          console.log("the check value", check);
          enrolled = true;
          // If the user is enrolled in any session, you might want to break out of the loop here
          // depending on your requirement.
          return;
        }
      });
      setIsEnrolled(enrolled);
    } catch (error) {
      console.log("Something went wrong while fetching sessions", error);
    }
  };

  useEffect(() => {
    getSessionsOfSpecificCourse();
  }, []);

  const handleEnrollNow = async (sessionId, price) => {
    console.log(`Enrolling in session with ID: ${sessionId}`);
    console.log("student Id", user._id);
    console.log("course Id", id);
    console.log("price:", price);
    // return;
    try {
      const { data } = await axios.post(
        `http://localhost:3000/enrollment/createenrollment`,
        {
          studentId: user._id,
          courseId: id,
          sessionId: sessionId,
          amount: price,
        }
      );

      if (data.success) {
        handleEsewaCall(data.formData);
      } else {
        alert("Unable to Enroll check the console for error");
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEsewaCall = async (formData) => {
    console.log(formData);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  };

  const handleBack = () => {
    navigate("/student/dashboard/courses");
  };

  return (
    <>
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
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
      </Container>
      <Container
        mt={5}
        maxWidth="md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {sessionsData.length > 0 ? (
          sessionsData.map((session, index) => (
            <>
              <Card key={session._id} elevation={4} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                      <Typography
                        textAlign={"center"}
                        variant="h6"
                        gutterBottom
                      >
                        Teacher Details
                      </Typography>
                      <Grid
                        container
                        flexDirection={"column"}
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item>
                          <Avatar
                            alt={session.teachersDetails.name}
                            src={session.teachersDetails.photoURL}
                            sx={{ width: 100, height: 100 }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            textAlign={"center"}
                            variant="body1"
                            gutterBottom
                            sx={{ fontSize: "1.2rem" }}
                          >
                            Name: {session.teachersDetails.name}
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontSize: "1rem" }}
                          >
                            Email: {session.teachersDetails.email}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" gutterBottom>
                        Course Details
                      </Typography>
                      <Box>
                        <Typography variant="body1" gutterBottom>
                          Course Name: {session.coursesDetails.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{ fontSize: "1rem" }}
                        >
                          Short Description:{" "}
                          {session.coursesDetails.shortDescription}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{ fontSize: "1rem" }}
                        >
                          Complete Description:{" "}
                          {session.coursesDetails.completeDescription}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ fontSize: 20 }}
                          >
                            Price: Rs {session.coursesDetails.price}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h6" gutterBottom>
                        Session Details
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{ fontSize: "1rem" }}
                      >
                        Session Name: {session.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ fontSize: "1rem" }}
                      >
                        Duration: {session.duration} hours
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{ fontSize: "1rem" }}
                        >
                          Start Date:{" "}
                          {new Date(session.startDate).toLocaleDateString()}
                        </Typography>
                        <EventIcon
                          sx={{ fontSize: 20, marginLeft: 1, color: "primary" }}
                        />
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          sx={{ fontSize: "1rem" }}
                        >
                          End Date:{" "}
                          {new Date(session.endDate).toLocaleDateString()}
                        </Typography>
                        <EventIcon
                          sx={{ fontSize: 20, marginLeft: 1, color: "primary" }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ fontSize: "1rem" }}
                      >
                        Status: {session.status}
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ fontSize: "1rem" }}
                      >
                        Participants: {session.participants.length}
                        <IconButton
                          sx={{
                            color: "black",
                          }}
                        >
                          <SupervisedUserCircleIcon />
                        </IconButton>
                      </Typography>
                      <Box mt={1}>
                        <Rating
                          name="session-rating"
                          value={session.rating}
                          readOnly
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    disabled={isEnrolled}
                    sx={{
                      fontSize: "1.5rem",
                      backgroundColor: "white",
                      color: "black",
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }}
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      handleEnrollNow(session._id, session.coursesDetails.price)
                    }
                  >
                    {isEnrolled ? (
                      "Already Enrolled"
                    ) : (
                      <>
                        enroll via
                        <img
                          src={esewaLogo}
                          alt="ESEWA Logo"
                          style={{
                            marginLeft: 5,
                            marginRight: 3,
                            fontSize: "1.2rem",
                            backgroundColor: "white",
                            width: 30,
                            height: 30,
                          }}
                        />
                        Sewa
                      </>
                    )}
                  </Button>
                </CardActions>
                {index < sessionsData.length - 1 && <Divider />}
              </Card>
            </>
          ))
        ) : (
          <Typography variant="body1" align="center">
            No sessions to show.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default FindSession;
