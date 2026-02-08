import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert, Box, Chip, CircularProgress, Paper, Typography,} from '@mui/material';
import {Category as CategoryIcon, LocationOn as LocationIcon, Work as WorkIcon,} from '@mui/icons-material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import type {JobOfferListObject, WorkType} from '../../common/types/jobOffer.types';
import {ROUTES} from '../../common/constants/routes';
import {
    categoryChipStyle,
    companyNameStyle,
    containerStyle,
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
    subtitleStyle,
    titleStyle,
} from './styles';
import {formatSalary} from "../../common/utils/genericUtils.ts";

const Jobs = () => {
    const navigate = useNavigate();
    const { getAllJobOffers, loading, error } = useJobOffers();
    const [jobOffers, setJobOffers] = useState<JobOfferListObject[]>([]);

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

    const handleViewJob = (id: number) => {
        navigate(ROUTES.JOB_DETAILS(id));
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
                    Available Jobs
                </Typography>
                <Typography variant="body1" sx={subtitleStyle}>
                    Browse through our current job openings and find your next opportunity
                </Typography>
            </Box>

            {jobOffers.length === 0 ? (
                <Box sx={emptyStateStyle}>
                    <Typography variant="h6">No job offers available</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Check back later for new opportunities
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

export default Jobs;
