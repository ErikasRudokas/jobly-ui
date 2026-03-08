import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useJobOffers } from '../../common/hooks/useJobOffers';
import type { JobOfferWithSkillMatchListObject } from '../../common/types/jobOffer.types';
import { ROUTES } from '../../common/constants/routes';
import JobOfferList from '../../components/JobOfferList/JobOfferList';
import {
  containerStyle,
  errorAlertStyle,
  headerSectionStyle,
  loadingBoxStyle,
  subtitleStyle,
  titleStyle,
} from './styles';

const Jobs = () => {
  const navigate = useNavigate();
  const { getAllJobOffers, loading, error } = useJobOffers();
  const [jobOffers, setJobOffers] = useState<JobOfferWithSkillMatchListObject[]>([]);

  useEffect(() => {
    const loadJobOffers = async () => {
      const response = await getAllJobOffers();
      if (response) {
        setJobOffers(response.jobOffers);
      }
    };
    loadJobOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJobOfferClick = (id: number) => {
    navigate(ROUTES.JOB_DETAILS(id));
  };

  if (loading) {
    return (
      <Box sx={loadingBoxStyle}>
        <CircularProgress />
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

      <Box sx={headerSectionStyle}>
        <Typography variant="h4" sx={titleStyle}>
          Available Jobs
        </Typography>
        <Typography variant="body1" sx={subtitleStyle}>
          Browse through our current job openings and find your next opportunity
        </Typography>
      </Box>

      <JobOfferList
        jobOffers={jobOffers}
        onJobOfferClick={handleJobOfferClick}
        emptyMessage="No job offers available"
        emptySubMessage="Check back later for new opportunities"
      />
    </Box>
  );
};

export default Jobs;
