import { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { buildApiUrl, SKILL_ENDPOINTS } from '../constants/apiConstants';
import type { GetAllSkillsResponse } from '../types/skill.types';

export const useSkills = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllSkills = async (params?: {
    offset?: number;
    limit?: number;
    value?: string;
  }): Promise<GetAllSkillsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();

      if (params?.offset !== undefined) {
        queryParams.append('offset', params.offset.toString());
      }
      if (params?.limit !== undefined) {
        queryParams.append('limit', params.limit.toString());
      }
      if (params?.value) {
        queryParams.append('value', params.value);
      }

      const url = `${buildApiUrl(SKILL_ENDPOINTS.GET_ALL)}${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await axiosInstance.get<GetAllSkillsResponse>(url);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch skills';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAllSkills,
  };
};
