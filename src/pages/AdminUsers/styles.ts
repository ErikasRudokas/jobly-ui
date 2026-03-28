import type { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: { xs: '1rem', md: '2rem' },
  marginTop: { xs: '5rem', md: '6rem' },
};

export const headerSectionStyle: SxProps<Theme> = {
  marginBottom: '1.5rem',
};

export const titleStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'text.primary',
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

export const controlsRowStyle: SxProps<Theme> = {
  marginBottom: '1.5rem',
};

export const tableContainerStyle: SxProps<Theme> = {
  borderRadius: '12px',
  overflow: 'hidden',
};

export const emptyStateStyle: SxProps<Theme> = {
  textAlign: 'center',
  padding: '3rem 1rem',
  color: 'text.secondary',
  border: '1px dashed',
  borderColor: 'divider',
  borderRadius: '12px',
};

export const paginationRowStyle: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1.5rem',
};

export const resultsInfoStyle: SxProps<Theme> = {
  position: 'absolute',
  right: 0,
  fontSize: '0.875rem',
  color: 'text.secondary',
  whiteSpace: 'nowrap',
};
