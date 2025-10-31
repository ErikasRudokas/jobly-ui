import {z} from 'zod';

export const jobOfferSchema = z.object({
    title: z
        .string()
        .min(1, 'Job title is required')
        .max(32, 'Job title must be less than 32 characters'),
    description: z
        .string()
        .min(1, 'Job description is required')
        .max(1024, 'Job description must be less than 1024 characters'),
    companyName: z
        .string()
        .min(1, 'Company name is required')
        .max(60, 'Company name must be less than 60 characters'),
    salary: z
        .number()
        .min(0, 'Salary must be a positive number'),
    yearsOfExperience: z
        .number()
        .min(0, 'Years of experience must be at least 0')
        .max(50, 'Years of experience must be at most 50'),
    workType: z.enum(['ON_SITE', 'REMOTE', 'HYBRID'], {
        message: 'Work type is required',
    }),
    location: z
        .string()
        .min(1, 'Location is required')
        .max(100, 'Location must be less than 100 characters'),
    contactEmail: z
        .email('Invalid email format'),
    contactPhone: z
        .string()
        .max(15, 'Phone number must be less than 15 characters')
        .optional()
        .or(z.literal('')),
    categoryId: z
        .number()
        .min(1, 'Category is required'),
});

export type JobOfferFormData = z.infer<typeof jobOfferSchema>;

