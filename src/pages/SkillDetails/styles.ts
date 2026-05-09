import type { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: { xs: '1rem', md: '2rem' },
  marginTop: { xs: '5rem', md: '6rem' },
};

export const headerSectionStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: { xs: 'flex-start', md: 'center' },
  flexDirection: { xs: 'column', md: 'row' },
  gap: { xs: '1rem', md: 0 },
  marginBottom: '2rem',
};

export const titleStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'text.primary',
};

export const actionButtonsStyle: SxProps<Theme> = {
  display: 'flex',
  gap: '1rem',
};

export const detailsCardStyle: SxProps<Theme> = {
  padding: '2rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  borderRadius: '8px',
};

export const detailRowStyle: SxProps<Theme> = {
  marginBottom: '1.5rem',
};

export const detailLabelStyle: SxProps<Theme> = {
  fontWeight: 600,
  color: 'text.secondary',
  marginBottom: '0.5rem',
};

export const detailValueStyle: SxProps<Theme> = {
  color: 'text.primary',
};

export const loadingBoxStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
};

export const errorAlertStyle: SxProps<Theme> = {
  marginBottom: '2rem',
};

export const aliasesHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '0.75rem',
};

export const aliasRowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '0.75rem',
};

export const aliasListStyle: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
};

export const aliasEmptyStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.9rem',
};
