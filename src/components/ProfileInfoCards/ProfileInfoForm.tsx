import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { StyledInfoGrid } from './styles';
import AppButton from '../AppButton/AppButton';

const profileInfoSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(20, 'Max 20 characters'),
  lastName: z.string().trim().min(1, 'Last name is required').max(20, 'Max 20 characters'),
  username: z.string().trim().min(1, 'Username is required').max(32, 'Max 32 characters'),
});

export type ProfileInfoFormValues = z.infer<typeof profileInfoSchema>;

interface ProfileInfoFormProps {
  defaultValues: ProfileInfoFormValues;
  onSubmit: (values: ProfileInfoFormValues) => void | Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
  actions?: ReactNode;
}

const ProfileInfoForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  actions,
}: ProfileInfoFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileInfoFormValues>({
    defaultValues,
    resolver: zodResolver(profileInfoSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
          Account Information
        </Typography>
        {actions || (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {onCancel && (
              <AppButton variant="outlined" startIcon={<CancelIcon />} onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </AppButton>
            )}
            <AppButton type="submit" startIcon={<SaveIcon />} loading={isSubmitting} disabled={!isDirty}>
              Save Changes
            </AppButton>
          </Box>
        )}
      </Box>
      <StyledInfoGrid>
        <TextField
          label="First Name"
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          disabled={isSubmitting}
          inputProps={{ maxLength: 20 }}
          fullWidth
          {...register('firstName')}
        />
        <TextField
          label="Last Name"
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          disabled={isSubmitting}
          inputProps={{ maxLength: 20 }}
          fullWidth
          {...register('lastName')}
        />
        <TextField
          label="Username"
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
          disabled={isSubmitting}
          inputProps={{ maxLength: 32 }}
          fullWidth
          {...register('username')}
        />
      </StyledInfoGrid>
    </Box>
  );
};

export default ProfileInfoForm;
