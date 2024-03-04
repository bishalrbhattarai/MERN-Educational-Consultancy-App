import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  Box,
  SpeedDial,
  SpeedDialIcon,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Session = () => {
  const [pageSize, setPageSize] = useState(5);
  const user = useSelector((state) => state.user.user);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const getMySessions = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/teacher/getallsession",
        {
          _id: user._id,
        }
      );
      setSessions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMySessions();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "Session_ID", width: 220 },
    { field: "name", headerName: "Session Name", width: 150 },
    { field: "duration", headerName: "Duration", width: 120 },
    { field: "startDate", headerName: "Start Date", width: 100 },
    { field: "endDate", headerName: "End Date", width: 100 },
    { field: "status", headerName: "Status", width: 90 },
    { field: "courseTitle", headerName: "Course Title", width: 100 },
    { field: "participants", headerName: "Participants", width: 100 },
    { field: "rating", headerName: "Rating", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ backgroundColor: "black" }}
          startIcon={<VisibilityIcon />}
          onClick={() => handleViewDetails(params.row.id)}
        >
          View
        </Button>
      ),
    },
  ];

  // Format sessions data for the DataGrid
  const rows = sessions.map((session) => ({
    id: session._id,
    name: session.name,
    duration: session.duration,
    startDate: new Date(session.startDate).toLocaleDateString(),
    endDate: new Date(session.endDate).toLocaleDateString(),
    status: session.status,
    courseTitle: session.coursesDetails.title,
    participants: session.participants.length,
    rating: session.rating.length > 0 ? session.rating : "No ratings!",
  }));

  const handleViewDetails = (sessionId) => {
    // Handle view details action
    navigate(`/teacher/dashboard/session/${sessionId}`);
  };

  return (
    <>
      <Typography fontWeight="bold" variant="h4" textAlign="center">
        My Sessions
      </Typography>

      <Box
        sx={{
          position: "absolute",
          bottom: 60,
          right: 66,
        }}
      >
        <SpeedDial
          FabProps={{
            sx: {
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "black",
              },
            },
          }}
          onClick={(e) => {
            navigate("/teacher/dashboard/addsession");
          }}
          tooltipTitle="Add Teacher"
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon />}
        ></SpeedDial>
      </Box>

      {/* Display session details using DataGrid */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize,
                onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
              },
            },
          }}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          disableSelectionOnClick={true}
        />
      </div>
    </>
  );
};

export default Session;
