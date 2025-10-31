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
    Snackbar,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Work as WorkIcon
} from '@mui/icons-material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import {useApplications} from '../../common/hooks/useApplications';
import type {JobOffer, WorkType} from '../../common/types/jobOffer.types';
import {ROUTES} from '../../common/constants/routes';
import {authService} from '../../common/services/authService';
import {ROLES} from '../../common/constants/roleConstants';
import {formatSalary} from '../../common/utils/salaryUtils';
import {
    backButtonStyle,
    companyNameStyle,
    contactBoxStyle,
    contactItemStyle,
    containerStyle,
    creatorStyle,
    descriptionTextStyle,
    detailItemStyle,
    detailLabelStyle,
    detailsGridStyle,
    detailValueStyle,
    errorAlertStyle,
    headerDetailsStyle,
    headerSectionStyle,
    loadingBoxStyle,
    paperStyle,
    salaryBoxStyle,
    sectionStyle,
    sectionTitleStyle,
    statusChipStyle,
    titleStyle,
} from './styles';

const JobDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { getJobOfferById, checkCanApply, loading, error } = useJobOffers();
    const { createApplication, loading: applyLoading } = useApplications();
    const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
    const [canApply, setCanApply] = useState<boolean>(false);
    const [checkingCanApply, setCheckingCanApply] = useState<boolean>(false);
    const [openApplyDialog, setOpenApplyDialog] = useState(false);
    const [applicationComment, setApplicationComment] = useState('');
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const isUser = authService.hasRole(ROLES.USER);

    useEffect(() => {
        const loadJobOffer = async () => {
            if (!id) return;
            const response = await getJobOfferById(parseInt(id));
            if (response) {
                setJobOffer(response.jobOffer);

                // Check if user can apply (only for users with USER role)
                if (isUser) {
                    setCheckingCanApply(true);
                    const canApplyResult = await checkCanApply(parseInt(id));
                    setCheckingCanApply(false);

                    if (canApplyResult) {
                        setCanApply(canApplyResult.canApply);
                    }
                }
            }
        };
        loadJobOffer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


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

    const handleBack = () => {
        navigate(ROUTES.JOBS);
    };

    const handleOpenApplyDialog = () => {
        setOpenApplyDialog(true);
    };

    const handleCloseApplyDialog = () => {
        setOpenApplyDialog(false);
        setApplicationComment('');
    };

    const handleApply = async () => {
        if (!id) return;

        const result = await createApplication(parseInt(id), {
            comment: applicationComment.trim() || undefined,
        });

        handleCloseApplyDialog();

        if (result.success) {
            setSnackbarMessage('Application submitted successfully!');
            setSuccessSnackbar(true);

            const canApplyResult = await checkCanApply(parseInt(id));
            if (canApplyResult) {
                setCanApply(canApplyResult.canApply);
            }
        } else {
            setSnackbarMessage(result.error || 'Failed to submit application');
            setErrorSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessSnackbar(false);
        setErrorSnackbar(false);
    };

    if (loading) {
        return (
            <Box sx={loadingBoxStyle}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !jobOffer) {
        return (
            <Box sx={containerStyle}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={backButtonStyle}
                >
                    Back to Jobs
                </Button>
                <Alert severity="error" sx={errorAlertStyle}>
                    {error || 'Job offer not found'}
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={containerStyle}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={backButtonStyle}
            >
                Back to Jobs
            </Button>

            <Paper sx={paperStyle}>
                <Box sx={headerSectionStyle}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <Typography variant="h4" sx={titleStyle}>
                            {jobOffer.title}
                        </Typography>
                        <Box sx={salaryBoxStyle}>
                            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1.1rem', color: 'white' }}>
                                {formatSalary(jobOffer.salary)}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="h6" sx={companyNameStyle}>
                        {jobOffer.companyName}
                    </Typography>
                    <Typography sx={creatorStyle}>
                        Posted by {jobOffer.creator.firstName} {jobOffer.creator.lastName}
                    </Typography>

                    <Box sx={headerDetailsStyle}>
                        <Chip
                            label={jobOffer.offerStatus}
                            color={jobOffer.offerStatus === 'OPEN' ? 'success' : 'default'}
                            sx={statusChipStyle}
                        />
                        <Chip
                            label={jobOffer.category.name}
                            variant="outlined"
                            color="primary"
                        />
                        {isUser && jobOffer.offerStatus === 'OPEN' && (
                            <Tooltip
                                title={!canApply && !checkingCanApply ? 'You have already applied to this job' : ''}
                                arrow
                                placement="top"
                            >
                                <span style={{ marginLeft: 'auto' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<WorkIcon />}
                                        onClick={handleOpenApplyDialog}
                                        disabled={checkingCanApply || !canApply}
                                        sx={{ textTransform: 'none', fontWeight: 600 }}
                                    >
                                        {checkingCanApply ? 'Checking...' : 'Apply for this Job'}
                                    </Button>
                                </span>
                            </Tooltip>
                        )}
                    </Box>
                </Box>

                <Box sx={sectionStyle}>
                    <Typography variant="h6" sx={sectionTitleStyle}>
                        Job Description
                    </Typography>
                    <Typography sx={descriptionTextStyle}>
                        {jobOffer.description}
                    </Typography>
                </Box>

                <Box sx={sectionStyle}>
                    <Typography variant="h6" sx={sectionTitleStyle}>
                        Job Details
                    </Typography>
                    <Box sx={detailsGridStyle}>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Work Type</Typography>
                            <Typography sx={detailValueStyle}>
                                {formatWorkType(jobOffer.workType)}
                            </Typography>
                        </Box>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Location</Typography>
                            <Typography sx={detailValueStyle}>
                                {jobOffer.location}
                            </Typography>
                        </Box>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Experience Required</Typography>
                            <Typography sx={detailValueStyle}>
                                {jobOffer.yearsOfExperience} {jobOffer.yearsOfExperience === 1 ? 'year' : 'years'}
                            </Typography>
                        </Box>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Posted On</Typography>
                            <Typography sx={detailValueStyle}>
                                {formatDate(jobOffer.createdAt)}
                            </Typography>
                        </Box>
                        <Box sx={detailItemStyle}>
                            <Typography sx={detailLabelStyle}>Last Updated</Typography>
                            <Typography sx={detailValueStyle}>
                                {formatDate(jobOffer.updatedAt)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={sectionStyle}>
                    <Typography variant="h6" sx={sectionTitleStyle}>
                        Contact Information
                    </Typography>
                    <Box sx={contactBoxStyle}>
                        <Box sx={contactItemStyle}>
                            <EmailIcon color="primary" />
                            <Typography>{jobOffer.contactEmail}</Typography>
                        </Box>
                        {jobOffer.contactPhone && (
                            <Box sx={contactItemStyle}>
                                <PhoneIcon color="primary" />
                                <Typography>{jobOffer.contactPhone}</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Paper>

            <Dialog open={openApplyDialog} onClose={handleCloseApplyDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Apply for {jobOffer.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: '1rem' }}>
                        You are about to apply for this position at {jobOffer.companyName}.
                        You can optionally add a comment to your application.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment (Optional)"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={applicationComment}
                        onChange={(e) => setApplicationComment(e.target.value)}
                        placeholder="Add any additional information you'd like the employer to know..."
                    />
                </DialogContent>
                <DialogActions sx={{ padding: '1rem 1.5rem' }}>
                    <Button onClick={handleCloseApplyDialog} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleApply}
                        variant="contained"
                        color="primary"
                        disabled={applyLoading}
                    >
                        {applyLoading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={successSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Snackbar
                open={errorSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default JobDetails;

