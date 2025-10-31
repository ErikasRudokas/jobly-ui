import {z} from 'zod';

export const applicationUpdateSchema = z.object({
    comment: z
        .string()
        .max(1000, 'Comment must be less than 1000 characters')
        .optional()
        .or(z.literal('')),
});

export type ApplicationUpdateFormData = z.infer<typeof applicationUpdateSchema>;

