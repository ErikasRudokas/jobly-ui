import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Alert, Box, Button, CircularProgress, Paper,} from '@mui/material';
import {ArrowBack as ArrowBackIcon, Cancel as CancelIcon, Edit as EditIcon,} from '@mui/icons-material';
import {useApplications} from '../../common/hooks/useApplications';
import type {MyApplication} from '../../common/types/application.types';
import {ROUTES} from '../../common/constants/routes';
import ApplicationHeader from '../../components/ApplicationHeader/ApplicationHeader';
import ApplicationJobDetails from '../../components/ApplicationJobDetails/ApplicationJobDetails';
import ApplicationComment from '../../components/ApplicationComment/ApplicationComment';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import {
    backButtonStyle,
    cancelButtonStyle,
    containerStyle,
    editButtonStyle,
    errorAlertStyle,
    loadingBoxStyle,
    paperStyle,
    sectionStyle,
    topActionsRowStyle,
} from './styles';

function MyApplicationDetails() {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {getMyApplicationDetails, cancelApplication, loading, error} = useApplications();
    const [application, setApplication] = useState<MyApplication | null>(null);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

    useEffect(() => {
        const loadApplication = async () => {
            if (!id) return;
            const data = await getMyApplicationDetails(parseInt(id));
            if (data) setApplication(data);
        };
        loadApplication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleBack = () => navigate(ROUTES.MY_APPLICATIONS);
    const handleEdit = () => { if (id) navigate(ROUTES.MY_APPLICATION_EDIT(parseInt(id))); };
    const handleCancelClick = () => setIsCancelDialogOpen(true);
    const handleCancelDialogClose = () => setIsCancelDialogOpen(false);

    const handleCancelConfirm = async () => {
        if (!id) return;
        const success = await cancelApplication(parseInt(id));
        if (success) navigate(ROUTES.MY_APPLICATIONS);
        setIsCancelDialogOpen(false);
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
                <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={backButtonStyle}>
                    Back to My Applications
                </Button>
                <Alert severity="error" sx={errorAlertStyle}>
                    {error || 'Application not found'}
                </Alert>
            </Box>
        );
    }

    const canEditOrCancel = application.applicationStatus === 'PENDING';

    return (
        <Box sx={containerStyle}>
            <Box sx={topActionsRowStyle}>
                <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={backButtonStyle}>
                    Back to My Applications
                </Button>
                <Box sx={{display: 'flex', gap: '1rem'}}>
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
                <ApplicationHeader
                    title={application.jobOffer.title}
                    companyName={application.jobOffer.companyName}
                    categoryName={application.jobOffer.category.name}
                    applicationStatus={application.applicationStatus}
                    updatedAt={application.updatedAt}
                />

                {application.comment && (
                    <Box sx={sectionStyle}>
                        <ApplicationComment comment={application.comment} />
                    </Box>
                )}

                <Box sx={sectionStyle}>
                    <ApplicationJobDetails
                        salary={application.jobOffer.salary}
                        workType={application.jobOffer.workType}
                        location={application.jobOffer.location}
                    />
                </Box>
            </Paper>

            <ConfirmDialog
                open={isCancelDialogOpen}
                title="Cancel Application"
                description={`Are you sure you want to cancel your application for "${application.jobOffer.title}"? This action cannot be undone.`}
                confirmLabel="Yes, Cancel Application"
                cancelLabel="No, Keep It"
                onConfirm={handleCancelConfirm}
                onCancel={handleCancelDialogClose}
            />
        </Box>
    );
}

export default MyApplicationDetails;

