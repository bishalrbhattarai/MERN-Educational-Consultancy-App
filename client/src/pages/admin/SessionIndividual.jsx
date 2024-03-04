import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Rating,
  Grid,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import EventIcon from "@mui/icons-material/Event";
import MoneyIcon from "@mui/icons-material/Money";
import { green, red } from "@mui/material/colors";

const SessionPage = () => {
  const { id } = useParams();
  const [sessionData, setSessionData] = useState({});

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/session/detail/${id}`
        );
        setSessionData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCourseData();
  }, [id]);

  return Object.keys(sessionData).length > 0 ? (
    <Container maxWidth="md" sx={{ textAlign: "center", paddingTop: 1 }}>
      <Paper elevation={12} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Session Name: {sessionData.name}
        </Typography>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6}>
            <img
              src={sessionData.teachersDetails.photoURL}
              alt={sessionData.teachersDetails.name}
              style={{
                maxWidth: "100%",
                height: "auto",
                marginBottom: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Teacher Name: {sessionData.teachersDetails.name}
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              Teacher Email: {sessionData.teachersDetails.email}
            </Typography>
            <Typography variant="subtitle1">
              Duration: {sessionData.duration} days
            </Typography>
            <Typography variant="subtitle1">
              Start Date: {new Date(sessionData.startDate).toLocaleDateString()}
              <IconButton color="primary" aria-label="date">
                <EventIcon />
              </IconButton>
            </Typography>
            <Typography variant="subtitle1">
              End Date: {new Date(sessionData.endDate).toLocaleDateString()}
              <IconButton color="primary" aria-label="date">
                <EventIcon />
              </IconButton>
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Short Description: {sessionData.coursesDetails.shortDescription}
            </Typography>
            <Typography variant="body1">
              Complete Description:{" "}
              {sessionData.coursesDetails.completeDescription}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Price: Rs {sessionData.coursesDetails.price}
              <IconButton color="primary" aria-label="money">
                <MoneyIcon style={{ color: green[500] }} />
              </IconButton>
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              Status: {sessionData.status}
              {sessionData.status === "upcoming" ? (
                <IconButton color="primary" aria-label="status">
                  <EventIcon style={{ color: red[500] }} />
                </IconButton>
              ) : null}
            </Typography>
          </Grid>
        </Grid>
        <Box
          //  marginTop={1}
          textAlign="left"
        >
          <Typography variant="subtitle1">
            Participants: {sessionData.participants.length}
          </Typography>
          <Box display="flex" alignItems="center" marginTop={1}>
            <Typography variant="subtitle1" marginRight={1}>
              Rating:
            </Typography>
            <Rating
              name="rating"
              value={
                sessionData.rating.length > 0
                  ? sessionData.rating.reduce((a, b) => a + b, 0) /
                    sessionData.rating.length
                  : 0
              }
              precision={0.5}
              readOnly
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  ) : null;
};

export default SessionPage;
