import { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { buildApiUrl, JOB_OFFER_ENDPOINTS } from '../constants/apiConstants';
import type {
  CanApplyResponse,
  CreateJobOfferRequest,
  GetAllJobOffersResponse,
  GetMineJobOffersResponse,
  JobOffer,
  JobOfferApplicationsResponse,
  JobOfferDetailsResponse,
  JobOfferWithApplicationsResponse,
  UpdateJobOfferRequest,
} from '../types/jobOffer.types';
import type { ApplicationStatus } from '../types/application.types';

export const useJobOffers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllJobOffers = async (params?: {
    search?: string;
    offset?: number;
    limit?: number;
    categoryId?: number;
    workType?: 'ON_SITE' | 'REMOTE' | 'HYBRID';
    location?: string;
    salaryFrom?: number;
    salaryTo?: number;
  }): Promise<GetAllJobOffersResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<GetAllJobOffersResponse>(buildApiUrl(JOB_OFFER_ENDPOINTS.GET_ALL), {
        params,
      });
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
      const response = await axiosInstance.get<JobOfferDetailsResponse>(buildApiUrl(JOB_OFFER_ENDPOINTS.GET_BY_ID(id)));
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch job offer';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getMineJobOffers = async (params?: {
    search?: string;
    offset?: number;
    limit?: number;
  }): Promise<GetMineJobOffersResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const queryParams: Record<string, string | number> = {};
      if (params?.offset !== undefined) queryParams.offset = params.offset;
      if (params?.limit !== undefined) queryParams.limit = params.limit;
      if (params?.search && params.search.length >= 2) queryParams.search = params.search;

      const response = await axiosInstance.get<GetMineJobOffersResponse>(buildApiUrl(JOB_OFFER_ENDPOINTS.GET_MINE), {
        params: queryParams,
      });
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

  const getMineJobOfferApplications = async (
    id: number,
    params?: {
      status?: ApplicationStatus | null;
      offset?: number;
      limit?: number;
    }
  ): Promise<JobOfferApplicationsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const queryParams: Record<string, string | number> = {};
      if (params?.offset !== undefined) queryParams.offset = params.offset;
      if (params?.limit !== undefined) queryParams.limit = params.limit;
      if (params?.status) queryParams.status = params.status;

      const response = await axiosInstance.get<JobOfferApplicationsResponse>(
        buildApiUrl(JOB_OFFER_ENDPOINTS.GET_MINE_APPLICATIONS(id)),
        {
          params: queryParams,
        }
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

  const createJobOffer = async (data: CreateJobOfferRequest): Promise<JobOffer | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<JobOffer>(buildApiUrl(JOB_OFFER_ENDPOINTS.CREATE), data);
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
      const response = await axiosInstance.put<JobOffer>(buildApiUrl(JOB_OFFER_ENDPOINTS.UPDATE(id)), data);
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
      const response = await axiosInstance.get<CanApplyResponse>(buildApiUrl(JOB_OFFER_ENDPOINTS.CAN_APPLY(id)));
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
    getMineJobOfferApplications,
    createJobOffer,
    updateJobOffer,
    deleteJobOffer,
    checkCanApply,
  };
};
