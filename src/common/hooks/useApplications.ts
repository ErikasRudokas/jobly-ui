import {useState} from 'react';
import axiosInstance from '../services/axiosInstance';
import {APPLICATION_ENDPOINTS, buildApiUrl} from '../constants/apiConstants';
import type {
    ApplicationRequest,
    ApplicationUpdateRequest,
    GetMyApplicationsResponse,
    ManageApplicationRequest,
    MyApplication,
} from '../types/application.types';
import {AxiosError} from 'axios';

export const useApplications = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getMyApplications = async (): Promise<GetMyApplicationsResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<GetMyApplicationsResponse>(
                buildApiUrl(APPLICATION_ENDPOINTS.GET_MINE)
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch applications';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getMyApplicationDetails = async (id: number): Promise<MyApplication | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<MyApplication>(
                buildApiUrl(APPLICATION_ENDPOINTS.GET_MINE_DETAILS(id))
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch application details';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateApplication = async (id: number, data: ApplicationUpdateRequest): Promise<MyApplication | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.put<MyApplication>(
                buildApiUrl(APPLICATION_ENDPOINTS.UPDATE(id)),
                data
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update application';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const cancelApplication = async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.post(buildApiUrl(APPLICATION_ENDPOINTS.CANCEL(id)));
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to cancel application';
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const createApplication = async (
        jobOfferId: number,
        data: ApplicationRequest
    ): Promise<{ success: boolean; data?: MyApplication; error?: string }> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post<MyApplication>(
                buildApiUrl(APPLICATION_ENDPOINTS.APPLY(jobOfferId)),
                data
            );
            return { success: true, data: response.data };
        } catch (err) {
            let errorMessage: string;

            if (err instanceof AxiosError) {
                if (err.response?.status === 400) {
                    errorMessage = err.response?.data?.message ||
                                  err.response?.data?.error ||
                                  'You have already applied to this job offer';
                } else {
                    errorMessage = err.response?.data?.message ||
                                  err.response?.data?.error ||
                                  err.message ||
                                  'Failed to apply to job offer';
                }
            } else {
                errorMessage = err instanceof Error ? err.message : 'Failed to apply to job offer';
            }

            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const manageApplication = async (
        id: number,
        data: ManageApplicationRequest
    ): Promise<{ success: boolean; error?: string }> => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.post(
                buildApiUrl(APPLICATION_ENDPOINTS.MANAGE(id)),
                data
            );
            return { success: true };
        } catch (err) {
            let errorMessage: string;

            if (err instanceof AxiosError) {
                errorMessage = err.response?.data?.message ||
                              err.response?.data?.error ||
                              err.message ||
                              'Failed to manage application';
            } else {
                errorMessage = err instanceof Error ? err.message : 'Failed to manage application';
            }

            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getMyApplications,
        getMyApplicationDetails,
        updateApplication,
        cancelApplication,
        createApplication,
        manageApplication,
    };
};

