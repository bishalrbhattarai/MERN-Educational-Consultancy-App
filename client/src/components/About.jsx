import React from "react";
import aboutImg from "../images/about.webp";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
const content = `Asahi International Consultancy is one of the dedicated
consultancies working specially to facilitate Nepalese students
to study in Japan. From its establishment, Asahi is committed to
bring the best class institutions in Nepal market for betterment
of Nepalese students. We provide best opportunities for
candidates willing to be in Japan for better education and
standard lifestyle. While going in for numbers, no doubt, Asahi
has processed 100s of students for Japan and the number is still
counting. We have very good success rates, and the students
facilitated from us are getting quality education in Japan.`;
const About = () => {
  return (
    <>
      <Container
        sx={{
          marginTop: "50px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item sx={{}} xs={12} md={6}>
            <Box>
              <Box
                component={"img"}
                src={aboutImg}
                sx={{
                  width: "100%",
                }}
                alt=""
              />
            </Box>
          </Grid>
          <Grid xs={12} item md={6}>
            <Box
              // c  omponent={Paper} boxShadow={4}
              //   p={1}
              pl={2}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: "#30BEAD", fontWeight: "bold", fontSize: "20px" }}
              >
                About Asahi International Consultancy
              </Typography>
              <Typography
                sx={{
                  marginTop: "4px",
                  fontSize: { md: "45px", xs: "40px" },
                  fontWeight: "bold",
                }}
                variant="h3"
              >
                The Place Where You Can
              </Typography>
              <Typography
                sx={{
                  fontWeight: "900",
                  fontSize: { md: "45px", xs: "45px" },
                  color: "#FF7E84",
                  //   marginBottom: "20px",
                }}
                variant="h3"
              >
                Achieve
              </Typography>
              <Divider
                width="180px"
                sx={{
                  //   borderTopWidth: "10px",
                  borderBottomWidth: "15px",
                  //   backgroundColor: "#FF7E84",
                  //   backgroundColor: "black",
                }}
              />
              <Typography
                sx={{
                  // fontFamily: "Gilroy, serif",
                  fontSize: "18px",
                  marginTop: "25px",
                  lineHeight: "28px",
                  fontWeight: 100,
                  textAlign: "justify",
                }}
              >
                {content}
              </Typography>

              <Button
                sx={{
                  display: "block",
                  borderWidth: "0px",
                  padding: "10px",
                  fontSize: "15px",
                  textTransform: "capitalize",
                  marginTop: "30px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  backgroundColor: "#FF7E84",
                  "&:hover": {
                    padding: "10px",
                    backgroundColor: "#d6696e",
                    // border: "5px solid #FF7E84",
                  },
                }}
                variant="contained"
              >
                Read More
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default About;
