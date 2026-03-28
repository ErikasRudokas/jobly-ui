import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import { StyledInfoCard, StyledInfoGrid } from './styles';

interface ProfileInfoCardsProps {
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  actions?: ReactNode;
  showTitle?: boolean;
}

const ProfileInfoCards = ({
  email,
  firstName,
  lastName,
  username,
  actions,
  showTitle = true,
}: ProfileInfoCardsProps) => {
  return (
    <>
      {showTitle && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
            Account Information
          </Typography>
          {actions}
        </Box>
      )}

      <StyledInfoGrid>
        <StyledInfoCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <EmailIcon color="primary" />
            <Typography variant="subtitle2" color="text.secondary">
              Email Address
            </Typography>
          </Box>
          <Typography variant="body1" fontWeight="medium">
            {email}
          </Typography>
        </StyledInfoCard>

        {username && (
          <StyledInfoCard>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <BadgeIcon color="primary" />
              <Typography variant="subtitle2" color="text.secondary">
                Username
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="medium">
              {username}
            </Typography>
          </StyledInfoCard>
        )}

        <StyledInfoCard>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <PersonIcon color="primary" />
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

export default ProfileInfoCards;
