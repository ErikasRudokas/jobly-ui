import type { SxProps, Theme } from '@mui/material';

export const cardStyle: SxProps<Theme> = {
  padding: { xs: '1.25rem', md: '1.5rem' },
  marginBottom: '1rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  borderRadius: '12px',
  border: '1px solid',
  borderColor: 'divider',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: '#ffffff',
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

export const titleStyle: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.05rem',
  color: 'primary.main',
  lineHeight: 1.3,
  marginBottom: '0.25rem',
};

export const companyStyle: SxProps<Theme> = {
  fontSize: '0.9rem',
  color: 'text.secondary',
  fontWeight: 500,
};

export const metaRowStyle: SxProps<Theme> = {
  display: 'flex',
  gap: '1.25rem',
  flexWrap: 'wrap',
  alignItems: 'center',
};

export const metaItemStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
  color: 'text.secondary',
  fontSize: '0.85rem',
};

export const separatorStyle: SxProps<Theme> = {
  width: '1px',
  height: '14px',
  backgroundColor: 'divider',
  flexShrink: 0,
};

export const updatedAtStyle: SxProps<Theme> = {
  fontSize: '0.8rem',
  color: 'text.secondary',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};
