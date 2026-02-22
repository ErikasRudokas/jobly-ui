import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Paper } from '@mui/material';
import { Cancel as CancelIcon, Edit as EditIcon } from '@mui/icons-material';
import { useApplications } from '../../common/hooks/useApplications';
import type { MyApplication } from '../../common/types/application.types';
import { ROUTES } from '../../common/constants/routes';
import ApplicationHeader from '../../components/ApplicationHeader/ApplicationHeader';
import ApplicationJobDetails from '../../components/ApplicationJobDetails/ApplicationJobDetails';
import ApplicationComment from '../../components/ApplicationComment/ApplicationComment';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import BackButton from '../../components/BackButton/BackButton';
import AppButton from '../../components/AppButton/AppButton';
import {
  containerStyle,
  errorAlertStyle,
  loadingBoxStyle,
  paperStyle,
  sectionStyle,
  topActionsRowStyle,
} from './styles';

function MyApplicationDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getMyApplicationDetails, cancelApplication, loading, error } = useApplications();
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
  const handleEdit = () => {
    if (id) navigate(ROUTES.MY_APPLICATION_EDIT(parseInt(id)));
  };
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
        <BackButton label="Back to My Applications" onClick={handleBack} />
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
        <BackButton label="Back to My Applications" onClick={handleBack} />
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <AppButton startIcon={<EditIcon />} onClick={handleEdit} disabled={!canEditOrCancel}>
            Edit
          </AppButton>
          <AppButton
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            onClick={handleCancelClick}
            disabled={!canEditOrCancel}
          >
            Cancel Application
          </AppButton>
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
