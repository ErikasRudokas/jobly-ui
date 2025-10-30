import {Container, Typography} from "@mui/material";

const Jobs = () => {
    return (
        <Container maxWidth="lg" sx={{my: 12}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Jobs
            </Typography>
            <Typography variant="body1">Jobs list will be displayed here.</Typography>
        </Container>
    );
};

export default Jobs;
