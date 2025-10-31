import {
    Alert,
    Avatar,
    Box,
    Chip,
    CircularProgress,
    Container,
    Divider,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import RefreshIcon from '@mui/icons-material/Refresh';
import {useUserProfile} from "../../common/hooks/useUserProfile";
import {StyledInfoCard, StyledInfoGrid, StyledProfileHeader, StyledProfilePaper} from "./styles";
import {CVSection} from "../../components/CVSection/CVSection";
import {authService} from "../../common/services/authService";
import {ROLES} from "../../common/constants/roleConstants";

const Profile = () => {
    const {profile, loading, error, refetch} = useUserProfile();
    const isUser = authService.hasRole(ROLES.USER);

    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName && !lastName) return 'U';
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{my: 12, display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{my: 12}}>
                <Alert severity="error" sx={{mb: 2}}>
                    {error}
                </Alert>
            </Container>
        );
    }

    if (!profile) {
        return (
            <Container maxWidth="lg" sx={{my: 12}}>
                <Alert severity="info">No profile data available</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{my: 12}}>
            <StyledProfilePaper elevation={3}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2}}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        My Profile
                    </Typography>
                    <Tooltip title="Refresh Profile">
                        <IconButton onClick={refetch} color="primary">
                            <RefreshIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>

                <StyledProfileHeader>
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            backgroundColor: "primary.main",
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                        }}
                    >
                        {getInitials(profile.firstName, profile.lastName)}
                    </Avatar>
                    <Box sx={{flex: 1}}>
                        <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                            {profile.firstName} {profile.lastName}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            @{profile.username}
                        </Typography>
                        <Chip
                            label={`User ID: ${profile.id}`}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{mt: 1}}
                        />
                    </Box>
                </StyledProfileHeader>

                <Divider sx={{my: 4}}/>

                <Typography variant="h5" gutterBottom fontWeight="bold" sx={{mb: 3}}>
                    Account Information
                </Typography>

                <StyledInfoGrid>
                    <StyledInfoCard>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                            <EmailIcon color="primary"/>
                            <Typography variant="subtitle2" color="text.secondary">
                                Email Address
                            </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                            {profile.email}
                        </Typography>
                    </StyledInfoCard>

                    <StyledInfoCard>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                            <BadgeIcon color="primary"/>
                            <Typography variant="subtitle2" color="text.secondary">
                                Username
                            </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                            {profile.username}
                        </Typography>
                    </StyledInfoCard>

                    <StyledInfoCard>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                            <PersonIcon color="primary"/>
                            <Typography variant="subtitle2" color="text.secondary">
                                Full Name
                            </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                            {profile.firstName} {profile.lastName}
                        </Typography>
                    </StyledInfoCard>
                </StyledInfoGrid>
                {isUser && (
                    <CVSection
                        cvId={profile.cvId}
                        onUploadSuccess={refetch}
                    />
                )}
            </StyledProfilePaper>
        </Container>
    );
};

export default Profile;
