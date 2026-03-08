import type { SxProps, Theme } from '@mui/material';

export const cardStyle: SxProps<Theme> = {
  padding: { xs: '1.25rem', md: '1.5rem' },
  marginBottom: '1rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  borderRadius: '12px',
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    borderColor: 'primary.main',
    transform: 'translateY(-1px)',
  },
};

export const headerRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '0.75rem',
  gap: '1rem',
};

export const applicantNameStyle: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1rem',
  color: 'text.primary',
  lineHeight: 1.3,
  marginBottom: '0.2rem',
};

export const emailStyle: SxProps<Theme> = {
  fontSize: '0.85rem',
  color: 'text.secondary',
};

export const commentBoxStyle: SxProps<Theme> = {
  padding: '0.65rem 0.875rem',
  backgroundColor: 'grey.50',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'divider',
  marginBottom: '0.875rem',
};

export const footerRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.75rem',
};

export const dateStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.8rem',
};

export const actionsRowStyle: SxProps<Theme> = {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
};

export const downloadCvButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  fontSize: '0.8rem',
  borderRadius: '8px',
};

export const approveButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  fontSize: '0.8rem',
  borderRadius: '8px',
  minWidth: 'auto',
  px: '0.75rem',
};

export const rejectButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  fontSize: '0.8rem',
  borderRadius: '8px',
  minWidth: 'auto',
  px: '0.75rem',
};
