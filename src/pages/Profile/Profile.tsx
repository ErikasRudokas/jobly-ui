import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";

const Profile = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 12 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
          <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }}>
            JD
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              John Doe
            </Typography>
            <Typography variant="body1" color="text.secondary">
              john.doe@example.com
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          About Me
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Experience
        </Typography>
        <Typography variant="body1" paragraph>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body1" paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Education
        </Typography>
        <Typography variant="body1" paragraph>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Skills
        </Typography>
        <Typography variant="body1" paragraph>
          JavaScript, TypeScript, React, Node.js, Python, Java, SQL, MongoDB,
          Git, Docker, AWS, CI/CD, Agile Development
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Projects
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body1" paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Certifications
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography variant="body1" paragraph>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Additional Information
        </Typography>
        <Typography variant="body1" paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body1" paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;
