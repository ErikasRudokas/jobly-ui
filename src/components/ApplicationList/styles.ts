import type { SxProps, Theme } from '@mui/material';

export const panelStyle: SxProps<Theme> = {
  padding: { xs: '2rem', md: '3rem' },
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: '#ffffff',
  marginBottom: '2rem',
};

export const emptyStateStyle: SxProps<Theme> = {
  textAlign: 'center',
  padding: '3rem 2rem',
  color: 'text.secondary',
  backgroundColor: 'grey.50',
  borderRadius: '8px',
};

export const titleStyle: SxProps<Theme> = {
  fontWeight: 600,
  marginBottom: '1rem',
  color: 'text.primary',
};
