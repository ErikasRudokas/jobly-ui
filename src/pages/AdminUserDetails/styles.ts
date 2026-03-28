import type { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: { xs: '1rem', md: '2rem' },
  marginTop: { xs: '5rem', md: '6rem' },
};

export const headerSectionStyle: SxProps<Theme> = {
  marginBottom: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
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

export const detailsCardStyle: SxProps<Theme> = {
  padding: '2rem',
  borderRadius: '12px',
  marginBottom: '2rem',
  backgroundColor: 'background.paper',
};

export const detailRowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  padding: '0.75rem 0',
  borderBottom: '1px solid',
  borderColor: 'divider',
  '&:last-of-type': {
    borderBottom: 'none',
  },
};

export const detailLabelStyle: SxProps<Theme> = {
  minWidth: '140px',
  color: 'text.secondary',
  fontWeight: 600,
};

export const detailValueStyle: SxProps<Theme> = {
  color: 'text.primary',
};

export const actionListStyle: SxProps<Theme> = {
  borderRadius: '12px',
  overflow: 'hidden',
  padding: '1rem',
};

export const statusActionSectionStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  borderRadius: '12px',
  backgroundColor: 'background.default',
};
