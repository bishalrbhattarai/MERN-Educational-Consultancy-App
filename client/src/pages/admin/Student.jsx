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
  SpeedDial,
  SpeedDialIcon,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";

import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
const actions = [{ icon: <SaveIcon />, name: "Add Teacher" }];

const Teacher = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const [students, setStudents] = useState([]);
  const getAllStudents = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/admin/students");
      setStudents(data);
    } catch (err) {
      console.log("something went wrong");
      console.log(err);
    }
  };
  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", mt: 3, mb: 3 }}
          variant="h4"
        >
          All Students
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
              renderCell: (params) => <Avatar src={params.row.photoURL} />,
              sortable: false,
              filterable: false,
            },
            { field: "name", headerName: "Name", width: 190 },
            { field: "email", headerName: "Email", width: 270 },
            { field: "type", headerName: "Role", width: 150 },
            {
              field: "createdAt",
              headerName: "Created At",
              width: 180,
              renderCell: (params) =>
                moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            },
            { field: "_id", headerName: "Id", width: 220 },
            {
              headerName: "Action",
              width: 120,
              renderCell: (params) => (
                <DeleteForeverIcon
                  onClick={async (e) => {
                    const { data } = await axios.post(
                      "http://localhost:3000/admin/deletestudent",
                      {
                        _id: params.row._id,
                      }
                    );
                    setStudents(data);
                  }}
                  sx={{ color: "red" }}
                />
              ),
            },
          ]}
          rows={students}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>

      {/* <Box
        sx={{
          // backgroundColor: "gray",
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
            navigate("/admin/dashboard/addteacher");
          }}
          tooltipTitle="Add Teacher"
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon />}
        ></SpeedDial>
      </Box> */}
    </>
  );
};

export default Teacher;
