import { useState } from 'react';
import { Alert, Box, Paper, Snackbar, Typography } from '@mui/material';
import { useApplications } from '../../common/hooks/useApplications';
import { useCVDownload } from '../../common/hooks/useCVDownload';
import type { Applicant, ApplicationWithSkillMatch } from '../../common/types/jobOffer.types';
import ApplicationCard from '../ApplicationCard/ApplicationCard';
import ApplicantProfileModal from '../ApplicantProfileModal/ApplicantProfileModal';
import { emptyStateStyle, panelStyle, titleStyle } from './styles';

interface ApplicationListProps {
  applications: ApplicationWithSkillMatch[];
  onApplicationsChange: (applications: ApplicationWithSkillMatch[]) => void;
}

const ApplicationList = ({ applications, onApplicationsChange }: ApplicationListProps) => {
  const { manageApplication, loading: manageLoading } = useApplications();
  const { downloadCV } = useCVDownload();

  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleDownloadCV = async (cvId: number) => {
    await downloadCV(cvId);
  };

  const handleApprove = async (applicationId: number) => {
    const result = await manageApplication(applicationId, { action: 'APPROVE' });
    if (result.success) {
      setSnackbarMessage('Application approved successfully');
      setSuccessSnackbar(true);
      onApplicationsChange(
        applications.map((a) => (a.id === applicationId ? { ...a, applicationStatus: 'ACCEPTED' as const } : a))
      );
    } else {
      setSnackbarMessage(result.error || 'Failed to approve application');
      setErrorSnackbar(true);
    }
  };

  const handleReject = async (applicationId: number) => {
    const result = await manageApplication(applicationId, { action: 'REJECT' });
    if (result.success) {
      setSnackbarMessage('Application rejected');
      setSuccessSnackbar(true);
      onApplicationsChange(
        applications.map((a) => (a.id === applicationId ? { ...a, applicationStatus: 'REJECTED' as const } : a))
      );
    } else {
      setSnackbarMessage(result.error || 'Failed to reject application');
      setErrorSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessSnackbar(false);
    setErrorSnackbar(false);
  };

  return (
    <>
      <Paper sx={panelStyle}>
        <Typography variant="h5" sx={titleStyle}>
          Applications ({applications.length})
        </Typography>

        {applications.length === 0 ? (
          <Box sx={emptyStateStyle}>
            <Typography variant="h6">No applications yet</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Applications will appear here when candidates apply
            </Typography>
          </Box>
        ) : (
          <Box>
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                manageLoading={manageLoading}
                onCardClick={(app) => setSelectedApplicant(app.applicant)}
                onDownloadCV={handleDownloadCV}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </Box>
        )}
      </Paper>

      <ApplicantProfileModal
        open={selectedApplicant !== null}
        onClose={() => setSelectedApplicant(null)}
        applicant={
          selectedApplicant
            ? {
                userId: selectedApplicant.id,
                firstName: selectedApplicant.firstName,
                lastName: selectedApplicant.lastName,
                email: selectedApplicant.email,
              }
            : null
        }
      />

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
    </>
  );
};

export default ApplicationList;
