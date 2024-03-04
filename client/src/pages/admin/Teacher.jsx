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

const Teacher = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const [teachers, setTeachers] = useState([]);
  const getAllTeachers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/admin/teachers");
      setTeachers(data);
    } catch (err) {
      console.log("something went wrong");
      console.log(err);
    }
  };
  useEffect(() => {
    getAllTeachers();
  }, []);
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", mt: 3, mb: 3 }}
          variant="h4"
        >
          All Teachers
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
            { field: "name", headerName: "Name", width: 170 },
            { field: "email", headerName: "Email", width: 200 },
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
              field: "actions",
              headerName: "Action",
              width: 120,
              renderCell: (params) => (
                <DeleteForeverIcon
                  onClick={async (e) => {
                    const { data } = await axios.post(
                      "http://localhost:3000/admin/deleteteacher",
                      {
                        _id: params.row._id,
                      }
                    );
                    setTeachers(data);
                  }}
                  size="large"
                  sx={{ color: "red" }}
                />
              ),
            },
          ]}
          rows={teachers}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>

      <Box
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
      </Box>
    </>
  );
};

export default Teacher;
