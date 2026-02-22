import type { SxProps, Theme } from '@mui/material';

export const searchDropdownStyle: SxProps<Theme> = {
  marginTop: '0.5rem',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#fff',
};

export const searchListStyle: SxProps<Theme> = {
  maxHeight: '280px',
  overflowY: 'auto',
};

export const searchListItemStyle: SxProps<Theme> = {
  padding: '0.75rem 1rem',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
};

export const searchMetaStyle: SxProps<Theme> = {
  fontSize: '0.75rem',
  color: 'text.secondary',
  fontWeight: 600,
};

export const searchFooterStyle: SxProps<Theme> = {
  padding: '0.5rem 1rem',
  borderTop: '1px solid',
  borderColor: 'divider',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.02)',
};

export const noResultsStyle: SxProps<Theme> = {
  padding: '1.5rem 1rem',
  textAlign: 'center',
  color: 'text.secondary',
  fontSize: '0.9rem',
};
