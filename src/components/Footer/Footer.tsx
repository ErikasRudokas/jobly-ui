import {Box, Container, Link, Typography} from "@mui/material";
import {FooterContainerStyle, FooterTitleStyle} from "./styles";

const Footer = () => {
    return (
        <Box component="footer" sx={FooterContainerStyle}>
            <Container maxWidth="lg">
                <Typography variant="body1" align="center" sx={FooterTitleStyle}>
                    Jobly - Your Job Search Platform
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {"Copyright © "}
                    <Link color="primary" href="/">
                        Jobly
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
