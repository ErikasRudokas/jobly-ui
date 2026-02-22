import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Alert, Box, CircularProgress, Paper, TextField, Typography,} from '@mui/material';
import {useApplications} from '../../common/hooks/useApplications';
import type {MyApplication} from '../../common/types/application.types';
import {ROUTES} from '../../common/constants/routes';
import {type ApplicationUpdateFormData, applicationUpdateSchema} from './applicationSchema';
import BackButton from '../../components/BackButton/BackButton';
import AppButton from '../../components/AppButton/AppButton';
import {
    containerStyle,
    errorAlertStyle,
    formStyle,
    jobCompanyStyle,
    jobInfoBoxStyle,
    jobTitleStyle,
    loadingBoxStyle,
    paperStyle,
} from './styles';

function EditApplication() {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {getMyApplicationDetails, updateApplication, loading, error} = useApplications();
    const [application, setApplication] = useState<MyApplication | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<ApplicationUpdateFormData>({
        resolver: zodResolver(applicationUpdateSchema),
    });

    useEffect(() => {
        const loadApplication = async () => {
            if (!id) return;
            const data = await getMyApplicationDetails(parseInt(id));
            if (data) {
                setApplication(data);
                reset({
                    comment: data.comment || '',
                });
            }
            setIsLoading(false);
        };
        loadApplication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleBack = () => {
        if (id) {
            navigate(ROUTES.MY_APPLICATION_DETAILS(parseInt(id)));
        }
    };

    const onSubmit = async (data: ApplicationUpdateFormData) => {
        if (!id) return;
        setApiError(null);

        const result = await updateApplication(parseInt(id), {
            comment: data.comment || undefined,
        });

        if (result) {
            navigate(ROUTES.MY_APPLICATION_DETAILS(parseInt(id)));
        } else if (error) {
            setApiError(error);
        }
    };

    if (isLoading) {
        return (
            <Box sx={loadingBoxStyle}>
                <CircularProgress />
            </Box>
        );
    }

    if (!application) {
        return (
            <Box sx={containerStyle}>
                <BackButton label="Back" onClick={handleBack} />
                <Alert severity="error" sx={errorAlertStyle}>
                    Application not found
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={containerStyle}>
            <BackButton label="Back to Application Details" onClick={handleBack} />

            <Paper sx={paperStyle}>
                <Box sx={jobInfoBoxStyle}>
                    <Typography variant="h6" sx={jobTitleStyle}>
                        {application.jobOffer.title}
                    </Typography>
                    <Typography variant="body2" sx={jobCompanyStyle}>
                        {application.jobOffer.companyName}
                    </Typography>
                </Box>

                {(error || apiError) && (
                    <Alert severity="error" sx={errorAlertStyle}>
                        {error || apiError}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formStyle}>
                    <TextField
                        {...register('comment')}
                        label="Comment (Optional)"
                        multiline
                        rows={6}
                        error={!!errors.comment}
                        helperText={errors.comment?.message}
                        fullWidth
                        disabled={loading}
                        placeholder="Add any additional information or update your application message..."
                    />

                    <AppButton type="submit" loading={loading}>Update Application</AppButton>
                </Box>
            </Paper>
        </Box>
    );
}

export default EditApplication;

