import {Box, Button, Paper, Tooltip, Typography} from '@mui/material';
import {Check as CheckIcon, Close as CloseIcon, Download as DownloadIcon} from '@mui/icons-material';
import type {Application} from '../../common/types/jobOffer.types';
import {applicationStatusBadgeStyle} from '../../pages/MyJobOfferDetails/styles';
import {formatDate} from '../../common/utils/genericUtils';
import {applicantNameStyle, cardStyle, dateStyle, downloadCvButtonStyle, rejectButtonStyle,} from './styles';

interface ApplicationCardProps {
    application: Application;
    manageLoading: boolean;
    onCardClick: (application: Application) => void;
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
        <Paper
            sx={cardStyle}
            elevation={2}
            onClick={() => onCardClick(application)}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                <Box>
                    <Typography sx={applicantNameStyle}>
                        {application.applicant.firstName} {application.applicant.lastName}
                    </Typography>
                    <Typography sx={dateStyle}>
                        {application.applicant.email}
                    </Typography>
                </Box>
                <Box sx={applicationStatusBadgeStyle(application.applicationStatus)}>
                    <Typography sx={{fontSize: '0.75rem', fontWeight: 600}}>
                        {application.applicationStatus}
                    </Typography>
                </Box>
            </Box>

            {application.comment && (
                <Box sx={{marginBottom: '1rem'}}>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        <strong>Comment:</strong> {application.comment}
                    </Typography>
                </Box>
            )}

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
                <Typography sx={dateStyle}>
                    Applied: {formatDate(application.createdAt)}
                </Typography>
                <Box
                    sx={{display: 'flex', gap: '1rem', alignItems: 'center'}}
                    onClick={(e) => e.stopPropagation()}
                >
                    {application.cvId && (
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() => onDownloadCV(application.cvId!)}
                            sx={downloadCvButtonStyle}
                        >
                            Download CV
                        </Button>
                    )}
                    {application.applicationStatus === 'PENDING' && (
                        <Box sx={{display: 'flex', gap: '0.5rem', alignItems: 'center', borderLeft: '1px solid', borderColor: 'divider', paddingLeft: '1rem'}}>
                            <Tooltip title="Approve Application" arrow>
                                <span>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={() => onApprove(application.id)}
                                        disabled={manageLoading}
                                        sx={{minWidth: 'auto', padding: '6px 12px'}}
                                    >
                                        <CheckIcon fontSize="small" />
                                    </Button>
                                </span>
                            </Tooltip>
                            <Tooltip title="Reject Application" arrow>
                                <span>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => onReject(application.id)}
                                        disabled={manageLoading}
                                        sx={rejectButtonStyle}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </Button>
                                </span>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            </Box>
        </Paper>
    );
};

export default ApplicationCard;

