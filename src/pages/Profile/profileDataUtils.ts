import type {
  GetUserProfileResponse,
  UpdateUserEducation,
  UpdateUserSkill,
  UpdateUserWorkExperience,
} from '../../common/types/profile.types';
import { userService } from '../../common/services/userService';

export interface ProfileData {
  workExperience: UpdateUserWorkExperience[];
  education: UpdateUserEducation[];
  skills: UpdateUserSkill[];
}

export const transformProfileResponse = (profileData: GetUserProfileResponse): ProfileData => {
  const workExp = profileData.workExperience.map((we) => ({ ...we, isNew: false }));
  const edu = profileData.education.map((e) => ({ ...e, isNew: false }));
  const skillsData = profileData.skills.map((s) => ({
    id: s.id,
    proficiencyLevel: s.proficiencyLevel,
    skill: s.skill,
    isNew: false,
  }));

  return {
    workExperience: workExp,
    education: edu,
    skills: skillsData,
  };
};

export const loadProfileData = async (): Promise<ProfileData> => {
  const profileData = await userService.getUserProfile();
  return transformProfileResponse(profileData);
};
