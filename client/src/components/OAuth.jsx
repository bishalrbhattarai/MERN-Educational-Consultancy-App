import { Alert, Box, Button, IconButton, Snackbar } from "@mui/material";
import React from "react";
import googleImg from "../images/google2.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const res = await axios.post("http://localhost:3000/student/google", {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });
      const data = res.data;

      if (data.success) {
        dispatch(setUser(data));
        navigate("/student/dashboard");
      }
    } catch (error) {
      alert("Something is wrong with", error.message);
    }
  };

  return (
    <>
      <Button
        onClick={signupWithGoogle}
        size="large"
        sx={{
          width: "90%",
          margin: "15px 15px 10px 18px",
          // backgroundColor: "white",
          textTransform: "capitalize",

          fontSize: "18px",
          "&:hover": {
            color: "white",
          },
          color: "white",
        }}
        variant="contained"
      >
        <Box
          height={25}
          width={25}
          mr={1}
          color="inherit"
          component="img"
          src={googleImg}
        ></Box>
        Continue with Google
      </Button>
    </>
  );
};

export default OAuth;
