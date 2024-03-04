import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";

import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
const actions = [{ icon: <SaveIcon />, name: "Add Teacher" }];
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";

const Teacher = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [pageSize, setPageSize] = useState(5);
  const [teachers, setTeachers] = useState([]);
  const getMyTeachers = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/student/getmyteachers",
        {
          studentId: user._id,
        }
      );
      console.log("the teacher Data");
      console.log(data);
      setTeachers(data);
    } catch (err) {
      console.log("something went wrong");
      console.log(err);
    }
  };
  useEffect(() => {
    getMyTeachers();
  }, []);
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", mt: 3, mb: 3 }}
          variant="h4"
        >
          My Teachers
        </Typography>
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize,
                onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
              },
            },
          }}
          columns={[
            {
              field: "photoURL",
              headerName: "Avatar",
              width: 100,
              renderCell: (params) => (
                <Avatar src={params.row.teacherDetails.photoURL} />
              ),
              sortable: false,
              filterable: false,
            },
            {
              field: "name",
              headerName: "Name",
              width: 170,
              valueGetter: (params) => params.row.teacherDetails.name,
            },
            {
              field: "email",
              headerName: "Email",
              width: 200,
              valueGetter: (params) => params.row.teacherDetails.email,
            },
            {
              field: "type",
              headerName: "Role",
              width: 150,
              valueGetter: (params) => params.row.teacherDetails.type,
            },
            {
              field: "createdAt",
              headerName: "Created At",
              width: 180,
              valueGetter: (params) =>
                moment(params.row.teacherDetails.createdAt).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
            },
            {
              field: "_id",
              headerName: "Id",
              width: 220,
              valueGetter: (params) => params.row.teacherDetails._id,
            },
            {
              field: "actions",
              headerName: "Action",
              width: 120,
              renderCell: (params) => (
                <RemoveRedEyeIcon
                  size="large"
                  sx={{ color: "black", fontSize: "30px" }}
                />
              ),
            },
          ]}
          rows={teachers}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>
    </>
  );
};

export default Teacher;
