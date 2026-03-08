import { Box, Button, Paper, Tooltip, Typography } from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';
import type { ApplicationWithSkillMatch } from '../../common/types/jobOffer.types';
import { applicationStatusBadgeStyle } from '../../pages/MyJobOfferDetails/styles';
import { formatApplicationStatus, formatDate } from '../../common/utils/genericUtils';
import SkillMatchBadge from '../SkillMatchBadge/SkillMatchBadge';
import {
  actionsRowStyle,
  applicantNameStyle,
  approveButtonStyle,
  cardStyle,
  commentBoxStyle,
  dateStyle,
  downloadCvButtonStyle,
  emailStyle,
  footerRowStyle,
  headerRowStyle,
  rejectButtonStyle,
} from './styles';

interface ApplicationCardProps {
  application: ApplicationWithSkillMatch;
  manageLoading: boolean;
  onCardClick: (application: ApplicationWithSkillMatch) => void;
  onDownloadCV: (cvId: number) => void;
  onApprove: (applicationId: number) => void;
  onReject: (applicationId: number) => void;
}

const ApplicationCard = ({
  application,
  manageLoading,
  onCardClick,
  onDownloadCV,
  onApprove,
  onReject,
}: ApplicationCardProps) => {
  return (
    <Paper sx={cardStyle} elevation={0} onClick={() => onCardClick(application)}>
      <Box sx={headerRowStyle}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={applicantNameStyle}>
            {application.applicant.firstName} {application.applicant.lastName}
          </Typography>
          <Typography sx={emailStyle}>{application.applicant.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <SkillMatchBadge value={application.userSkillsMatch} tooltip="Skills match based on applicant profile" />
          <Box sx={applicationStatusBadgeStyle(application.applicationStatus)}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {formatApplicationStatus(application.applicationStatus)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {application.comment && (
        <Box sx={commentBoxStyle}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
            {application.comment}
          </Typography>
        </Box>
      )}

      <Box sx={footerRowStyle}>
        <Typography sx={dateStyle}>Applied {formatDate(application.createdAt)}</Typography>
        <Box sx={actionsRowStyle} onClick={(e) => e.stopPropagation()}>
          {application.cvId && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon sx={{ fontSize: '0.9rem' }} />}
              onClick={() => onDownloadCV(application.cvId!)}
              sx={downloadCvButtonStyle}
            >
              CV
            </Button>
          )}
          {application.applicationStatus === 'PENDING' && (
            <>
              <Tooltip title="Accept" arrow>
                <span>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => onApprove(application.id)}
                    disabled={manageLoading}
                    sx={approveButtonStyle}
                    startIcon={<CheckIcon sx={{ fontSize: '0.9rem' }} />}
                  >
                    Accept
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title="Reject" arrow>
                <span>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => onReject(application.id)}
                    disabled={manageLoading}
                    sx={rejectButtonStyle}
                    startIcon={<CloseIcon sx={{ fontSize: '0.9rem' }} />}
                  >
                    Reject
                  </Button>
                </span>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ApplicationCard;
