import { z } from 'zod';

export const workExperienceSchema = z
  .object({
    id: z.number().optional(),
    companyName: z
      .string()
      .nullable()
      .refine((val) => val !== null && val.trim().length > 0, {
        message: 'Company name is required',
      })
      .refine((val) => !val || val.length <= 255, {
        message: 'Company name must be less than 255 characters',
      }),
    designation: z
      .string()
      .nullable()
      .refine((val) => val !== null && val.trim().length > 0, {
        message: 'Designation is required',
      })
      .refine((val) => !val || val.length <= 255, {
        message: 'Designation must be less than 255 characters',
      }),
    startDate: z
      .string()
      .nullable()
      .refine((val) => val !== null && val.trim().length > 0, {
        message: 'Start date is required',
      }),
    endDate: z.string().nullable().optional(),
    delete: z.boolean().optional(),
    isNew: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.delete) return true; // Skip validation for deleted items
      if (data.endDate && data.startDate && data.endDate.trim() !== '' && data.startDate.trim() !== '') {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  );

export const educationSchema = z
  .object({
    id: z.number().optional(),
    institutionName: z
      .string()
      .nullable()
      .refine((val) => val !== null && val.trim().length > 0, {
        message: 'Institution name is required',
      })
      .refine((val) => !val || val.length <= 255, {
        message: 'Institution name must be less than 255 characters',
      }),
    degree: z
      .string()
      .nullable()
      .refine((val) => val !== null && val.trim().length > 0, {
        message: 'Degree is required',
      })
      .refine((val) => !val || val.length <= 255, {
        message: 'Degree must be less than 255 characters',
      }),
    startDate: z
      .string()
      .nullable()
      .refine((val) => val !== null && val.trim().length > 0, {
        message: 'Start date is required',
      }),
    endDate: z.string().nullable().optional(),
    delete: z.boolean().optional(),
    isNew: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.delete) return true; // Skip validation for deleted items
      if (data.endDate && data.startDate && data.endDate.trim() !== '' && data.startDate.trim() !== '') {
        return new Date(data.endDate) >= new Date(data.startDate);
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  );

export const skillSchema = z
  .object({
    id: z.number().optional(),
    proficiencyLevel: z
      .enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'])
      .nullable()
      .refine((val) => val !== null, {
        message: 'Proficiency level is required',
      }),
    skillId: z.number().min(1, 'Skill is required'),
    delete: z.boolean().optional(),
    isNew: z.boolean().optional(),
  })
  .refine(
    (data) => {
      return data.delete || data.proficiencyLevel !== null;
    },
    {
      message: 'Proficiency level is required',
      path: ['proficiencyLevel'],
    }
  );

export const profileFormSchema = z.object({
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type WorkExperienceFormValues = z.infer<typeof workExperienceSchema>;
export type EducationFormValues = z.infer<typeof educationSchema>;
export type SkillFormValues = z.infer<typeof skillSchema>;
