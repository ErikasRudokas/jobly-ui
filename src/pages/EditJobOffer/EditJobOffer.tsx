import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Alert, Box, CircularProgress, Paper,} from '@mui/material';
import {useJobOffers} from '../../common/hooks/useJobOffers';
import {useCategories} from '../../common/hooks/useCategories';
import {ROUTES} from '../../common/constants/routes';
import {type JobOfferFormData, jobOfferSchema} from '../CreateJobOffer/jobOfferSchema';
import type {Category} from '../../common/types/category.types';
import type {UpdateJobOfferSkill} from '../../common/types/jobOffer.types';
import JobOfferFormHeader from '../../components/JobOfferForm/JobOfferFormHeader';
import JobOfferFormDescription from '../../components/JobOfferForm/JobOfferFormDescription';
import JobOfferFormDetails from '../../components/JobOfferForm/JobOfferFormDetails';
import JobOfferFormContact from '../../components/JobOfferForm/JobOfferFormContact';
import {containerStyle, errorAlertStyle, loadingBoxStyle, paperStyle,} from '../CreateJobOffer/styles';
import EditJobOfferSkillSection from "../../components/SaveJobOfferSkillSection/EditJobOfferSkillSection.tsx";
import BackButton from '../../components/BackButton/BackButton';
import AppButton from '../../components/AppButton/AppButton';

const EditJobOffer = () => {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {getMineJobOfferDetails, updateJobOffer, loading: submitting, error} = useJobOffers();
    const {getAllCategories, loading: categoriesLoading} = useCategories();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<UpdateJobOfferSkill[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
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

                if (jobOffer.skills && jobOffer.skills.length > 0) {
                    const initialSkills: UpdateJobOfferSkill[] = jobOffer.skills.map(skill => ({
                        skillId: skill.skillId,
                        proficiency: skill.proficiency,
                        delete: false,
                        isNew: false,
                    }));
                    setSelectedSkills(initialSkills);

                    setValue('skills', initialSkills.map(s => ({
                        skillId: s.skillId,
                        proficiency: s.proficiency,
                    })));
                } else {
                    setValue('skills', []);
                }
            }

            setLoading(false);
        };
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSkillsChange = (skills: UpdateJobOfferSkill[]) => {
        setSelectedSkills(skills);

        setValue('skills', skills.map(s => ({
            skillId: s.skillId,
            proficiency: s.proficiency,
        })), { shouldValidate: true });
    };

    const onSubmit = async (data: JobOfferFormData) => {
        if (!id) return;
        setApiError(null);

        const skillsToSend = selectedSkills.map(skill => ({
            skillId: skill.skillId,
            proficiency: skill.proficiency,
            ...(skill.delete && { delete: skill.delete })
        }));

        const updateData = {
            ...data,
            skills: skillsToSend,
        };

        const result = await updateJobOffer(parseInt(id), updateData);

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
            <BackButton label="Back to Job Offer" onClick={handleBack} />


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

                    <EditJobOfferSkillSection
                        selectedSkills={selectedSkills}
                        onSkillsChange={handleSkillsChange}
                    />

                    <Box sx={{marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                        <AppButton variant="outlined" onClick={handleBack} disabled={submitting}>Cancel</AppButton>
                        <AppButton type="submit" loading={submitting}>Update Job Offer</AppButton>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default EditJobOffer;
