import { Box, Typography, Container, Grid } from "@mui/material";
import Image from "../../assets/house-banner.jpg";

const Hero = () => {
  return (
    <Box  sx={{ mb: { xs: 8, xl: 24 } }}>
      {/* <Container> */}
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", lg: "flex-start" },
              textAlign: { xs: "center", lg: "left" },
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", lg: "2.756rem" },
                fontWeight: "bold",
                lineHeight: 1.2,
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: "blue",
                  fontSize: { xs: "2rem", lg: "3.625rem" },
                  fontWeight: "bold",
                  lineHeight: 1.2,
                }}
              >
                Experience
              </Typography>{" "}
              the Joy of Living in Your Dream House with Us
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: "480px" }}>
              Experience the thrill of turning your dream into reality with us.
              We specialize in making homeownership dreams come true, offering a
              curated selection of exquisite properties that align with your
              aspirations.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              overflow: "hidden",
              borderRadius: { lg: "10rem 0 0 10rem" },
            }}
          >
            <img
              src={Image}
              alt="House banner"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      {/* </Container> */}
    </Box>
  );
};

export default Hero;
