import {Box, Container, Typography} from "@mui/material";
import {HomeAccentTextStyle, HomeContainerStyle, HomeHeadingStyle, HomeSubheadingStyle,} from "./styles";

const Home = () => {
    return (
        <Container maxWidth="lg" sx={{height: "100%"}}>
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
            </Box>
        </Container>
    );
};

export default Home;
