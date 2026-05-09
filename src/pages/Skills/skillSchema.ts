import { z } from 'zod';

const aliasSchema = z.object({
  id: z.number().optional(),
  value: z.string().trim().min(1, 'Alias is required').max(50, 'Alias must be 50 characters or less'),
  delete: z.boolean().optional(),
});

export const skillCreateSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(255, 'Description must be 255 characters or less'),
  type: z.enum(['TECHNICAL', 'SOFT']),
  aliases: z.array(aliasSchema).optional(),
});

export const skillEditSchema = skillCreateSchema;

export type SkillCreateFormData = z.infer<typeof skillCreateSchema>;
export type SkillEditFormData = z.infer<typeof skillEditSchema>;
