import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  SpeedDial,
  SpeedDialIcon,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CoursesPage = () => {
  const [pageSize, setPageSize] = useState(5);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getAllCourses = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/course/allcourses"
      );
      console.log(data);

      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const columns = [
    { field: "title", headerName: "Title", width: 250 },
    { field: "teacherName", headerName: "Teacher", width: 180 },
    {
      field: "teacherAvatar",
      headerName: " Avatar",
      width: 150,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt="Teacher Avatar"
          sx={{
            width: 40,
            height: 40,
          }}
        />
      ),
    },
    { field: "shortDescription", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price (RS)", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <strong>
          <Button
            onClick={() => navigate(`/admin/dashboard/course/${params.row.id}`)}
            variant="contained"
            // color="primary"
            sx={{ backgroundColor: "black" }}
          >
            <VisibilityIcon />
          </Button>
        </strong>
      ),
    },
  ];

  const rows = courses.map((course, index) => ({
    id: course._id,
    title: course.title,
    teacherName: course.teachersDetails.name,
    teacherAvatar: course.teachersDetails.photoURL,
    shortDescription: course.shortDescription,
    price: course.price,
  }));

  return (
    <Box p={2}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={1}>
        All Courses
      </Typography>

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
          pageSize={10}
          checkboxSelection={false}
          disableSelectionOnClick
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>

      <Box
        sx={{
          position: "fixed",
          bottom: 50,
          right: 50,
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
          onClick={() => navigate("/admin/dashboard/addcourse")}
          tooltipTitle="Add Course"
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon />}
        />
      </Box>
    </Box>
  );
};

export default CoursesPage;
