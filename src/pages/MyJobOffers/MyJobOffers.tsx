import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert, Box, Button, Chip, CircularProgress, Paper, Typography,} from '@mui/material';
import {
    Add as AddIcon,
    Category as CategoryIcon,
    LocationOn as LocationIcon,
    Work as WorkIcon,
} from '@mui/icons-material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import type {JobOfferListObject, WorkType} from '../../common/types/jobOffer.types';
import {ROUTES} from '../../common/constants/routes';
import {formatSalary} from '../../common/utils/salaryUtils';
import {
    categoryChipStyle,
    companyNameStyle,
    containerStyle,
    createButtonStyle,
    emptyStateStyle,
    errorAlertStyle,
    headerSectionStyle,
    jobCardHeaderStyle,
    jobCardStyle,
    jobDetailItemStyle,
    jobDetailsRowStyle,
    jobTitleStyle,
    loadingBoxStyle,
    salaryChipStyle,
    titleStyle,
} from './styles';

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

    const handleViewJob = (id: number) => {
        navigate(ROUTES.MY_JOB_OFFER_DETAILS(id));
    };

    const handleCreateJobOffer = () => {
        navigate(ROUTES.JOB_OFFER_CREATE);
    };


    const formatWorkType = (workType: WorkType) => {
        return workType.replace('_', ' ');
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
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateJobOffer}
                    sx={createButtonStyle}
                >
                    Create Job Offer
                </Button>
            </Box>

            {jobOffers.length === 0 ? (
                <Box sx={emptyStateStyle}>
                    <Typography variant="h6">No job offers yet</Typography>
                    <Typography variant="body2" sx={{mt: 1}}>
                        Create your first job offer to start receiving applications
                    </Typography>
                </Box>
            ) : (
                <Box>
                    {jobOffers.map((job) => (
                        <Paper
                            key={job.id}
                            sx={jobCardStyle}
                            onClick={() => handleViewJob(job.id)}
                        >
                            <Box sx={jobCardHeaderStyle}>
                                <Box>
                                    <Typography variant="h6" sx={jobTitleStyle}>
                                        {job.title}
                                    </Typography>
                                    <Typography variant="body2" sx={companyNameStyle}>
                                        {job.companyName}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={formatSalary(job.salary)}
                                    color="primary"
                                    sx={salaryChipStyle}
                                />
                            </Box>

                            <Box sx={jobDetailsRowStyle}>
                                <Box sx={jobDetailItemStyle}>
                                    <WorkIcon fontSize="small" />
                                    <Typography variant="body2">
                                        {formatWorkType(job.workType)}
                                    </Typography>
                                </Box>
                                <Box sx={jobDetailItemStyle}>
                                    <LocationIcon fontSize="small" />
                                    <Typography variant="body2">
                                        {job.location}
                                    </Typography>
                                </Box>
                                <Box sx={jobDetailItemStyle}>
                                    <CategoryIcon fontSize="small" />
                                    <Chip
                                        label={job.category.name}
                                        size="small"
                                        variant="outlined"
                                        sx={categoryChipStyle}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default MyJobOffers;

