import { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { buildApiUrl, SKILL_ENDPOINTS } from '../constants/apiConstants';
import type { GetAllSkillsResponse, Skill, SkillCreateRequest, SkillUpdateRequest } from '../types/skill.types';

export const useSkills = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllSkills = async (params?: {
    offset?: number;
    limit?: number;
    value?: string;
    skillType?: string;
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
      if (params?.skillType) {
        queryParams.append('skillType', params.skillType);
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

  const createSkill = async (data: SkillCreateRequest): Promise<Skill | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post<Skill>(buildApiUrl(SKILL_ENDPOINTS.CREATE), data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create skill';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSkillById = async (id: number): Promise<Skill | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<Skill>(buildApiUrl(SKILL_ENDPOINTS.GET_BY_ID(id)));
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch skill';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateSkill = async (id: number, data: SkillUpdateRequest): Promise<Skill | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put<Skill>(buildApiUrl(SKILL_ENDPOINTS.UPDATE(id)), data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update skill';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(buildApiUrl(SKILL_ENDPOINTS.DELETE(id)));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete skill';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
  };
};
