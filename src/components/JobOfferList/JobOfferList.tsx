import {Box, Typography} from '@mui/material';
import type {JobOfferListObject} from '../../common/types/jobOffer.types';
import JobOfferCard from '../JobOfferCard/JobOfferCard';
import {emptyStateStyle} from './styles';

interface JobOfferListProps {
    jobOffers: JobOfferListObject[];
    onJobOfferClick: (id: number) => void;
    emptyMessage?: string;
    emptySubMessage?: string;
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
                <Typography variant="body2" sx={{mt: 1}}>
                    {emptySubMessage}
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            {jobOffers.map((job) => (
                <JobOfferCard
                    key={job.id}
                    jobOffer={job}
                    onClick={onJobOfferClick}
                />
            ))}
        </Box>
    );
};

export default JobOfferList;

