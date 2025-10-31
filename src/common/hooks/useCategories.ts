import {useState} from 'react';
import axiosInstance from '../services/axiosInstance';
import {buildApiUrl, CATEGORY_ENDPOINTS} from '../constants/apiConstants';
import type {
    Category,
    CategoryCreateRequest,
    CategoryUpdateRequest,
    GetAllCategoriesResponse,
} from '../types/category.types';

export const useCategories = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAllCategories = async (): Promise<GetAllCategoriesResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<GetAllCategoriesResponse>(
                buildApiUrl(CATEGORY_ENDPOINTS.GET_ALL)
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch categories';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getCategoryById = async (id: number): Promise<Category | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<Category>(
                buildApiUrl(CATEGORY_ENDPOINTS.GET_BY_ID(id))
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch category';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (data: CategoryCreateRequest): Promise<Category | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post<Category>(
                buildApiUrl(CATEGORY_ENDPOINTS.CREATE),
                data
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to create category';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id: number, data: CategoryUpdateRequest): Promise<Category | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.put<Category>(
                buildApiUrl(CATEGORY_ENDPOINTS.UPDATE(id)),
                data
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update category';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.delete(buildApiUrl(CATEGORY_ENDPOINTS.DELETE(id)));
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to delete category';
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getAllCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};

