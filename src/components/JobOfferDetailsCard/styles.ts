import type { SxProps, Theme } from '@mui/material';

export const detailsGridStyle: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
  gap: '1.25rem',
};

export const detailItemStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
  padding: '1.25rem',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'divider',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
};

export const detailLabelStyle: SxProps<Theme> = {
  fontSize: '0.75rem',
  color: 'text.secondary',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '0.25rem',
};

export const detailValueStyle: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: 'text.primary',
  fontWeight: 600,
};

export const detailIconStyle: SxProps<Theme> = {
  fontSize: '1.5rem',
  color: 'primary.main',
  marginY: 'auto',
};
