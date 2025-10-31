import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {ArrowBack as ArrowBackIcon, Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import {useCategories} from '../../common/hooks/useCategories';
import type {Category} from '../../common/types/category.types';
import {ROUTES} from '../../common/constants/routes';
import {type CategoryFormData, categorySchema} from '../Categories/categorySchema';
import {
    actionButtonsStyle,
    backButtonStyle,
    containerStyle,
    deleteButtonStyle,
    detailLabelStyle,
    detailRowStyle,
    detailsCardStyle,
    detailValueStyle,
    dialogActionsStyle,
    editButtonStyle,
    errorAlertStyle,
    headerSectionStyle,
    loadingBoxStyle,
    titleStyle,
} from './styles';

const CategoryDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getCategoryById, updateCategory, deleteCategory, loading, error } = useCategories();
    const [category, setCategory] = useState<Category | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
    });

    useEffect(() => {
        const loadCategory = async () => {
            if (!id) return;
            const data = await getCategoryById(parseInt(id));
            if (data) {
                setCategory(data);
            }
        };
        if (id) {
            loadCategory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleBack = () => {
        navigate(ROUTES.CATEGORIES);
    };

    const handleEdit = () => {
        if (category) {
            reset({
                name: category.name,
                description: category.description,
            });
        }
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        if (category) {
            reset({
                name: category.name,
                description: category.description,
            });
        }
    };

    const onSubmitEdit = async (data: CategoryFormData) => {
        if (!id) return;
        const updated = await updateCategory(parseInt(id), {
            name: data.name.trim(),
            description: data.description.trim(),
        });
        if (updated) {
            setCategory(updated);
            setIsEditMode(false);
        }
    };

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!id) return;
        const success = await deleteCategory(parseInt(id));
        if (success) {
            navigate(ROUTES.CATEGORIES);
        }
        setIsDeleteDialogOpen(false);
    };

    const handleDeleteCancel = () => {
        setIsDeleteDialogOpen(false);
    };

    if (loading && !category) {
        return (
            <Box sx={loadingBoxStyle}>
                <CircularProgress />
            </Box>
        );
    }

    if (!category && !loading) {
        return (
            <Box sx={containerStyle}>
                <Alert severity="error">Category not found</Alert>
            </Box>
        );
    }

    return (
        <Box sx={containerStyle}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                    sx={backButtonStyle}
                >
                    Back to Categories
                </Button>
                {!isEditMode && (
                    <Box sx={actionButtonsStyle}>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                            sx={editButtonStyle}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteClick}
                            sx={deleteButtonStyle}
                        >
                            Delete
                        </Button>
                    </Box>
                )}
            </Box>

            {error && (
                <Alert severity="error" sx={errorAlertStyle}>
                    {error}
                </Alert>
            )}

            <Box sx={headerSectionStyle}>
                <Typography variant="h4" sx={titleStyle}>
                    Category Details
                </Typography>
            </Box>

            <Paper sx={detailsCardStyle}>
                {isEditMode ? (
                    <form onSubmit={handleSubmit(onSubmitEdit)}>
                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                ID
                            </Typography>
                            <Typography variant="body1" sx={detailValueStyle}>
                                {category?.id}
                            </Typography>
                        </Box>

                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                Name
                            </Typography>
                            <TextField
                                fullWidth
                                {...register('name')}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                variant="outlined"
                                size="small"
                                disabled={loading}
                            />
                        </Box>

                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                Description
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                {...register('description')}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                variant="outlined"
                                disabled={loading}
                            />
                        </Box>

                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                Created At
                            </Typography>
                            <Typography variant="body1" sx={detailValueStyle}>
                                {category?.createdAt &&
                                    new Date(category.createdAt).toLocaleString()}
                            </Typography>
                        </Box>

                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                Updated At
                            </Typography>
                            <Typography variant="body1" sx={detailValueStyle}>
                                {category?.updatedAt &&
                                    new Date(category.updatedAt).toLocaleString()}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                Save
                            </Button>
                            <Button variant="outlined" onClick={handleCancelEdit} type="button">
                                Cancel
                            </Button>
                        </Box>
                    </form>
                ) : (
                    <>
                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                ID
                            </Typography>
                            <Typography variant="body1" sx={detailValueStyle}>
                                {category?.id}
                            </Typography>
                        </Box>

                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                Name
                            </Typography>
                            <Typography variant="body1" sx={detailValueStyle}>
                                {category?.name}
                            </Typography>
                        </Box>

                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                Description
                            </Typography>
                            <Typography variant="body1" sx={detailValueStyle}>
                                {category?.description}
                            </Typography>
                        </Box>

                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                Created At
                            </Typography>
                            <Typography variant="body1" sx={detailValueStyle}>
                                {category?.createdAt &&
                                    new Date(category.createdAt).toLocaleString()}
                            </Typography>
                        </Box>

                        <Box sx={detailRowStyle}>
                            <Typography variant="body2" sx={detailLabelStyle}>
                                Updated At
                            </Typography>
                            <Typography variant="body1" sx={detailValueStyle}>
                                {category?.updatedAt &&
                                    new Date(category.updatedAt).toLocaleString()}
                            </Typography>
                        </Box>
                    </>
                )}
            </Paper>

            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the category "{category?.name}"? This
                        action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={dialogActionsStyle}>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoryDetails;

