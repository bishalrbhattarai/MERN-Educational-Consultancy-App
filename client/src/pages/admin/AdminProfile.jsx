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
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";
import { setUser } from "../../redux/slices/user";
const AdminProfile = () => {
  const user = useSelector((state) => state.user.user);

  const formData = new FormData();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Profile Updated Successfully");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const fileRef = useRef(null);
  const [file, setFile] = useState({});

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
  });

  const dispatch = useDispatch();
  const [userImg, setUserImg] = useState(user.photoURL);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const changeProfilePicture = async (e) => {
    setLoading(true);
    formData.append("profileImg", file);
    formData.append("_id", user._id);
    const { data } = await axios.post(
      "http://localhost:3000/admin/changeprofilepicture",
      formData
    );
    if (data.success) {
      dispatch(setUser(data));
      setSeverity("success");
      setMessage(data.message);
      handleOpen();
      setLoading(false);
      setFile({});
      console.log(data);
    } else {
      setSeverity("error");
      setMessage(data.message);
      handleOpen();
      setFile({});
      console.log(data);
    }

    try {
    } catch (err) {
      console.log("something went wrong while Changing Profile Picture");
      console.log(err);
    }
  };

  const saveChanges = async (e) => {
    const errors = {};
    for (let key in userData) {
      if (userData[key] == "") {
        errors[key] = `${key} must not be empty`;
      }
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/admin/editprofile",
          {
            _id: user._id,
            ...userData,
          }
        );

        if (data.success) {
          dispatch(setUser(data));
          setSeverity("success");
          setMessage(data.message);
          handleOpen();
          console.log(data);
        } else {
          setSeverity("error");
          setMessage(data.message);
          handleOpen();
          setFile({});
          console.log(data);
        }
      } catch (error) {
        console.log("something went wrong while Editing Profile");
        console.log(error.response.data.message);
        setSeverity("error");
        setMessage(error.response.data.message);
        handleOpen();
      }
    }
  };

  useEffect(() => {
    console.log(file.name);
  }, [file]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
            backgroundColor: "black",
            color: "white",
            // width: "290px",
            // fontSize: "17px",
            alignItems: "center",
          }}
          severity={severity}
        >
          {message}
          <IconButton>
            {" "}
            <DeleteIcon sx={{ color: "white" }} size="small" />{" "}
          </IconButton>
        </Alert>
      </Snackbar>
      <Box sx={{ marginBottom: "5px" }} textAlign="center">
        <Typography sx={{ fontWeight: "bold", color: "black" }} variant="h5">
          My Profile
        </Typography>
      </Box>
      {loading ? (
        <>
          <Box
            textAlign={"center"}
            sx={{
              marginTop: "100px",
              // width: "200px", height: "200px", mx: "auto"
            }}
          >
            <CircularProgress
              size={160}
              // disableShrink
            />
          </Box>
        </>
      ) : (
        <>
          <Container
            sx={{
              width: "50%",

              borderRadius: 4,
              boxShadow: 3,
            }}
            // component={Paper}
            // elevation={4}
          >
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
                        border: "1px solid white",
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
                  {user.name || "admin"}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "260px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="name"
                  label="name"
                  sx={{
                    flexGrow: 2,
                    borderBottom: "1px solid black",
                  }}
                  defaultValue={userData.name}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  name="email"
                  label="email"
                  sx={{ flexGrow: 2, borderBottom: "1px solid black" }}
                  defaultValue={userData.email}
                />
              </Box>
              <Button
                disabled={file?.name ? false : true}
                endIcon={<PhotoCameraIcon />}
                onClick={changeProfilePicture}
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
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default AdminProfile;
