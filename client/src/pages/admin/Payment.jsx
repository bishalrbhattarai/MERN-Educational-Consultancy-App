import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, Typography } from "@mui/material";
import esewa from "../../images/only_e.png";

const Payment = () => {
  const [paymentsData, setPaymentsData] = useState([]);

  const getAllPayments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/payment/getallpayments"
      );
      console.log(data);
      setPaymentsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  const columns = [
    {
      field: "studentAvatar",
      headerName: "Photo",
      width: 90,
      renderCell: (params) => (
        <Avatar src={params.row.studentAvatar} alt="Student Avatar" />
      ),
    },
    { field: "studentName", headerName: "Student Name", width: 150 },

    {
      field: "teacherAvatar",
      headerName: "Teacher Avatar",
      width: 150,
      renderCell: (params) => (
        <Avatar src={params.row.teacherAvatar} alt="Teacher Avatar" />
      ),
    },
    { field: "teacherName", headerName: "Teacher Name", width: 150 },
    { field: "courseName", headerName: "Course Name", width: 150 },
    { field: "sessionName", headerName: "Session Name", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => <b>{params.row.price}</b>,
    },

    {
      field: "paidVia",
      headerName: "Paid Via",
      width: 120,
      renderCell: (params) => (
        <img width="50%" height="80%" src={esewa} alt="" />
      ),
    },
  ];

  return (
    <>
      <Box textAlign={"center"} mb={2}>
        <Typography fontWeight={"bold"} variant="h4">
          All Payments
        </Typography>
      </Box>
      {/* <img src={esewa} alt="" /> */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={paymentsData.map((payment) => ({
            id: payment._id,
            studentName: payment.studentDetails[0].name,
            teacherName: payment.teachersDetails.name,
            courseName: payment.coursesDetails.title,
            price: `Rs ${payment.coursesDetails.price}`,
            sessionName: payment.name,
            studentAvatar: payment.studentDetails[0].photoURL,
            teacherAvatar: payment.teachersDetails.photoURL,
          }))}
          columns={columns}
          pageSize={5}
          perPageOptions={[5, 10, 20]}
          checkboxSelection={false}
          disableSelectionOnClick={true}
        />
      </div>
    </>
  );
};

export default Payment;
