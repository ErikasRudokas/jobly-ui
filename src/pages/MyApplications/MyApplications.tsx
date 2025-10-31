import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert, Box, Button, Chip, CircularProgress, Paper, Typography,} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Category as CategoryIcon,
    LocationOn as LocationIcon,
    Work as WorkIcon,
} from '@mui/icons-material';
import {useApplications} from '../../common/hooks/useApplications';
import type {MyApplicationListObject, WorkType} from '../../common/types/application.types';
import {ROUTES} from '../../common/constants/routes';
import {formatSalary} from '../../common/utils/salaryUtils';
import {
    applicationCardStyle,
    backButtonStyle,
    cardHeaderStyle,
    categoryChipStyle,
    companyNameStyle,
    containerStyle,
    emptyStateStyle,
    errorAlertStyle,
    jobDetailItemStyle,
    jobDetailsRowStyle,
    jobTitleStyle,
    loadingBoxStyle,
    statusChipStyle,
    titleStyle,
    updatedDateStyle,
} from './styles';

function MyApplications() {
    const navigate = useNavigate();
    const {getMyApplications, loading, error} = useApplications();
    const [applications, setApplications] = useState<MyApplicationListObject[]>([]);

    useEffect(() => {
        const loadApplications = async () => {
            const response = await getMyApplications();
            if (response) {
                setApplications(response.applications);
            }
        };
        loadApplications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleViewApplication = (id: number) => {
        navigate(ROUTES.MY_APPLICATION_DETAILS(id));
    };

    const handleBack = () => {
        navigate(ROUTES.HOME);
    };


    const formatWorkType = (workType: WorkType) => {
        return workType.replace('_', ' ');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
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
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={backButtonStyle}
            >
                Back to Home
            </Button>

            {error && (
                <Alert severity="error" sx={errorAlertStyle}>
                    {error}
                </Alert>
            )}

            <Typography variant="h4" sx={titleStyle}>
                My Applications
            </Typography>

            {applications.length === 0 ? (
                <Box sx={emptyStateStyle}>
                    <Typography variant="h6">No applications yet</Typography>
                    <Typography variant="body2" sx={{mt: 1}}>
                        Browse job offers and apply to start your journey
                    </Typography>
                </Box>
            ) : (
                <Box>
                    {applications.map((application) => (
                        <Paper
                            key={application.id}
                            sx={applicationCardStyle}
                            onClick={() => handleViewApplication(application.id)}
                        >
                            <Box sx={cardHeaderStyle}>
                                <Box>
                                    <Typography variant="h6" sx={jobTitleStyle}>
                                        {application.jobOffer.title}
                                    </Typography>
                                    <Typography variant="body2" sx={companyNameStyle}>
                                        {application.jobOffer.companyName}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={application.applicationStatus}
                                    sx={statusChipStyle}
                                />
                            </Box>

                            <Box sx={jobDetailsRowStyle}>
                                <Box sx={jobDetailItemStyle}>
                                    <WorkIcon fontSize="small" />
                                    <Typography variant="body2">
                                        {formatWorkType(application.jobOffer.workType)}
                                    </Typography>
                                </Box>
                                <Box sx={jobDetailItemStyle}>
                                    <LocationIcon fontSize="small" />
                                    <Typography variant="body2">
                                        {application.jobOffer.location}
                                    </Typography>
                                </Box>
                                <Box sx={jobDetailItemStyle}>
                                    <CategoryIcon fontSize="small" />
                                    <Chip
                                        label={application.jobOffer.category.name}
                                        size="small"
                                        variant="outlined"
                                        sx={categoryChipStyle}
                                    />
                                </Box>
                                <Box sx={jobDetailItemStyle}>
                                    <Typography variant="body2" sx={{fontWeight: 600}}>
                                        {formatSalary(application.jobOffer.salary)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography sx={updatedDateStyle}>
                                Last updated: {formatDate(application.updatedAt)}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default MyApplications;

