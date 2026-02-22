import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Alert, Box, Button, CircularProgress, Paper, Typography,} from '@mui/material';
import {Delete as DeleteIcon, Edit as EditIcon, Email as EmailIcon, Phone as PhoneIcon,} from '@mui/icons-material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import type {Application, JobOffer} from '../../common/types/jobOffer.types';
import {ROUTES} from '../../common/constants/routes';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import JobDetailsHeader from '../../components/JobDetailsHeader/JobDetailsHeader';
import JobOfferDetailsCard from '../../components/JobOfferDetailsCard/JobOfferDetailsCard';
import ApplicationList from '../../components/ApplicationList/ApplicationList';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import BackButton from '../../components/BackButton/BackButton';
import {
    contactBoxStyle,
    contactItemStyle,
    containerStyle,
    deleteButtonStyle,
    descriptionTextStyle,
    editButtonStyle,
    errorAlertStyle,
    loadingBoxStyle,
    paperStyle,
    sectionStyle,
    sectionTitleStyle,
    topActionsRowStyle,
} from './styles';

const MyJobOfferDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {getMineJobOfferDetails, deleteJobOffer, loading, error} = useJobOffers();

    const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

    const handleBack = () => navigate(ROUTES.MY_JOB_OFFERS);

    const handleEdit = () => {
        if (id) navigate(ROUTES.JOB_OFFER_EDIT(parseInt(id)));
    };

    const handleDeleteClick = () => setIsDeleteDialogOpen(true);
    const handleDeleteCancel = () => setIsDeleteDialogOpen(false);

    const handleDeleteConfirm = async () => {
        if (!id) return;
        const success = await deleteJobOffer(parseInt(id));
        if (success) navigate(ROUTES.MY_JOB_OFFERS);
        setIsDeleteDialogOpen(false);
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
                <BackButton label="Back to My Job Offers" onClick={handleBack} />
                <Alert severity="error" sx={errorAlertStyle}>
                    {error || 'Job offer not found'}
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={containerStyle}>
            <Box sx={topActionsRowStyle}>
                <BackButton label="Back to My Job Offers" onClick={handleBack} />
                <Box sx={{display: 'flex', gap: '1rem'}}>
                    <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit} sx={editButtonStyle}>
                        Edit
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteClick} sx={deleteButtonStyle}>
                        Delete
                    </Button>
                </Box>
            </Box>

            <Paper sx={paperStyle}>
                <JobDetailsHeader jobOffer={jobOffer} />

                <Box sx={sectionStyle}>
                    <Typography variant="h6" sx={sectionTitleStyle}>Job Description</Typography>
                    <Typography sx={descriptionTextStyle}>{jobOffer.description}</Typography>
                </Box>

                <JobOfferDetailsCard jobOffer={jobOffer} />

                {jobOffer.skills && jobOffer.skills.length > 0 && (
                    <Box sx={sectionStyle}>
                        <Typography variant="h6" sx={sectionTitleStyle}>Required Skills</Typography>
                        <SkillsSection skills={jobOffer.skills} />
                    </Box>
                )}

                <Box sx={sectionStyle}>
                    <Typography variant="h6" sx={sectionTitleStyle}>Contact Information</Typography>
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

            <ApplicationList
                applications={applications}
                onApplicationsChange={setApplications}
            />

            <ConfirmDialog
                open={isDeleteDialogOpen}
                title="Delete Job Offer"
                description={`Are you sure you want to delete the job offer "${jobOffer?.title}"? This action cannot be undone.`}
                confirmLabel="Delete"
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </Box>
    );
};

export default MyJobOfferDetails;

