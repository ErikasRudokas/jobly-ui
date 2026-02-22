import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Alert, Box, CircularProgress, Paper,} from '@mui/material';
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
import BackButton from '../../components/BackButton/BackButton';
import AppButton from '../../components/AppButton/AppButton';
import {containerStyle, errorAlertStyle, loadingBoxStyle, paperStyle,} from './styles';

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
            <BackButton label="Back to My Job Offers" onClick={handleBack} />
            
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
                        <AppButton variant="outlined" onClick={handleBack} disabled={submitting}>Cancel</AppButton>
                        <AppButton type="submit" loading={submitting}>Create Job Offer</AppButton>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default CreateJobOffer;

