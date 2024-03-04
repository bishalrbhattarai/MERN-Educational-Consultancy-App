import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import SchoolSharpIcon from "@mui/icons-material/SchoolSharp";
import HandshakeSharpIcon from "@mui/icons-material/HandshakeSharp";
import React from "react";

const coreDetails = [
  {
    logo: <LanguageSharpIcon sx={{ fontSize: 30 }} />,
    title: "Perfect Preparation",
    body: `Asahi provides quality Japanese language classes and prepare
        students for NAT, JLPT, TOP J and J Test as well. The
        teachers and the faculty are highly experienced and they
        provide hand worthy education materials also. `,
  },
  {
    logo: <SchoolSharpIcon sx={{ fontSize: 30 }} />,
    title: "Expert Instructor",
    body: `Asahi has very strong background in Japanese Education System and the language requirements for Japanese education or Nepalese students, and with its, in hand experience of graduation in Japan, the core team focuses in higher success rates. `,
  },
  {
    logo: <HandshakeSharpIcon sx={{ fontSize: 30 }} />,
    title: "Strong Support",
    body: `Asahi extends you a warm and friendly welcome for any inquiry, comments or suggestions. Asahi International Consultancy will always be along with you and for any kind of guidelines during your stay in Japan.`,
  },
];

const Core = () => {
  return (
    <>
      <Container
        sx={{
          marginTop: "30px",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="subtitle1"
          sx={{
            color: "#30BEAD",
            fontWeight: "light",
            fontWeight: 500,
            fontSize: "20px",
          }}
        >
          Core Features
        </Typography>
        <Typography
          textAlign={"center"}
          sx={{ fontWeight: "bold" }}
          variant="h3"
        >
          Why{" "}
          <Box component="span" sx={{ color: "#ff7e7e" }}>
            Choose{" "}
          </Box>
          Asahi
        </Typography>
        <Divider
          sx={{
            borderBottomWidth: "10px",
            margin: "0px auto",
            backgroundColor: "darkwhite",
            fontWeight: "bold",
          }}
          width="200px"
          textAlign="center"
        />

        <Grid
          sx={{ marginTop: "25px", marginBottom: "25px" }}
          spacing={4}
          container
        >
          {coreDetails.map((detail, index) => (
            <Grid key={index} item md={4} xs={12}>
              <Box
                sx={{
                  "&:hover": {
                    backgroundColor: "#red",
                  },
                }}
              >
                <Card
                  sx={{
                    height: "400px",
                    transition: "background-color 0.7s ease",
                    "&:hover": {
                      backgroundColor: "#FF7E84",
                      color: "white",
                      padding: "15px",
                    },
                  }}
                >
                  <CardContent>
                    <IconButton
                      sx={{
                        backgroundColor: "#d7edd5",
                        color: "green",
                      }}
                      size="large"
                    >
                      {detail.logo}
                    </IconButton>
                    <Typography
                      variant="h4"
                      sx={{
                        marginTop: "20px",
                        fontWeight: "bold",
                        fontSize: "25px",
                      }}
                    >
                      {detail.title}
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: "15px",
                        fontWeight: 100,
                      }}
                      variant="subtitle1"
                    >
                      {detail.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Core;
