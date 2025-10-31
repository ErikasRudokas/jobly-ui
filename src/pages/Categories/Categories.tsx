import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import {Add as AddIcon, Visibility as ViewIcon} from '@mui/icons-material';
import {useCategories} from '../../common/hooks/useCategories';
import type {Category} from '../../common/types/category.types';
import {ROUTES} from '../../common/constants/routes';
import {
    actionButtonStyle,
    containerStyle,
    createButtonStyle,
    emptyStateStyle,
    errorAlertStyle,
    headerSectionStyle,
    loadingBoxStyle,
    tableContainerStyle,
    titleStyle,
} from './styles';

const Categories = () => {
    const navigate = useNavigate();
    const { getAllCategories, loading, error } = useCategories();
    const [categories, setCategories] = useState<Category[]>([]);

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

    const handleViewDetails = (id: number) => {
        navigate(ROUTES.CATEGORY_DETAILS(id));
    };

    const handleCreateCategory = () => {
        navigate(ROUTES.CATEGORY_CREATE);
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
                    Category Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreateCategory}
                    sx={createButtonStyle}
                >
                    Create Category
                </Button>
            </Box>

            {categories.length === 0 ? (
                <Box sx={emptyStateStyle}>
                    <Typography variant="h6">No categories found</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Start by creating your first category
                    </Typography>
                </Box>
            ) : (
                <TableContainer component={Paper} sx={tableContainerStyle}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Description</strong></TableCell>
                                <TableCell><strong>Created At</strong></TableCell>
                                <TableCell align="center"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id} hover>
                                    <TableCell>{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>
                                        {new Date(category.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => handleViewDetails(category.id)}
                                            sx={actionButtonStyle}
                                            color="primary"
                                        >
                                            <ViewIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default Categories;

