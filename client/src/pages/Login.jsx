import { Box, Button, Divider, Paper, TextField } from "@mui/material";
import googleImg from "./google2.png";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const isScreenMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Box
        component={Box}
        boxShadow={12}
        sx={{
          margin: "100px auto",
          height: "390px",
          width: {
            md: "390px",
            xs: "330px",
          },
        }}
      >
        <TextField
          placeholder="Email"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 17px",
          }}
          size={isScreenMd ? "small" : "small"}
        />

        <TextField
          placeholder="Password"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 17px",
          }}
          size={isScreenMd ? "small" : "small"}
        />

        <Button
          size="large"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 18px",
            backgroundColor: "#000080",
            textTransform: "capitalize",
            fontSize: "18px",
          }}
          variant="contained"
        >
          Log in
        </Button>

        <Button
          size="large"
          sx={{
            width: "90%",
            margin: "15px 15px 10px 18px",
            backgroundColor: "white",
            textTransform: "capitalize",
            fontSize: "18px",
            "&:hover": {
              color: "white",
            },
            // backgroundColor: "red",
            color: "inherit",
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
          Continue with Google{" "}
          <link
            type="image/png"
            sizes="32x32"
            rel="icon"
            href=".../icons8-google-32.png"
          ></link>
        </Button>
        <Button
          sx={{
            display: "block",
            width: "50%",
            textTransform: "capitalize",
            color: "#000080",
            // color: "black",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Haven't Signed Up ?
        </Button>
        <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
        <Link
          sx={{ textDecoration: "none" }}
          style={{ textDecoration: "none" }}
          to="/signup"
        >
          <Button
            boxShadow={3}
            variant="contained"
            sx={{
              backgroundColor: "#32CD32",
              width: "40%",
              padding: 1,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "15px",
              textTransform: "capitalize",
              textDecoration: "none",
            }}
          >
            Sign Up
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Login;
