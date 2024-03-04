import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
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
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
const drawerWidth = 240;
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FaChalkboardTeacher } from "react-icons/fa";
import SchoolIcon from "@mui/icons-material/School";
import { GiTeacher } from "react-icons/gi";
import { MdClass } from "react-icons/md";
import SubjectIcon from "@mui/icons-material/Subject";
import PaidIcon from "@mui/icons-material/Paid";
function AdminSidebar() {
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
          to="/admin/dashboard/profile"
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </NavLink>

        <NavLink
          style={{
            color: "black",
            textDecoration: "none",
          }}
          to="/admin/dashboard/changepassword"
        >
          <MenuItem onClick={handleClose}>Change Password</MenuItem>
        </NavLink>

        <Divider />
        <NavLink
          style={{
            color: "red",
            textDecoration: "none",
          }}
          to="/admin/logout"
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
            color: "white",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              color: "white",
              alignItems: "center",
              color: "#000000DE",
              display: "flex",
            }}
          >
            <Box sx={{ fontSize: "25px", color: "white" }}>
              {" "}
              Admin Dashboard{" "}
            </Box>

            <IconButton>
              <HomeIcon
                sx={{
                  color: "white",
                  fontSize: "38px",
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
                  <ArrowDropDownIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </Button>
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
                text: "All Students",
                location: "students",
                icon: (
                  <SchoolIcon
                    sx={{
                      color:
                        location.pathname == `/admin/dashboard/students`
                          ? "white"
                          : "black",
                    }}
                  />
                ),
              },
              {
                text: " All Teachers",
                location: "teachers",
                icon: (
                  <GiTeacher
                    size={20}
                    style={{
                      color:
                        location.pathname == `/admin/dashboard/teachers`
                          ? "white"
                          : "black",
                    }}
                  />
                ),
              },
              {
                text: "All Sessions",
                location: "sessions",

                icon: (
                  <MdClass
                    size={20}
                    style={{
                      color:
                        location.pathname == `/admin/dashboard/sessions`
                          ? "white"
                          : "black",
                    }}
                  />
                ),
              },
              {
                text: " All Courses",
                location: "courses",
                icon: (
                  <SubjectIcon
                    sx={{
                      color:
                        location.pathname == `/admin/dashboard/courses`
                          ? "white"
                          : "black",
                    }}
                  />
                ),
              },

              {
                text: " All Payments",
                location: "payments",
                icon: (
                  <PaidIcon
                    sx={{
                      color:
                        location.pathname == `/admin/dashboard/payments`
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
                style={{ textDecoration: "none", color: "black" }}
                to={`${obj.location}`}
              >
                <ListItem key={obj.text} disablePadding>
                  <ListItemButton
                    sx={{
                      backgroundColor:
                        location.pathname == `/admin/dashboard/${obj.location}`
                          ? "black"
                          : "white",
                      color:
                        location.pathname == `/admin/dashboard/${obj.location}`
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
          {/* <Divider /> */}
          {/* <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminSidebar;
