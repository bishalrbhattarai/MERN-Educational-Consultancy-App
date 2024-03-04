import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { MdSubject } from "react-icons/md";

import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
const drawerWidth = 240;
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
function StudentSidebar() {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const [anchor, setAnchor] = React.useState(null);

  const open = Boolean(anchor);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchor(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Menu
        id="fade-menu"
        anchorEl={anchor}
        // keepMounted
        open={open}
        onClose={handleClose}
        // TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <NavLink
          style={{
            color: "red",
            textDecoration: "none",
          }}
          to="/teacher/logout"
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </NavLink>
      </Menu>

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Toolbar
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/teacher/dashboard">
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                color: "white",
              }}
            >
              Teacher Dashboard
              <IconButton>
                <AnalyticsIcon
                  sx={{
                    fontSize: "35px",
                    color: "white",
                  }}
                />
              </IconButton>
            </Typography>
          </Link>

          {Object.keys(user).length > 0 ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                  onClick={handleClick}
                >
                  <Avatar sx={{}} src={user.photoURL} />
                  <ArrowDropDownIcon sx={{ color: "white" }} />
                </Button>
              </Box>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        elevation={2}
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", backgroundColor: "whitesmoke" }}>
          <List>
            {[
              {
                label: "My Sessions",
                logo: <AssessmentIcon />,
                location: "sessions",
              },
              {
                label: " My Students",
                logo: <SupervisedUserCircleIcon />,
                location: "students",
              },
              {
                label: "My Courses",
                logo: <MdSubject />,
                location: "courses",
              },
              {
                label: "Student Enrollment",
                logo: <SubscriptionsIcon />,
                location: "enrollments",
              },
              {
                label: "My Profile",
                logo: <Avatar src={user.photoURL} />,
                location: "profile",
              },
            ].map((obj, index) => (
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to={`${obj.location}`}
              >
                <ListItem key={obj.label} disablePadding>
                  <ListItemButton
                    sx={{
                      backgroundColor:
                        location.pathname ==
                        `/teacher/dashboard/${obj.location}`
                          ? "black"
                          : "white",
                      color:
                        location.pathname ==
                        `/teacher/dashboard/${obj.location}`
                          ? "white"
                          : "black",

                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        fontSize: "30px",

                        color:
                          location.pathname ==
                          `/teacher/dashboard/${obj.location}`
                            ? "white"
                            : "black",
                      }}
                      size="large"
                    >
                      {obj.logo}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ fontSize: "large" }}
                      primary={obj.label}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default StudentSidebar;
