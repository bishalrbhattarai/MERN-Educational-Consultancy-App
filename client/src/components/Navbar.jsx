import React, { useEffect, useState } from "react";
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
  Stack,
  Fade,
  Avatar,
  Divider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import asahiLogo from "../images/asahi-logo.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
const blackColor = {
  color: "black",
  fontWeight: 200,
  fontSize: 18,
  textTransform: "capitalize",
  fontFamily: "Gilroy, serif",
};

const textDecorationNone = {
  textDecoration: "none",
  color: "black",
};
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const [openSideBar, setopenSideBar] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setopenSideBar(false);
    });
  }, []);

  return (
    <>
      <AppBar
        elevation={3}
        sx={{
          position: "sticky",
          background: "white",
          // color: "inherit",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", p: 1 }}>
          <Box
            height={`${60 / 16}rem`}
            width={`${150 / 16}rem`}
            color="inherit"
            component="img"
            src={asahiLogo}
          ></Box>

          <Drawer
            open={openSideBar}
            onClose={() => {
              setopenSideBar(false);
            }}
          >
            <List
              disablePadding
              sx={{
                width: 200,
                fontWeight: "100",
              }}
            >
              <ListItem>
                <Box
                  height={`${60 / 16}rem`}
                  width={`${150 / 16}rem`}
                  color="inherit"
                  component="img"
                  src={asahiLogo}
                ></Box>
              </ListItem>

              <ListItem>
                <ListItemText>Home</ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText>About</ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText>Study Abroad</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Classes</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText> Blog</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>Contacts</ListItemText>
              </ListItem>
            </List>
          </Drawer>

          <Stack
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              left: "40%",
              transform: "translateX(-50%)",
              fontSize: 10,
              justifyContent: "center",
            }}
            direction="row"
            spacing={3}
          >
            <NavLink sx={{}} to="/">
              <Button sx={blackColor}>{"Home"}</Button>{" "}
            </NavLink>
            <NavLink to="/">
              <Button sx={blackColor}>About</Button>{" "}
            </NavLink>
            <NavLink to="/courses">
              <Button sx={blackColor}>Courses</Button>
            </NavLink>

            <Button sx={blackColor}>Blog</Button>
            <Button sx={blackColor}>Contact</Button>
          </Stack>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TextField
              placeholder="Search...."
              sx={{
                alignItems: "center",
                display: {
                  md: "flex",
                  xs: "none",
                },
                // width: "30spx",
                // height: "5px",
              }}
              size="small"
              id="outlined-basic"
              // placeholder="Search..."
              InputProps={{
                sx: {
                  borderRadius: 50,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            {Object.keys(user).length == 0 ? (
              <>
                {" "}
                <Button
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleClick}
                  // onMouseEnter={handleClick}
                  // onMouseLeave={handleClose}
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    color: "white",
                    backgroundColor: "#000080",
                    border: "none",
                    "&:hover": {
                      border: "none",
                    },
                  }}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleClick2}
                  sx={{ color: "black" }}
                  startIcon={<KeyboardArrowDownIcon />}
                >
                  <Avatar src={user.photoURL} />
                </Button>
              </>
            )}

            <Menu
              onClick={() => {
                handleClose2();
              }}
              sx={{
                marginTop: "10px",
                color: "black",
              }}
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose2}
              TransitionComponent={Fade}
            >
              <NavLink to="/admin" style={textDecorationNone}>
                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
              </NavLink>

              <NavLink to="/admin/profile" style={textDecorationNone}>
                <MenuItem onClick={handleClose}>profile</MenuItem>
              </NavLink>
              <NavLink to="/admin/account" style={textDecorationNone}>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </NavLink>
              <Divider />
              <NavLink to="/admin/logout" style={textDecorationNone}>
                <MenuItem onClick={handleClose}>logout</MenuItem>
              </NavLink>
            </Menu>

            <Menu
              sx={{
                marginTop: "10px",
              }}
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <NavLink to="/admin/login" style={textDecorationNone}>
                <MenuItem onClick={handleClose}>Admin</MenuItem>
              </NavLink>
              <NavLink to="/student/login" style={textDecorationNone}>
                <MenuItem onClick={handleClose}>Student</MenuItem>
              </NavLink>
              <NavLink to="/teacher/login" style={textDecorationNone}>
                <MenuItem onClick={handleClose}>Teacher</MenuItem>
              </NavLink>
            </Menu>
            <IconButton
              onClick={(e) => {
                setopenSideBar(true);
              }}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "black",
                // marginLeft: "0.5rem",
              }}
              edge="start"
              color="inherit"
            >
              {openSideBar ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Navbar;
