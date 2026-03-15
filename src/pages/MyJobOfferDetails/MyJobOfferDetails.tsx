import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Paper, Typography } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { useJobOffers } from '../../common/hooks/useJobOffers';
import type { ApplicationWithSkillMatch, JobOffer } from '../../common/types/jobOffer.types';
import type { ApplicationStatus } from '../../common/types/application.types';
import { ROUTES } from '../../common/constants/routes';
import SkillsSection from '../../components/SkillsSection/SkillsSection';
import JobDetailsHeader from '../../components/JobDetailsHeader/JobDetailsHeader';
import JobOfferDetailsCard from '../../components/JobOfferDetailsCard/JobOfferDetailsCard';
import ApplicationList from '../../components/ApplicationList/ApplicationList';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import BackButton from '../../components/BackButton/BackButton';
import AppButton from '../../components/AppButton/AppButton';
import PageNavigation from '../../components/PageNavigation/PageNavigation';
import ApplicationStatusFilter from '../../components/ApplicationStatusFilter/ApplicationStatusFilter';
import {
  contactBoxStyle,
  contactItemStyle,
  containerStyle,
  descriptionTextStyle,
  errorAlertStyle,
  loadingBoxStyle,
  paginationRowStyle,
  paperStyle,
  resultsInfoStyle,
  sectionStyle,
  sectionTitleStyle,
  topActionsRowStyle,
} from './styles';

const PAGE_SIZE = 10;

const MyJobOfferDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { getMineJobOfferDetails, getMineJobOfferApplications, deleteJobOffer, loading, error } = useJobOffers();

  const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
  const [applications, setApplications] = useState<ApplicationWithSkillMatch[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'ALL'>('ALL');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const shouldScrollRef = useRef(false);
  const applicationListRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.max(1, Math.ceil(totalApplications / PAGE_SIZE));

  const loadApplications = useCallback(
    async (offerId: number, page: number, status: ApplicationStatus | 'ALL') => {
      const offset = (page - 1) * PAGE_SIZE;
      const response = await getMineJobOfferApplications(offerId, {
        offset,
        limit: PAGE_SIZE,
        status: status === 'ALL' ? null : status,
      });
      if (response) {
        setApplications(response.applications);
        setTotalApplications(response.totalApplications);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const numericId = parseInt(id);
      const detailsResponse = await getMineJobOfferDetails(numericId);
      if (detailsResponse) setJobOffer(detailsResponse.jobOffer);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!id) return;
    loadApplications(parseInt(id), currentPage, statusFilter);
  }, [id, currentPage, statusFilter, loadApplications]);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const timer = setTimeout(() => {
        applicationListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [applications]);

  const handleBack = () => navigate(`${ROUTES.MY_JOB_OFFERS}${location.search || ''}`);

  const handleEdit = () => {
    if (id) navigate(ROUTES.JOB_OFFER_EDIT(parseInt(id)));
  };

  const handleDeleteClick = () => setIsDeleteDialogOpen(true);
  const handleDeleteCancel = () => setIsDeleteDialogOpen(false);

  const handleDeleteConfirm = async () => {
    if (!id) return;
    const success = await deleteJobOffer(parseInt(id));
    if (success) navigate(`${ROUTES.MY_JOB_OFFERS}${location.search || ''}`);
    setIsDeleteDialogOpen(false);
  };

  const handleStatusChange = (value: ApplicationStatus | 'ALL') => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    shouldScrollRef.current = true;
    setCurrentPage(page);
  };

  const handleApplicationsChange = (updatedApplications: ApplicationWithSkillMatch[]) => {
    setApplications(updatedApplications);
    if (statusFilter !== 'ALL' && id) {
      loadApplications(parseInt(id), currentPage, statusFilter);
    }
  };

  const startItem = totalApplications === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalApplications);

  if (loading && !jobOffer) {
    return (
      <Box sx={loadingBoxStyle}>
        <CircularProgress />
      </Box>
    );
  }

  if (!jobOffer) {
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
      {error && (
        <Alert severity="error" sx={errorAlertStyle}>
          {error}
        </Alert>
      )}

      <Box sx={topActionsRowStyle}>
        <BackButton label="Back to My Job Offers" onClick={handleBack} />
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <AppButton startIcon={<EditIcon />} onClick={handleEdit}>
            Edit
          </AppButton>
          <AppButton variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
            Delete
          </AppButton>
        </Box>
      </Box>

      <Paper sx={paperStyle}>
        <JobDetailsHeader jobOffer={jobOffer} />

        <Box sx={sectionStyle}>
          <Typography variant="h6" sx={sectionTitleStyle}>
            Job Description
          </Typography>
          <Typography sx={descriptionTextStyle}>{jobOffer.description}</Typography>
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

      <Box ref={applicationListRef}>
        <ApplicationStatusFilter value={statusFilter} onChange={handleStatusChange} includeWithdrawn={false} />

        <ApplicationList
          applications={applications}
          totalApplications={totalApplications}
          onApplicationsChange={handleApplicationsChange}
          emptyTitle="No applications found"
          emptySubtitle={
            statusFilter !== 'ALL'
              ? `No ${statusFilter.toLowerCase()} applications`
              : 'Applications will appear here when candidates apply'
          }
        />

        {totalApplications > 0 && (
          <Box sx={paginationRowStyle}>
            <PageNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <Typography sx={resultsInfoStyle}>
              {startItem}–{endItem} of {totalApplications}
            </Typography>
          </Box>
        )}
      </Box>

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
