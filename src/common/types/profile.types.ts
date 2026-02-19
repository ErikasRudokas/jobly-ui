import type {SkillProficiency} from './skill.types';

export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    cvId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export type CVDataStatus = 'AI_PARSED' | 'USER_REVIEWED';

export interface UserWorkExperience {
    id: number;
    companyName: string | null;
    designation: string | null;
    startDate: string | null;
    endDate?: string | null;
    status: CVDataStatus;
}

export interface UserEducation {
    id: number;
    institutionName: string | null;
    degree: string | null;
    startDate: string | null;
    endDate?: string | null;
    status: CVDataStatus;
}

export interface UserSkillDetails {
    id: number;
    name: string;
    type: 'TECHNICAL' | 'SOFT';
}

export interface UserSkill {
    id: number;
    proficiencyLevel: SkillProficiency | null;
    status: CVDataStatus;
    skill: UserSkillDetails;
}

export interface GetUserProfileResponse {
    workExperience: UserWorkExperience[];
    education: UserEducation[];
    skills: UserSkill[];
}

export interface UpdateUserWorkExperience extends Omit<UserWorkExperience, 'status'> {
    delete?: boolean;
    isNew?: boolean;
}

export interface UpdateUserEducation extends Omit<UserEducation, 'status'> {
    delete?: boolean;
    isNew?: boolean;
}

export interface UpdateUserSkill extends Omit<UserSkill, 'status'> {
    delete?: boolean;
    isNew?: boolean;
}

export interface SaveUserWorkExperienceRequest {
    id?: number;
    delete?: boolean;
    companyName: string | null;
    designation: string | null;
    startDate: string | null;
    endDate?: string | null;
}

export interface SaveUserEducationRequest {
    id?: number;
    delete?: boolean;
    institutionName: string | null;
    degree: string | null;
    startDate: string | null;
    endDate?: string | null;
}

export interface SaveUserSkillRequest {
    id?: number;
    delete?: boolean;
    proficiencyLevel: SkillProficiency | null;
    skillId: number;
}

export interface SaveUserProfileRequest {
    workExperience: SaveUserWorkExperienceRequest[];
    education: SaveUserEducationRequest[];
    skills: SaveUserSkillRequest[];
}

