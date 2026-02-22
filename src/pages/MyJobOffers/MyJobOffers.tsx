import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert, Box, CircularProgress, Typography} from '@mui/material';
import {Add as AddIcon} from '@mui/icons-material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import type {JobOfferListObject} from '../../common/types/jobOffer.types';
import {ROUTES} from '../../common/constants/routes';
import JobOfferList from '../../components/JobOfferList/JobOfferList';
import AppButton from '../../components/AppButton/AppButton';
import {containerStyle, errorAlertStyle, headerSectionStyle, loadingBoxStyle, titleStyle,} from './styles';

const MyJobOffers = () => {
    const navigate = useNavigate();
    const {getMineJobOffers, loading, error} = useJobOffers();
    const [jobOffers, setJobOffers] = useState<JobOfferListObject[]>([]);

    useEffect(() => {
        const loadJobOffers = async () => {
            const response = await getMineJobOffers();
            if (response) {
                setJobOffers(response.jobOffers);
            }
        };
        loadJobOffers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleJobOfferClick = (id: number) => {
        navigate(ROUTES.MY_JOB_OFFER_DETAILS(id));
    };

    const handleCreateJobOffer = () => {
        navigate(ROUTES.JOB_OFFER_CREATE);
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
                    My Job Offers
                </Typography>
                <AppButton startIcon={<AddIcon />} onClick={handleCreateJobOffer}>
                    Create Job Offer
                </AppButton>
            </Box>

            <JobOfferList
                jobOffers={jobOffers}
                onJobOfferClick={handleJobOfferClick}
                emptyMessage="No job offers yet"
                emptySubMessage="Create your first job offer to start receiving applications"
            />
        </Box>
    );
};

export default MyJobOffers;

