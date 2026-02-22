import { z } from 'zod';
import { profileFormSchema } from './profileSchema';
import type { UpdateUserEducation, UpdateUserSkill, UpdateUserWorkExperience } from '../../common/types/profile.types';

export interface ValidationError {
  message: string;
}

export interface ValidationErrors {
  workExperience: Record<number, Record<string, ValidationError>>;
  education: Record<number, Record<string, ValidationError>>;
  skills: Record<number, Record<string, ValidationError>>;
}

interface ValidationData {
  workExperience: UpdateUserWorkExperience[];
  education: UpdateUserEducation[];
  skills: UpdateUserSkill[];
}

export const validateProfileData = (
  data: ValidationData
): {
  isValid: boolean;
  errors: ValidationErrors;
} => {
  const errors: ValidationErrors = { workExperience: {}, education: {}, skills: {} };

  try {
    profileFormSchema.parse({
      workExperience: data.workExperience
        .filter((we) => !we.delete)
        .map((we) => ({
          ...we,
          id: we.isNew ? undefined : we.id,
        })),
      education: data.education
        .filter((e) => !e.delete)
        .map((e) => ({
          ...e,
          id: e.isNew ? undefined : e.id,
        })),
      skills: data.skills
        .filter((s) => !s.delete)
        .map((s) => ({
          id: s.isNew ? undefined : s.id,
          proficiencyLevel: s.proficiencyLevel,
          skillId: s.skill.id,
        })),
    });
    return { isValid: true, errors };
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.issues.forEach((issue: z.ZodIssue) => {
        const path = issue.path;
        if (path[0] === 'workExperience' && typeof path[1] === 'number') {
          if (!errors.workExperience[path[1]]) errors.workExperience[path[1]] = {};
          errors.workExperience[path[1]][path[2] as string] = { message: issue.message };
        } else if (path[0] === 'education' && typeof path[1] === 'number') {
          if (!errors.education[path[1]]) errors.education[path[1]] = {};
          errors.education[path[1]][path[2] as string] = { message: issue.message };
        } else if (path[0] === 'skills' && typeof path[1] === 'number') {
          if (!errors.skills[path[1]]) errors.skills[path[1]] = {};
          errors.skills[path[1]][path[2] as string] = { message: issue.message };
        }
      });
    }
    return { isValid: false, errors };
  }
};

export const createEmptyValidationErrors = (): ValidationErrors => ({
  workExperience: {},
  education: {},
  skills: {},
});
