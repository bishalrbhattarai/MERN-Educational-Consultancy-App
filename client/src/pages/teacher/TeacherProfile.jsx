import CircularProgress from "@mui/material/CircularProgress";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";
import { setUser, removeUser } from "../../redux/slices/user";
const TeacherProfile = () => {
  const formData = new FormData();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Profile Updated Successfully");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState({});

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [userImg, setUserImg] = useState(user.photoURL);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const saveChanges = async (e) => {
    setLoading(true);
    formData.append("profileImg", file);
    formData.append("_id", user._id);
    const { data } = await axios.post(
      "http://localhost:3000/teacher/changeprofilepicture",
      formData
    );
    if (data.success) {
      dispatch(setUser(data));
      setSeverity("success");
      setMessage(data.message);
      handleOpen();
      setLoading(false);
      console.log(data);
    }
    try {
    } catch (err) {
      console.log("something went wrong");
    }
  };
  useEffect(() => {
    console.log(file.name);
  }, [file]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert
          sx={{
            backgroundColor: "green",
            color: "white",

            alignItems: "center",
          }}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
      <Box sx={{ marginBottom: "5px" }} textAlign="center">
        <Typography sx={{ fontWeight: "bold", color: "black" }} variant="h5">
          My Profile
        </Typography>
      </Box>
      {loading ? (
        <>
          <Box textAlign={"center"} sx={{}}>
            <CircularProgress
              size={160}
              // disableShrink
            />
          </Box>
        </>
      ) : (
        <>
          <Container sx={{ width: "50%", backgroundColor: "whitesmoke" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ marginTop: "10px" }}
                onClick={(e) => fileRef.current.click()}
              >
                {userImg ? (
                  <>
                    <Avatar
                      src={userImg}
                      sx={{
                        backgroundColor: "white",
                        width: "220px",
                        height: "220px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Avatar />
                  </>
                )}
                <input
                  sx={{ display: "hidden" }}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setUserImg(URL.createObjectURL(e.target.files[0]));
                  }}
                  accept="image/*"
                  hidden
                  type="file"
                  ref={fileRef}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton>
                  <SchoolIcon sx={{ color: "black" }} />
                </IconButton>
                <Typography sx={{ color: "black", fontSize: "20px" }}>
                  {user.name}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "300px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box></Box>
                <TextField
                  label="name"
                  sx={{ flexGrow: 2 }}
                  defaultValue={user.name}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="email"
                  sx={{ flexGrow: 2 }}
                  defaultValue={user.email}
                />
              </Box>
              <Button
                disabled={file?.name ? false : true}
                endIcon={<PhotoCameraIcon />}
                onClick={saveChanges}
                sx={{ padding: 1.5, background: "#03A678" }}
                variant="contained"
              >
                Change Profile Picture
              </Button>
              <Button
                endIcon={<SaveAltIcon />}
                onClick={saveChanges}
                sx={{ padding: 1.5, backgroundColor: "black" }}
                variant="contained"
              >
                Save Changes
              </Button>
              <Button
                endIcon={<DeleteIcon sx={{ color: "red" }} />}
                sx={{
                  backgroundColor: "red",
                  padding: 1.5,
                  backgroundColor: "black",
                }}
                variant="contained"
              >
                Delete Profile
              </Button>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default TeacherProfile;
