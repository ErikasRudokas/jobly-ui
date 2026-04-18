import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Box, Container, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { authService } from '../../common/services/authService';
import { ROUTES } from '../../common/constants/routes';
import { ACCOUNT_ROLES } from '../../common/constants/roleConstants.ts';
import { StyledFormBox, StyledRegisterContainer } from './styles';
import { lightTheme } from '../../common/themes/light-theme.ts';
import AppButton from '../../components/AppButton/AppButton';

const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required').max(20, 'First name too long'),
    lastName: z.string().min(1, 'Last name is required').max(20, 'Last name too long'),
    username: z.string().min(1, 'Username is required').max(32, 'Username too long'),
    role: z.enum([ACCOUNT_ROLES.USER, ACCOUNT_ROLES.EMPLOYER], { message: 'Account type is required' }),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password too long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain uppercase, lowercase, number and special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: ACCOUNT_ROLES.USER,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const registerData = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        role: data.role,
        email: data.email,
        password: data.password,
      };
      await authService.register(registerData);
      setSuccess('Registration successful! Redirecting to login...');

      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error && 'response' in err
          ? (
              err as {
                response?: { data?: { message?: string } };
              }
            ).response?.data?.message || 'Registration failed. Please try again.'
          : 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledRegisterContainer>
      <Container maxWidth="sm">
        <StyledFormBox>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Register
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register('firstName')}
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              autoComplete="given-name"
            />

            <TextField
              {...register('lastName')}
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              autoComplete="family-name"
            />

            <TextField
              {...register('username')}
              label="Username"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
              autoComplete="username"
            />

            <TextField
              {...register('role')}
              label="Account Type"
              select
              fullWidth
              margin="normal"
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value={ACCOUNT_ROLES.USER}>User</MenuItem>
              <MenuItem value={ACCOUNT_ROLES.EMPLOYER}>Employer</MenuItem>
            </TextField>

            <TextField
              {...register('email')}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete="email"
            />

            <TextField
              {...register('password')}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="new-password"
            />

            <TextField
              {...register('confirmPassword')}
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              autoComplete="new-password"
            />

            <AppButton type="submit" fullWidth size="large" loading={isLoading} sx={{ mt: 3, mb: 2 }}>
              Register
            </AppButton>

            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} style={{ textDecoration: 'none', color: lightTheme.palette.primary.main }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </StyledFormBox>
      </Container>
    </StyledRegisterContainer>
  );
};

export default Register;
