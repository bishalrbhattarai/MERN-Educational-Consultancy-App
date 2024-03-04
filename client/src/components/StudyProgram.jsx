import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import abc from "../images/courses.webp";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Link } from "react-router-dom";
const StudyProgram = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#e9ecf2" }}>
        <Container>
          <Grid container>
            <Grid
              sx={{
                marginBottom: "40px",
                padding: "20px",
              }}
              item
              md={5}
              xs={12}
            >
              <Box>
                <Typography
                  //   textAlign={"center"}
                  variant="subtitle1"
                  sx={{
                    color: "#30BEAD",
                    // fontWeight: "light",
                    fontWeight: 400,
                    fontSize: "18px",
                  }}
                >
                  Best Preparation Classes
                </Typography>
                <Typography sx={{ fontSize: "38px", fontWeight: "bold" }}>
                  One place & Many
                </Typography>
                <Typography sx={{ fontSize: "38px", fontWeight: "bold" }}>
                  Preparation{" "}
                  <Box component="span" sx={{ color: "#FF7E7E" }}>
                    {" "}
                    Classes{" "}
                  </Box>
                </Typography>

                <Typography
                  //   textAlign={"center"}
                  variant="subtitle1"
                  sx={{
                    marginTop: "10px",
                    color: "black",
                    // fontWeight: "light",
                    fontWeight: 400,
                    fontSize: "18px",
                  }}
                >
                  There are many Preparation Classes in available.
                </Typography>

                <Box>
                  <Typography>
                    <IconButton>
                      <CheckBoxIcon sx={{ color: "black" }} />
                    </IconButton>{" "}
                    JLPT
                  </Typography>
                  <Typography>
                    <IconButton>
                      <CheckBoxIcon sx={{ color: "black" }} />
                    </IconButton>
                    NAT
                  </Typography>
                  <Typography>
                    <IconButton>
                      <CheckBoxIcon sx={{ color: "black" }} />
                    </IconButton>
                    TOP J
                  </Typography>
                  <Typography>
                    <IconButton>
                      <CheckBoxIcon sx={{ color: "black" }} />
                    </IconButton>
                    J TEST
                  </Typography>
                  <Box
                    // component="span"
                    sx={{
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      //   component="div"
                      variant="contained"
                      sx={{
                        padding: "15px",
                        backgroundColor: "#FF7E7E",

                        "&:hover": {
                          backgroundColor: "#FF7E7E",
                        },
                      }}
                    >
                      {" "}
                      <Link
                        to="/courses"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Explore our Courses
                      </Link>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={7} xs={12}>
              <Box sx={{ marginBottom: "20px", padding: "25px" }}>
                <Box
                  component={"img"}
                  src={abc}
                  sx={{
                    height: "420px",
                    width: "100%",
                  }}
                  alt="Image"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default StudyProgram;
