import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Alert, Box, Button, CircularProgress, Paper, Typography,} from '@mui/material';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import {useCategories} from '../../common/hooks/useCategories';
import {ROUTES} from '../../common/constants/routes';
import {type JobOfferFormData, jobOfferSchema} from './jobOfferSchema';
import type {Category} from '../../common/types/category.types';
import type {SkillWithProficiency} from '../../common/types/skill.types';
import JobOfferFormHeader from '../../components/JobOfferForm/JobOfferFormHeader';
import JobOfferFormDescription from '../../components/JobOfferForm/JobOfferFormDescription';
import JobOfferFormDetails from '../../components/JobOfferForm/JobOfferFormDetails';
import JobOfferFormContact from '../../components/JobOfferForm/JobOfferFormContact';
import CreateJobOfferSkillSection from '../../components/SaveJobOfferSkillSection/CreateJobOfferSkillSection';
import {
    backButtonStyle,
    containerStyle,
    errorAlertStyle,
    loadingBoxStyle,
    paperStyle,
    submitButtonStyle,
    titleStyle,
} from './styles';

const CreateJobOffer = () => {
    const navigate = useNavigate();
    const {createJobOffer, loading: submitting, error} = useJobOffers();
    const {getAllCategories, loading: categoriesLoading} = useCategories();
    const [selectedSkills, setSelectedSkills] = useState<SkillWithProficiency[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        setValue,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<JobOfferFormData>({
        resolver: zodResolver(jobOfferSchema),
        defaultValues: {
            title: '',
            description: '',
            companyName: '',
            salary: 0,
            yearsOfExperience: 0,
            workType: 'ON_SITE',
            location: '',
            contactEmail: '',
            skills: [],
            contactPhone: '',
            categoryId: 0,
        },
    });

    useEffect(() => {
        const loadCategories = async () => {
            const response = await getAllCategories();
            if (response) {
                setCategories(response.categories);
            }
        };
        loadCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSkillsChange = (skills: SkillWithProficiency[]) => {
        setSelectedSkills(skills);
        setValue('skills', skills.map(s => ({
            skillId: s.skillId,
            proficiency: s.proficiency,
        })));
    };


    const onSubmit = async (data: JobOfferFormData) => {
        setApiError(null);

        const result = await createJobOffer(data);
        if (result) {
            navigate(ROUTES.MY_JOB_OFFERS);
        } else if (error) {
            setApiError(error);
        }
    };

    const handleBack = () => {
        navigate(ROUTES.MY_JOB_OFFERS);
    };

    if (categoriesLoading) {
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
                Back to My Job Offers
            </Button>

            <Typography variant="h4" sx={titleStyle}>
                Create Job Offer
            </Typography>

            {(error || apiError) && (
                <Alert severity="error" sx={errorAlertStyle}>
                    {error || apiError}
                </Alert>
            )}

            <Paper sx={paperStyle}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <JobOfferFormHeader
                        register={register}
                        control={control}
                        errors={errors}
                        categories={categories}
                        disabled={submitting}
                    />

                    <JobOfferFormDescription
                        register={register}
                        errors={errors}
                        disabled={submitting}
                    />

                    <JobOfferFormDetails
                        register={register}
                        control={control}
                        errors={errors}
                        disabled={submitting}
                    />

                    <JobOfferFormContact
                        register={register}
                        errors={errors}
                        disabled={submitting}
                    />

                    <CreateJobOfferSkillSection
                        selectedSkills={selectedSkills}
                        onSkillsChange={handleSkillsChange}
                        disabled={submitting}
                    />

                    <Box sx={{marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                        <Button
                            variant="outlined"
                            onClick={handleBack}
                            disabled={submitting}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                padding: '0.75rem 2rem',
                                borderRadius: '8px',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={submitting}
                            sx={submitButtonStyle}
                        >
                            {submitting ? <CircularProgress size={24} /> : 'Create Job Offer'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreateJobOffer;

