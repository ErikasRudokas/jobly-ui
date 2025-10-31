import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Typography,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Cancel as CancelIcon,
    Download as DownloadIcon,
    Edit as EditIcon,
} from '@mui/icons-material';
import {useApplications} from '../../common/hooks/useApplications';
import {useCVDownload} from '../../common/hooks/useCVDownload';
import type {MyApplication, WorkType} from '../../common/types/application.types';
import {ROUTES} from '../../common/constants/routes';
import {formatSalary} from '../../common/utils/salaryUtils';
import {
    actionButtonsStyle,
    backButtonStyle,
    cancelButtonStyle,
    commentBoxStyle,
    commentTextStyle,
    companyNameStyle,
    containerStyle,
    detailItemStyle,
    detailLabelStyle,
    detailsGridStyle,
    detailValueStyle,
    dialogActionsStyle,
    downloadCvButtonStyle,
    editButtonStyle,
    errorAlertStyle,
    headerSectionStyle,
    jobTitleStyle,
    loadingBoxStyle,
    paperStyle,
    sectionStyle,
    sectionTitleStyle,
    statusChipStyle,
} from './styles';

function MyApplicationDetails() {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {getMyApplicationDetails, cancelApplication, loading, error} = useApplications();
    const {downloadCV} = useCVDownload();
    const [application, setApplication] = useState<MyApplication | null>(null);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

    useEffect(() => {
        const loadApplication = async () => {
            if (!id) return;
            const data = await getMyApplicationDetails(parseInt(id));
            if (data) {
                setApplication(data);
            }
        };
        loadApplication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleBack = () => {
        navigate(ROUTES.MY_APPLICATIONS);
    };

    const handleEdit = () => {
        if (id) {
            navigate(ROUTES.MY_APPLICATION_EDIT(parseInt(id)));
        }
    };

    const handleCancelClick = () => {
        setIsCancelDialogOpen(true);
    };

    const handleCancelConfirm = async () => {
        if (!id) return;
        const success = await cancelApplication(parseInt(id));
        if (success) {
            navigate(ROUTES.MY_APPLICATIONS);
        }
        setIsCancelDialogOpen(false);
    };

    const handleCancelDialogClose = () => {
        setIsCancelDialogOpen(false);
    };

    const handleDownloadCV = async () => {
        if (application?.cvId) {
            await downloadCV(application.cvId);
        }
    };


    const formatWorkType = (workType: WorkType) => {
        return workType.replace('_', ' ');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading && !application) {
        return (
            <Box sx={loadingBoxStyle}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !application) {
        return (
            <Box sx={containerStyle}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={backButtonStyle}
                >
                    Back to My Applications
                </Button>
                <Alert severity="error" sx={errorAlertStyle}>
                    {error || 'Application not found'}
                </Alert>
            </Box>
        );
    }

    const canEditOrCancel = application && application.applicationStatus === 'PENDING';

    return (
        <Box sx={containerStyle}>
            <Box sx={headerSectionStyle}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={backButtonStyle}
                >
                    Back to My Applications
                </Button>
                <Box sx={actionButtonsStyle}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                        sx={editButtonStyle}
                        disabled={!canEditOrCancel}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={handleCancelClick}
                        sx={cancelButtonStyle}
                        disabled={!canEditOrCancel}
                    >
                        Cancel Application
                    </Button>
                </Box>
            </Box>

            <Paper sx={paperStyle}>
                <Box sx={sectionStyle}>
                    <Typography variant="h4" sx={jobTitleStyle}>
                        {application.jobOffer.title}
                    </Typography>
                    <Typography variant="h6" sx={companyNameStyle}>
                        {application.jobOffer.companyName}
                    </Typography>
                    <Chip
                        label={application.applicationStatus}
                        sx={statusChipStyle}
                    />
                </Box>

                {application.comment && (
                    <Box sx={sectionStyle}>
                        <Typography variant="h6" sx={sectionTitleStyle}>
                            Your Comment
                        </Typography>
                        <Box sx={commentBoxStyle}>
                            <Typography sx={commentTextStyle}>
                                {application.comment}
                            </Typography>
                        </Box>
                    </Box>
                )}

                <Box sx={sectionStyle}>
                    <Typography variant="h6" sx={sectionTitleStyle}>
                        Job Details
                    </Typography>
                    <Box sx={detailsGridStyle}>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Salary</Typography>
                            <Typography sx={detailValueStyle}>
                                {formatSalary(application.jobOffer.salary)}
                            </Typography>
                        </Box>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Work Type</Typography>
                            <Typography sx={detailValueStyle}>
                                {formatWorkType(application.jobOffer.workType)}
                            </Typography>
                        </Box>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Location</Typography>
                            <Typography sx={detailValueStyle}>
                                {application.jobOffer.location}
                            </Typography>
                        </Box>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Category</Typography>
                            <Typography sx={detailValueStyle}>
                                {application.jobOffer.category.name}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={sectionStyle}>
                    <Typography variant="h6" sx={sectionTitleStyle}>
                        Application Details
                    </Typography>
                    <Box sx={detailsGridStyle}>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Applied On</Typography>
                            <Typography sx={detailValueStyle}>
                                {formatDate(application.createdAt)}
                            </Typography>
                        </Box>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Last Updated</Typography>
                            <Typography sx={detailValueStyle}>
                                {formatDate(application.updatedAt)}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownloadCV}
                        sx={downloadCvButtonStyle}
                    >
                        Download My CV
                    </Button>
                </Box>
            </Paper>

            <Dialog open={isCancelDialogOpen} onClose={handleCancelDialogClose}>
                <DialogTitle>Cancel Application</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel your application for "{application?.jobOffer.title}"?
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={dialogActionsStyle}>
                    <Button onClick={handleCancelDialogClose}>No, Keep It</Button>
                    <Button onClick={handleCancelConfirm} color="error" variant="contained">
                        Yes, Cancel Application
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default MyApplicationDetails;

