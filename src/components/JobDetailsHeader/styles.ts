import type { SxProps, Theme } from '@mui/material';

export const headerSectionStyle: SxProps<Theme> = {
  marginBottom: '1.5rem',
  paddingBottom: '1.5rem',
  borderBottom: '1px solid',
  borderColor: 'rgba(0, 0, 0, 0.08)',
};

export const titleStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'primary.main',
  lineHeight: 1.2,
  fontSize: { xs: '1.75rem', md: '2.25rem' },
  marginBottom: '1rem',
};

export const companyNameStyle: SxProps<Theme> = {
  fontSize: '1rem',
  color: 'text.primary',
  fontWeight: 600,
};

export const companyRowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1rem',
  flexWrap: 'wrap',
};

export const metaInfoRowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
};

export const bulletStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.875rem',
};

export const postedByTextStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.875rem',
};

export const metaTextStyle: SxProps<Theme> = {
  fontSize: '0.875rem',
  color: 'text.secondary',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

export const categoryIconStyle: SxProps<Theme> = {
  fontSize: '1rem',
  color: 'primary.main',
};

export const statusTextStyle = (status: string): SxProps<Theme> => ({
  fontSize: '0.875rem',
  color: status === 'OPEN' ? '#2e7d32' : 'text.secondary',
  fontWeight: 600,
});

export const salaryTextStyle: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.1rem',
  color: 'text.primary',
};
