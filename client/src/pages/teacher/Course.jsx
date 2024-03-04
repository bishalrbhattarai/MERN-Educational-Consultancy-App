// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   SpeedDial,
//   Box,
//   SpeedDialIcon,
//   Container,
//   Paper,
//   Avatar,
//   TextField,
//   InputAdornment,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import SearchIcon from "@mui/icons-material/Search";
// import { useSelector } from "react-redux";

// const CoursesPage = () => {
//   const user = useSelector((state) => state.user.user);
//   const [courses, setCourses] = useState([]);

//   const navigate = useNavigate();
//   const getAllCourse = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:3000/teacher/mycourses",
//         {
//           _id: user._id,
//         }
//       );

//       setCourses(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const handleChange = (e) => {
//   //   setSearch(e.target.value.trim());
//   // };

//   // const getFilteredData = async () => {
//   //   try {
//   //     const { data } = await axios.post("http://localhost:3000/course/search", {
//   //       search,
//   //     });
//   //     console.log(data);
//   //     setCourses(data);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   useEffect(() => {
//     getAllCourse();
//   }, []);

//   // useEffect(() => {
//   //   if (search != "") {
//   //     console.log("search");
//   //     getFilteredData();
//   //   }
//   //   if (search == "") {
//   //     getAllCourse();
//   //   }
//   // }, [search]);

//   return (
//     <>
//       <Box textAlign={"center"}>
//         <Typography variant="h4" fontWeight={"bold"}>
//           My Courses
//         </Typography>
//       </Box>
//       {/* <Box textAlign={"right"}>
//         <TextField
//           onChange={handleChange}
//           placeholder="Search Course...."
//           sx={
//             {
//               // width: "30spx",
//               // height: "5px",
//             }
//           }
//           size="small"
//           id="outlined-basic"
//           // placeholder="Search..."
//           InputProps={{
//             sx: {
//               borderRadius: 50,
//             },
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           variant="outlined"
//         />
//       </Box> */}

//       <Grid container spacing={3} justifyContent="flex-start">
//         {courses.length > 0 ? (
//           courses.map((course) => (
//             <Grid item xs={12} sm={6} md={6} lg={3} key={course._id}>
//               <Paper
//                 elevation={8}
//                 sx={{
//                   height: "100%",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" component="h2" gutterBottom>
//                     {course.title}
//                   </Typography>
//                   <Typography
//                     variant="subtitle2"
//                     color="textSecondary"
//                     gutterBottom
//                   >
//                     <Avatar src={course.teachersDetails.photoURL}> T </Avatar>
//                     Teacher: {course.teachersDetails.name}
//                   </Typography>
//                   <Typography
//                     variant="subtitle2"
//                     color="textSecondary"
//                     gutterBottom
//                   >
//                     {course.shortDescription}
//                   </Typography>
//                 </CardContent>
//               </Paper>
//             </Grid>
//           ))
//         ) : (
//           <>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "40 0px",
//                 width: "1200px",
//               }}
//             >
//               <Typography variant="h2" sx={{ textAlign: "center" }}>
//                 No Data to Show !!
//               </Typography>
//             </Box>
//           </>
//         )}
//       </Grid>
//     </>
//   );
// };

// export default CoursesPage;

import React, { useEffect, useState } from "react";
import { Typography, Box, Avatar } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

const CoursesPage = () => {
  const [pageSize, setPageSize] = useState(5);
  const user = useSelector((state) => state.user.user);
  const [courses, setCourses] = useState([]);

  const getAllCourse = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/teacher/mycourses",
        {
          _id: user._id,
        }
      );

      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourse();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "shortDescription", headerName: "Description", width: 350 },
    {
      field: "teacherName",
      headerName: "Teacher Name",
      width: 200,
      valueGetter: (params) => params.row.teachersDetails.name,
    },
    {
      field: "teacherAvatar",
      headerName: "Teacher Avatar",
      width: 200,
      renderCell: (params) => (
        <Avatar
          src={params.row.teachersDetails.photoURL}
          alt="Avatar"
          height={50}
        />
      ),
    },
  ];

  return (
    <>
      <Box textAlign="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          My Courses
        </Typography>
      </Box>

      <div style={{ height: 350, width: "100%" }}>
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize,
                onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
              },
            },
          }}
          rows={courses}
          columns={columns}
          disableSelectionOnClick={true}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>
    </>
  );
};

export default CoursesPage;
