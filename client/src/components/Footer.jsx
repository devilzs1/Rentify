
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{ backgroundColor: "grey", py: 2, textAlign: "center", color: "white" }}
    >
      <Container>
        <Typography variant="body2">
          &copy; {currentYear} All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
