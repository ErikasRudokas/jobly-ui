import type { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: { xs: '1rem', md: '2rem' },
  marginTop: { xs: '5rem', md: '6rem' },
};

export const paperStyle: SxProps<Theme> = {
  padding: { xs: '1.5rem', md: '2.5rem' },
  marginTop: '1rem',
  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  borderRadius: '8px',
};

export const formStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

export const errorAlertStyle: SxProps<Theme> = {
  marginBottom: '1.5rem',
};

export const loadingBoxStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
};

export const jobInfoBoxStyle: SxProps<Theme> = {
  padding: '1.5rem',
  backgroundColor: 'grey.50',
  borderRadius: '8px',
  marginBottom: '2rem',
};

export const jobTitleStyle: SxProps<Theme> = {
  fontWeight: 600,
  color: 'primary.main',
  marginBottom: '0.5rem',
};

export const jobCompanyStyle: SxProps<Theme> = {
  color: 'text.secondary',
};
