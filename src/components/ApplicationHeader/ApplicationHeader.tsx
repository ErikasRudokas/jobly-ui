import { Box, Typography } from '@mui/material';
import { Category as CategoryIcon, Update as UpdateIcon } from '@mui/icons-material';
import type { ApplicationStatus } from '../../common/types/application.types';
import { formatDate } from '../../common/utils/genericUtils';
import StatusBadge from '../StatusBadge/StatusBadge';
import {
  bulletStyle,
  companyNameStyle,
  companyRowStyle,
  headerSectionStyle,
  jobTitleStyle,
  metaTextStyle,
} from './styles';

interface ApplicationHeaderProps {
  title: string;
  companyName: string;
  categoryName: string;
  applicationStatus: ApplicationStatus;
  updatedAt: string;
}

const ApplicationHeader = ({
  title,
  companyName,
  categoryName,
  applicationStatus,
  updatedAt,
}: ApplicationHeaderProps) => {
  return (
    <Box sx={headerSectionStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', mb: '1rem' }}>
        <Typography variant="h3" sx={jobTitleStyle}>
          {title}
        </Typography>
        <Typography sx={metaTextStyle}>
          <UpdateIcon sx={{ fontSize: '1rem' }} />
          Updated {formatDate(updatedAt)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <Box sx={companyRowStyle}>
          <Typography sx={companyNameStyle}>{companyName}</Typography>
          <Typography sx={bulletStyle}>•</Typography>
          <Typography sx={metaTextStyle}>
            <CategoryIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
            {categoryName}
          </Typography>
        </Box>
        <StatusBadge status={applicationStatus} />
      </Box>
    </Box>
  );
};

export default ApplicationHeader;
