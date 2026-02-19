import {Box, Typography} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import {StyledInfoCard, StyledInfoGrid} from '../../pages/Profile/styles';

interface AccountInformationProps {
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
}

const AccountInformation = ({email, username, firstName, lastName}: AccountInformationProps) => {
    return (
        <>
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
                        {email}
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
                        {username}
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
                        {firstName} {lastName}
                    </Typography>
                </StyledInfoCard>
            </StyledInfoGrid>
        </>
    );
};

export default AccountInformation;

