import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Alert, Box, Button, Paper, TextField, Typography} from '@mui/material';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {useCategories} from '../../common/hooks/useCategories';
import {ROUTES} from '../../common/constants/routes';
import {type CategoryFormData, categorySchema} from '../Categories/categorySchema';
import {
    backButtonStyle,
    buttonGroupStyle,
    cancelButtonStyle,
    containerStyle,
    errorAlertStyle,
    formCardStyle,
    formFieldStyle,
    submitButtonStyle,
    titleStyle,
} from './styles';

const CreateCategory = () => {
    const navigate = useNavigate();
    const { createCategory, loading, error } = useCategories();
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
    });

    const handleBack = () => {
        navigate(ROUTES.CATEGORIES);
    };

    const onSubmit = async (data: CategoryFormData) => {
        setApiError(null);

        const result = await createCategory({
            name: data.name.trim(),
            description: data.description.trim(),
        });

        if (result) {
            navigate(ROUTES.CATEGORIES);
        } else if (error) {
            setApiError(error);
        }
    };

    const handleCancel = () => {
        navigate(ROUTES.CATEGORIES);
    };

    return (
        <Box sx={containerStyle}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={backButtonStyle}
            >
                Back to Categories
            </Button>

            <Typography variant="h4" sx={titleStyle}>
                Create New Category
            </Typography>

            {(error || apiError) && (
                <Alert severity="error" sx={errorAlertStyle}>
                    {error || apiError}
                </Alert>
            )}

            <Paper sx={formCardStyle}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={formFieldStyle}>
                        <TextField
                            fullWidth
                            label="Category Name"
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            variant="outlined"
                            disabled={loading}
                        />
                    </Box>

                    <Box sx={formFieldStyle}>
                        <TextField
                            fullWidth
                            label="Description"
                            {...register('description')}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            variant="outlined"
                            multiline
                            rows={4}
                            disabled={loading}
                        />
                    </Box>

                    <Box sx={buttonGroupStyle}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={submitButtonStyle}
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Category'}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={cancelButtonStyle}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateCategory;

