import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Snackbar,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
    Edit as EditIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import {useApplications} from '../../common/hooks/useApplications';
import {useCVDownload} from '../../common/hooks/useCVDownload';
import type {Application, JobOffer} from '../../common/types/jobOffer.types';
import {ROUTES} from '../../common/constants/routes';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import JobDetailsHeader from '../../components/JobDetailsHeader/JobDetailsHeader';
import JobOfferDetailsCard from '../../components/JobOfferDetailsCard/JobOfferDetailsCard';
import {
    applicantNameStyle,
    applicationCardStyle,
    applicationDateStyle,
    applicationStatusBadgeStyle,
    backButtonStyle,
    contactBoxStyle,
    contactItemStyle,
    containerStyle,
    deleteButtonStyle,
    descriptionTextStyle,
    dialogActionsStyle,
    downloadCvButtonStyle,
    editButtonStyle,
    emptyApplicationsStyle,
    errorAlertStyle,
    loadingBoxStyle,
    paperStyle,
    sectionStyle,
    sectionTitleStyle,
    topActionsRowStyle,
} from './styles';
import {formatDate} from "../../common/utils/genericUtils.ts";

const MyJobOfferDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {getMineJobOfferDetails, deleteJobOffer, loading, error} = useJobOffers();
    const {manageApplication, loading: manageLoading} = useApplications();
    const {downloadCV} = useCVDownload();
    const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const loadJobOffer = async () => {
            if (!id) return;
            const response = await getMineJobOfferDetails(parseInt(id));
            if (response) {
                setJobOffer(response.jobOffer);
                setApplications(response.applications);
            }
        };
        loadJobOffer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleBack = () => {
        navigate(ROUTES.MY_JOB_OFFERS);
    };

    const handleEdit = () => {
        if (id) {
            navigate(ROUTES.JOB_OFFER_EDIT(parseInt(id)));
        }
    };

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!id) return;
        const success = await deleteJobOffer(parseInt(id));
        if (success) {
            navigate(ROUTES.MY_JOB_OFFERS);
        }
        setIsDeleteDialogOpen(false);
    };

    const handleDeleteCancel = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleDownloadCV = async (cvId: number) => {
        await downloadCV(cvId);
    };

    const handleApproveApplication = async (applicationId: number) => {
        const result = await manageApplication(applicationId, { action: 'APPROVE' });

        if (result.success) {
            setSnackbarMessage('Application approved successfully');
            setSuccessSnackbar(true);

            if (id) {
                const response = await getMineJobOfferDetails(parseInt(id));
                if (response) {
                    setApplications(response.applications);
                }
            }
        } else {
            setSnackbarMessage(result.error || 'Failed to approve application');
            setErrorSnackbar(true);
        }
    };

    const handleRejectApplication = async (applicationId: number) => {
        const result = await manageApplication(applicationId, { action: 'REJECT' });

        if (result.success) {
            setSnackbarMessage('Application rejected');
            setSuccessSnackbar(true);

            if (id) {
                const response = await getMineJobOfferDetails(parseInt(id));
                if (response) {
                    setApplications(response.applications);
                }
            }
        } else {
            setSnackbarMessage(result.error || 'Failed to reject application');
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
                    Back to My Job Offers
                </Button>
                <Alert severity="error" sx={errorAlertStyle}>
                    {error || 'Job offer not found'}
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={containerStyle}>
            <Box sx={topActionsRowStyle}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={backButtonStyle}
                >
                    Back to My Job Offers
                </Button>
                <Box sx={{display: 'flex', gap: '1rem'}}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                        sx={editButtonStyle}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteClick}
                        sx={deleteButtonStyle}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>

            <Paper sx={paperStyle}>
                <JobDetailsHeader jobOffer={jobOffer} />

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

            <Paper sx={paperStyle}>
                <Typography variant="h5" sx={sectionTitleStyle}>
                    Applications ({applications.length})
                </Typography>

                {applications.length === 0 ? (
                    <Box sx={emptyApplicationsStyle}>
                        <Typography variant="h6">No applications yet</Typography>
                        <Typography variant="body2" sx={{mt: 1}}>
                            Applications will appear here when candidates apply
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        {applications.map((application) => (
                            <Paper key={application.id} sx={applicationCardStyle} elevation={2}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                                    <Box>
                                        <Typography sx={applicantNameStyle}>
                                            {application.applicant.firstName} {application.applicant.lastName}
                                        </Typography>
                                        <Typography sx={applicationDateStyle}>
                                            {application.applicant.email}
                                        </Typography>
                                    </Box>
                                    <Box sx={applicationStatusBadgeStyle(application.applicationStatus)}>
                                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
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
                                    <Typography sx={applicationDateStyle}>
                                        Applied: {formatDate(application.createdAt)}
                                    </Typography>
                                    <Box sx={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<DownloadIcon />}
                                            onClick={() => handleDownloadCV(application.cvId)}
                                            sx={downloadCvButtonStyle}
                                        >
                                            Download CV
                                        </Button>
                                        {application.applicationStatus === 'PENDING' && (
                                            <Box sx={{display: 'flex', gap: '0.5rem', alignItems: 'center', borderLeft: '1px solid', borderColor: 'divider', paddingLeft: '1rem'}}>
                                                <Tooltip title="Approve Application" arrow>
                                                    <span>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            size="small"
                                                            onClick={() => handleApproveApplication(application.id)}
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
                                                            onClick={() => handleRejectApplication(application.id)}
                                                            disabled={manageLoading}
                                                            sx={{
                                                                minWidth: 'auto',
                                                                padding: '6px 12px',
                                                                backgroundColor: 'error.main',
                                                                '&:hover': {
                                                                    backgroundColor: 'error.dark',
                                                                },
                                                            }}
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
                        ))}
                    </Box>
                )}
            </Paper>

            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Delete Job Offer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the job offer "{jobOffer?.title}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={dialogActionsStyle}>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
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

export default MyJobOfferDetails;

