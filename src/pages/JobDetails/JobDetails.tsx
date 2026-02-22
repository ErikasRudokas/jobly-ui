import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    DialogContentText,
    Paper,
    Snackbar,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import {Email as EmailIcon, Phone as PhoneIcon, Work as WorkIcon,} from '@mui/icons-material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import {useApplications} from '../../common/hooks/useApplications';
import type {JobOffer} from '../../common/types/jobOffer.types';
import {ROUTES} from '../../common/constants/routes';
import {authService} from '../../common/services/authService';
import {ROLES} from '../../common/constants/roleConstants';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import JobDetailsHeader from '../../components/JobDetailsHeader/JobDetailsHeader';
import BackButton from '../../components/BackButton/BackButton';
import {
    applyButtonStyle,
    contactBoxStyle,
    contactItemStyle,
    containerStyle,
    descriptionTextStyle,
    errorAlertStyle,
    loadingBoxStyle,
    paperStyle,
    sectionStyle,
    sectionTitleStyle,
} from './styles';
import JobOfferDetailsCard from "../../components/JobOfferDetailsCard/JobOfferDetailsCard.tsx";
import AppDialog from '../../components/AppDialog/AppDialog';

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
                <BackButton label="Back to Jobs" onClick={handleBack} />
                <Alert severity="error" sx={errorAlertStyle}>
                    {error || 'Job offer not found'}
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={containerStyle}>
            <BackButton label="Back to Jobs" onClick={handleBack} />
            <Paper sx={paperStyle}>
                <Box sx={{ position: 'relative' }}>
                    <JobDetailsHeader jobOffer={jobOffer} />

                    {isUser && jobOffer.offerStatus === 'OPEN' && (
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}>
                            <Tooltip
                                title={!canApply && !checkingCanApply ? 'You have already applied to this job' : ''}
                                arrow
                                placement="top"
                            >
                                <span>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<WorkIcon />}
                                        onClick={handleOpenApplyDialog}
                                        disabled={checkingCanApply || !canApply}
                                        sx={applyButtonStyle}
                                    >
                                        {checkingCanApply ? 'Checking...' : 'Apply Now'}
                                    </Button>
                                </span>
                            </Tooltip>
                        </Box>
                    )}
                </Box>

                <Box sx={sectionStyle}>
                    <Typography variant="h6" sx={sectionTitleStyle}>
                        Job Description
                    </Typography>
                    <Typography sx={descriptionTextStyle}>
                        {jobOffer.description}
                    </Typography>
                </Box>

                <JobOfferDetailsCard jobOffer={jobOffer} />

                {jobOffer.skills && jobOffer.skills.length > 0 && (
                    <Box sx={sectionStyle}>
                        <Typography variant="h6" sx={sectionTitleStyle}>
                            Required Skills
                        </Typography>
                        <SkillsSection skills={jobOffer.skills} />
                    </Box>
                )}

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

            <AppDialog
                open={openApplyDialog}
                title={`Apply for ${jobOffer.title}`}
                onClose={handleCloseApplyDialog}
                maxWidth="sm"
                fullWidth
                actions={[
                    {label: 'Cancel', onClick: handleCloseApplyDialog, color: 'inherit'},
                    {label: applyLoading ? 'Submitting...' : 'Submit Application', onClick: handleApply, variant: 'contained', color: 'primary', disabled: applyLoading},
                ]}
            >
                <DialogContentText sx={{marginBottom: '1rem'}}>
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
            </AppDialog>

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

