import { Container, Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  HomeContainerStyle,
  HomeHeadingStyle,
  HomeAccentTextStyle,
  HomeSubheadingStyle,
  HomeButtonContainerStyle,
  HomeButtonStyle,
} from "./styles";

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "100%" }}>
      <Box sx={HomeContainerStyle}>
        <Typography variant="h2" component="h1" sx={HomeHeadingStyle}>
          Your employer brand{" "}
          <Box component="span" sx={HomeAccentTextStyle}>
            starts here
          </Box>
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          align="center"
          sx={HomeSubheadingStyle}
        >
          Find your dream job today with authentic reviews, rich storytelling
          and powerful insights
        </Typography>
        <Box sx={HomeButtonContainerStyle}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/jobs"
            sx={HomeButtonStyle}
          >
            Browse Jobs
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/profile"
            sx={HomeButtonStyle}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
