import {Avatar, Box, Chip, Typography} from '@mui/material';
import {StyledProfileHeader} from '../../pages/Profile/styles';

interface ProfileHeaderProps {
    firstName?: string;
    lastName?: string;
    username: string;
    userId: number;
}

const ProfileHeader = ({firstName, lastName, username, userId}: ProfileHeaderProps) => {
    const getInitials = (firstName?: string, lastName?: string) => {
        if (!firstName && !lastName) return 'U';
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    return (
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
                {getInitials(firstName, lastName)}
            </Avatar>
            <Box sx={{flex: 1}}>
                <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                    {firstName} {lastName}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    @{username}
                </Typography>
                <Chip
                    label={`User ID: ${userId}`}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{mt: 1}}
                />
            </Box>
        </StyledProfileHeader>
    );
};

export default ProfileHeader;

