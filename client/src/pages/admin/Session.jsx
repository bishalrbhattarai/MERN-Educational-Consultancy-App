import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import EventIcon from "@mui/icons-material/Event";

const Session = () => {
  const user = useSelector((state) => state.user.user);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const getMySessions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/admin/getallsession"
      );
      setSessions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMySessions();
  }, []);

  const handleViewDetails = (sessionId) => {
    navigate(`/admin/dashboard/session/${sessionId}`);
  };

  return (
    <Box
    //  m={3}
    >
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        All Sessions
      </Typography>

      <Grid container spacing={3}>
        {sessions.map((session) => (
          <Grid item key={session._id} xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                {session.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Duration: {session.duration} hours
              </Typography>
              <Typography variant="body1" gutterBottom>
                Start Date: {new Date(session.startDate).toLocaleDateString()}
                <IconButton>
                  <EventIcon />
                </IconButton>
              </Typography>
              <Typography variant="body1" gutterBottom>
                End Date: {new Date(session.endDate).toLocaleDateString()}
                <IconButton>
                  <EventIcon />
                </IconButton>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Status: {session.status}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Teacher: {session.teachersDetails.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Course Title: {session.coursesDetails.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Participants: {session.participants.length}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Rating:{" "}
                {session.rating.length > 0 ? (
                  <Rating
                    name="rating"
                    value={
                      session.rating.reduce((a, b) => a + b, 0) /
                      session.rating.length
                    }
                    precision={0.5}
                    readOnly
                  />
                ) : (
                  "No ratings"
                )}
              </Typography>

              <Button
                onClick={() => handleViewDetails(session._id)}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2, backgroundColor: "black" }}
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Session;
