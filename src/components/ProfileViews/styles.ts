import type { SxProps, Theme } from '@mui/material';

export const formContainerStyle: SxProps<Theme> = {
  marginTop: '1.5rem',
};

export const itemsListStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '1rem',
};

export const emptyStateStyle: SxProps<Theme> = {
  padding: '2rem',
  textAlign: 'center',
  color: 'text.secondary',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  borderRadius: '8px',
  border: '1px dashed rgba(0, 0, 0, 0.12)',
  marginTop: '1rem',
};

export const viewItemCardStyle: SxProps<Theme> = {
  padding: '1.5rem',
  backgroundColor: 'background.paper',
  borderRadius: '12px',
  border: '1px solid',
  borderColor: 'divider',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    borderColor: 'primary.main',
    transform: 'translateY(-2px)',
  },
};

export const viewItemHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1rem',
};

export const viewItemTitleContainerStyle: SxProps<Theme> = {
  flex: 1,
  paddingRight: '1rem',
};

export const viewItemTitleStyle: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 600,
  color: 'text.primary',
  lineHeight: 1.3,
};

export const viewItemDateStyle: SxProps<Theme> = {
  fontSize: '0.875rem',
  color: 'text.secondary',
  fontWeight: 500,
  whiteSpace: 'nowrap',
};

export const viewItemMetaContainerStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

export const viewItemMetaIconStyle: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: 'text.secondary',
};

export const viewItemMetaTextStyle: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: 'text.secondary',
  fontWeight: 500,
};
