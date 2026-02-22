import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert, Box, CircularProgress, Typography} from '@mui/material';
import {useApplications} from '../../common/hooks/useApplications';
import type {MyApplicationListObject} from '../../common/types/application.types';
import {ROUTES} from '../../common/constants/routes';
import MyApplicationList from '../../components/MyApplicationList/MyApplicationList';
import {containerStyle, errorAlertStyle, loadingBoxStyle, titleStyle,} from './styles';

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

    const handleApplicationClick = (id: number) => {
        navigate(ROUTES.MY_APPLICATION_DETAILS(id));
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

            <Typography variant="h4" sx={titleStyle}>
                My Applications
            </Typography>

            <MyApplicationList
                applications={applications}
                onApplicationClick={handleApplicationClick}
                emptyMessage="No applications yet"
                emptySubMessage="Browse job offers and apply to start your journey"
            />
        </Box>
    );
}

export default MyApplications;

