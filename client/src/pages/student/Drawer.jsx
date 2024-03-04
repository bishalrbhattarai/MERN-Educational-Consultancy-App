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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
import { useSelector } from "react-redux";
const drawerWidth = 240;
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LogoutIcon from "@mui/icons-material/Logout";
import SubjectIcon from "@mui/icons-material/Subject";
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
        <NavLink
          style={{
            color: "black",
            textDecoration: "none",
          }}
          to="/student/dashboard/profile"
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </NavLink>

        <NavLink
          style={{
            color: "black",
            textDecoration: "none",
          }}
          to="/student/dashboard/changepassword"
        >
          <MenuItem onClick={handleClose}>Change Password</MenuItem>
        </NavLink>

        <Divider />
        <NavLink
          style={{
            color: "red",
            textDecoration: "none",
          }}
          to="/student/dashboard/logout"
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </NavLink>
      </Menu>

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "black",

          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "black",
        }}
      >
        <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              color: "white",
            }}
          >
            Student Dashboard
            <IconButton>
              <AnalyticsIcon
                sx={{
                  fontSize: "35px",
                  color: "white",
                }}
              />
            </IconButton>
          </Typography>
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
                  <Avatar src={user.photoURL} />
                  <ArrowDropDownIcon sx={{ color: "white" }} />
                </Button>
                {/* <Typography sx={{ color: "inherit" }}>
              {user.email.slice(0, 5)}
            </Typography> */}
              </Box>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
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
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[
              {
                text: " My Sessions",
                location: "sessions",
                icon: (
                  <CastForEducationIcon
                    sx={{
                      color:
                        location.pathname == "/student/dashboard/sessions"
                          ? "white"
                          : "black",
                    }}
                  />
                ),
              },
              {
                text: " My Teachers",
                location: "teachers",
                icon: (
                  <SchoolIcon
                    sx={{
                      color:
                        location.pathname == "/student/dashboard/teachers"
                          ? "white"
                          : "black",
                    }}
                  />
                ),
              },

              {
                text: "Courses",
                location: "courses",
                icon: (
                  <SubjectIcon
                    sx={{
                      color:
                        location.pathname == "/student/dashboard/courses"
                          ? "white"
                          : "black",
                    }}
                  />
                ),
              },

              {
                text: "Logout",
                location: "logout",
                icon: (
                  <LogoutIcon
                    sx={{
                      color:
                        location.pathname == "/student/logout"
                          ? "white"
                          : "black",
                    }}
                  />
                ),
              },
              {
                text: " My Profile",
                location: "profile",
                icon: <Avatar src={user.photoURL} />,
              },
            ].map((obj, index) => (
              <Link
                style={{ textDecoration: "none" }}
                to={`/student/dashboard/${obj.location}`}
              >
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{
                      backgroundColor:
                        location.pathname ==
                        `/student/dashboard/${obj.location}`
                          ? "black"
                          : "white",
                      color:
                        location.pathname ==
                        `/student/dashboard/${obj.location}`
                          ? "white"
                          : "black",

                      "&:hover": {
                        backgroundColor:
                          location.pathname === obj.location
                            ? "black"
                            : "white",
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                  >
                    <ListItemIcon>{obj.icon}</ListItemIcon>
                    <ListItemText primary={obj.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
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
