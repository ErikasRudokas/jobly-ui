import {Box, Container, Typography} from "@mui/material";
import {
    HomeAccentTextStyle,
    HomeContainerStyle,
    HomeContentWrapperStyle,
    HomeHeadingStyle,
    HomeImageStyle,
    HomeSubheadingStyle,
} from "./styles";
import HeroImage from "../../assets/undraw_job-offers_55y0.svg";

const Home = () => {
    return (
        <Container maxWidth="lg" sx={{height: "100%"}}>
            <Box sx={HomeContainerStyle}>
                <Box sx={HomeContentWrapperStyle}>
                    <Box sx={{ flex: 1, minWidth: '300px' }}>
                        <Typography variant="h2" component="h1" sx={HomeHeadingStyle}>
                            Your career{" "}
                            <Box component="span" sx={HomeAccentTextStyle}>
                                starts here
                            </Box>
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={HomeSubheadingStyle}
                        >
                            Discover your next opportunity. Explore jobs, connect with top employers, and grow your career.
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box
                            component="img"
                            src={HeroImage}
                            alt="Career opportunities illustration"
                            sx={HomeImageStyle}
                        />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
