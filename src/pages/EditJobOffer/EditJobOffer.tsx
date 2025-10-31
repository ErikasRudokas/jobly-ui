import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import {useCategories} from '../../common/hooks/useCategories';
import {ROUTES} from '../../common/constants/routes';
import {type JobOfferFormData, jobOfferSchema} from '../CreateJobOffer/jobOfferSchema';
import type {Category} from '../../common/types/category.types';
import {
    backButtonStyle,
    containerStyle,
    errorAlertStyle,
    formStyle,
    loadingBoxStyle,
    paperStyle,
    submitButtonStyle,
    titleStyle,
} from '../CreateJobOffer/styles';

const EditJobOffer = () => {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {getMineJobOfferDetails, updateJobOffer, loading: submitting, error} = useJobOffers();
    const {getAllCategories, loading: categoriesLoading} = useCategories();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<JobOfferFormData>({
        resolver: zodResolver(jobOfferSchema),
    });

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;

            const [categoriesResponse, jobOfferResponse] = await Promise.all([
                getAllCategories(),
                getMineJobOfferDetails(parseInt(id)),
            ]);

            if (categoriesResponse) {
                setCategories(categoriesResponse.categories);
            }

            if (jobOfferResponse) {
                const {jobOffer} = jobOfferResponse;
                reset({
                    title: jobOffer.title,
                    description: jobOffer.description,
                    companyName: jobOffer.companyName,
                    salary: jobOffer.salary,
                    yearsOfExperience: jobOffer.yearsOfExperience,
                    workType: jobOffer.workType,
                    location: jobOffer.location,
                    contactEmail: jobOffer.contactEmail,
                    contactPhone: jobOffer.contactPhone || '',
                    categoryId: jobOffer.category.id,
                });
            }

            setLoading(false);
        };
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onSubmit = async (data: JobOfferFormData) => {
        if (!id) return;
        setApiError(null);

        const result = await updateJobOffer(parseInt(id), data);
        if (result) {
            navigate(ROUTES.MY_JOB_OFFER_DETAILS(parseInt(id)));
        } else if (error) {
            setApiError(error);
        }
    };

    const handleBack = () => {
        if (id) {
            navigate(ROUTES.MY_JOB_OFFER_DETAILS(parseInt(id)));
        } else {
            navigate(ROUTES.MY_JOB_OFFERS);
        }
    };

    if (loading || categoriesLoading) {
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
                Back to Job Offer
            </Button>

            <Paper sx={paperStyle}>
                <Typography variant="h4" sx={titleStyle}>
                    Edit Job Offer
                </Typography>

                {(error || apiError) && (
                    <Alert severity="error" sx={errorAlertStyle}>
                        {error || apiError}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={formStyle}>
                    <TextField
                        {...register('title')}
                        label="Job Title"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        fullWidth
                        disabled={submitting}
                    />

                    <TextField
                        {...register('companyName')}
                        label="Company Name"
                        error={!!errors.companyName}
                        helperText={errors.companyName?.message}
                        fullWidth
                        disabled={submitting}
                    />

                    <TextField
                        {...register('description')}
                        label="Job Description"
                        multiline
                        rows={6}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        fullWidth
                        disabled={submitting}
                    />

                    <Controller
                        name="categoryId"
                        control={control}
                        render={({field}) => (
                            <FormControl fullWidth error={!!errors.categoryId} disabled={submitting}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    {...field}
                                    label="Category"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.categoryId && (
                                    <FormHelperText>{errors.categoryId.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    <TextField
                        {...register('salary', {valueAsNumber: true})}
                        label="Salary (EUR)"
                        type="number"
                        error={!!errors.salary}
                        helperText={errors.salary?.message}
                        fullWidth
                        disabled={submitting}
                    />

                    <TextField
                        {...register('yearsOfExperience', {valueAsNumber: true})}
                        label="Years of Experience"
                        type="number"
                        error={!!errors.yearsOfExperience}
                        helperText={errors.yearsOfExperience?.message}
                        fullWidth
                        disabled={submitting}
                    />

                    <Controller
                        name="workType"
                        control={control}
                        render={({field}) => (
                            <FormControl fullWidth error={!!errors.workType} disabled={submitting}>
                                <InputLabel>Work Type</InputLabel>
                                <Select
                                    {...field}
                                    label="Work Type"
                                >
                                    <MenuItem value="ON_SITE">On Site</MenuItem>
                                    <MenuItem value="REMOTE">Remote</MenuItem>
                                    <MenuItem value="HYBRID">Hybrid</MenuItem>
                                </Select>
                                {errors.workType && (
                                    <FormHelperText>{errors.workType.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    <TextField
                        {...register('location')}
                        label="Location"
                        error={!!errors.location}
                        helperText={errors.location?.message}
                        fullWidth
                        disabled={submitting}
                    />

                    <TextField
                        {...register('contactEmail')}
                        label="Contact Email"
                        type="email"
                        error={!!errors.contactEmail}
                        helperText={errors.contactEmail?.message}
                        fullWidth
                        disabled={submitting}
                    />

                    <TextField
                        {...register('contactPhone')}
                        label="Contact Phone (Optional)"
                        error={!!errors.contactPhone}
                        helperText={errors.contactPhone?.message}
                        fullWidth
                        disabled={submitting}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={submitting}
                        sx={submitButtonStyle}
                    >
                        {submitting ? <CircularProgress size={24} /> : 'Update Job Offer'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default EditJobOffer;

