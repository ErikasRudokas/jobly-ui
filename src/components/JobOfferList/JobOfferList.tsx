import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import type { JobOfferWithSkillMatchListObject } from '../../common/types/jobOffer.types';
import JobOfferCard from '../JobOfferCard/JobOfferCard';
import { emptyStateStyle } from './styles';

interface JobOfferListProps {
  jobOffers: JobOfferWithSkillMatchListObject[];
  onJobOfferClick: (id: number) => void;
  emptyMessage?: string;
  emptySubMessage?: ReactNode;
}

const JobOfferList = ({
  jobOffers,
  onJobOfferClick,
  emptyMessage = 'No job offers available',
  emptySubMessage = 'Check back later for new opportunities',
}: JobOfferListProps) => {
  if (jobOffers.length === 0) {
    return (
      <Box sx={emptyStateStyle}>
        <Typography variant="h6">{emptyMessage}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {emptySubMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {jobOffers.map((job) => (
        <JobOfferCard key={job.id} jobOffer={job} onClick={onJobOfferClick} />
      ))}
    </Box>
  );
};

export default JobOfferList;
