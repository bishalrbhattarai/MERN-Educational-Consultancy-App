import { Box, Button, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import japan7 from "../images/japan7.jpg";
import japan9 from "../images/japan9.jpg";
import japan5 from "../images/japan5.jpg";
import img1 from "../images/image1.jpg";
const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath: img1,
  },
  {
    label: "Bird",
    imgPath: japan7,
  },
  {
    label: "Bali, Indonesia",
    imgPath: japan5,
  },
  {
    label: "Goč, Serbia",
    imgPath: japan9,
  },
];

function NewHero() {
  return (
    <>
      <Box>
        <Carousel
          key={2}
          animation="slide"
          indicators={false}
          stopAutoPlayOnHover={false}
          navButtonsAlwaysVisible={false}
          duration={2500}
          interval={6000}
          sx={{
            width: "100%",
            height: "70vh", // Default height for all breakpoints
            "@media (max-width: 600px)": {
              height: "50vh", // Height for xs breakpoint
            },
            "@media (min-width: 601px) and (max-width: 960px)": {
              height: "60vh", // Height for md breakpoint
            },
            "@media (min-width: 961px)": {
              height: "85vh", // Height for lg breakpoint
            },
          }}
        >
          {images.map((image, key) => (
            <Box
              key={key}
              component="img"
              src={image.imgPath}
              sx={{
                width: "100%",
                height: "50vh", // Default height for all breakpoints
                "@media (max-width: 600px)": {
                  height: "50vh", // Height for xs breakpoint
                },
                "@media (min-width: 601px) and (max-width: 960px)": {
                  height: "60vh", // Height for md breakpoint
                },
                "@media (min-width: 961px)": {
                  height: "85vh", // Height for lg breakpoint
                },
              }}
            />
          ))}
        </Carousel>
      </Box>
    </>
  );
}

export default NewHero;
