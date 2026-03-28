import { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { ADMIN_USER_ENDPOINTS, buildApiUrl } from '../constants/apiConstants';
import type {
  AdminUserDetailsResponse,
  AdminUserListResponse,
  AdminUserStatusManageRequest,
} from '../types/adminUser.types';

export const useAdminUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAdminUsers = async (params?: {
    search?: string;
    offset?: number;
    limit?: number;
  }): Promise<AdminUserListResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const queryParams: Record<string, string | number> = {};
      if (params?.offset !== undefined) queryParams.offset = params.offset;
      if (params?.limit !== undefined) queryParams.limit = params.limit;
      if (params?.search && params.search.length >= 2) queryParams.search = params.search;

      const response = await axiosInstance.get<AdminUserListResponse>(buildApiUrl(ADMIN_USER_ENDPOINTS.GET_ALL), {
        params: queryParams,
      });
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAdminUserDetails = async (userId: number): Promise<AdminUserDetailsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<AdminUserDetailsResponse>(
        buildApiUrl(ADMIN_USER_ENDPOINTS.GET_BY_ID(userId))
      );
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch user details';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const manageAdminUserStatus = async (userId: number, data: AdminUserStatusManageRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post(buildApiUrl(ADMIN_USER_ENDPOINTS.MANAGE_STATUS(userId)), data);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user status';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAdminUsers,
    getAdminUserDetails,
    manageAdminUserStatus,
  };
};
