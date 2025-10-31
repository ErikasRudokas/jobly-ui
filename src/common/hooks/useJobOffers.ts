import {useState} from 'react';
import axiosInstance from '../services/axiosInstance';
import {buildApiUrl, JOB_OFFER_ENDPOINTS} from '../constants/apiConstants';
import type {
    CanApplyResponse,
    CreateJobOfferRequest,
    GetAllJobOffersResponse,
    GetMineJobOffersResponse,
    JobOffer,
    JobOfferDetailsResponse,
    JobOfferWithApplicationsResponse,
    UpdateJobOfferRequest,
} from '../types/jobOffer.types';

export const useJobOffers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAllJobOffers = async (): Promise<GetAllJobOffersResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<GetAllJobOffersResponse>(
                buildApiUrl(JOB_OFFER_ENDPOINTS.GET_ALL)
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch job offers';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getJobOfferById = async (id: number): Promise<JobOfferDetailsResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<JobOfferDetailsResponse>(
                buildApiUrl(JOB_OFFER_ENDPOINTS.GET_BY_ID(id))
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch job offer';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getMineJobOffers = async (): Promise<GetMineJobOffersResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<GetMineJobOffersResponse>(
                buildApiUrl(JOB_OFFER_ENDPOINTS.GET_MINE)
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch your job offers';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getMineJobOfferDetails = async (id: number): Promise<JobOfferWithApplicationsResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<JobOfferWithApplicationsResponse>(
                buildApiUrl(JOB_OFFER_ENDPOINTS.GET_MINE_DETAILS(id))
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch job offer details';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const createJobOffer = async (data: CreateJobOfferRequest): Promise<JobOffer | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post<JobOffer>(
                buildApiUrl(JOB_OFFER_ENDPOINTS.CREATE),
                data
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to create job offer';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateJobOffer = async (id: number, data: UpdateJobOfferRequest): Promise<JobOffer | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.put<JobOffer>(
                buildApiUrl(JOB_OFFER_ENDPOINTS.UPDATE(id)),
                data
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update job offer';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteJobOffer = async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.delete(buildApiUrl(JOB_OFFER_ENDPOINTS.DELETE(id)));
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to delete job offer';
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const checkCanApply = async (id: number): Promise<CanApplyResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<CanApplyResponse>(
                buildApiUrl(JOB_OFFER_ENDPOINTS.CAN_APPLY(id))
            );
            return response.data;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to check if you can apply';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getAllJobOffers,
        getJobOfferById,
        getMineJobOffers,
        getMineJobOfferDetails,
        createJobOffer,
        updateJobOffer,
        deleteJobOffer,
        checkCanApply,
    };
};

