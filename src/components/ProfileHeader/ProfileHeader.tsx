import {Avatar, Box, Typography} from '@mui/material';
import {StyledProfileHeader} from './styles';

interface ProfileHeaderProps {
    firstName?: string;
    lastName?: string;
    username?: string;
}

const ProfileHeader = ({firstName, lastName, username}: ProfileHeaderProps) => {
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
                    backgroundColor: 'primary.main',
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
                {username && (
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        @{username}
                    </Typography>
                )}
            </Box>
        </StyledProfileHeader>
    );
};

export default ProfileHeader;

