import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    marginTop: '6rem',
};

export const headerSectionStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
};

export const titleStyle: SxProps<Theme> = {
    fontWeight: 700,
    color: 'text.primary',
};

export const createButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.75rem 1.5rem',
};

export const tableContainerStyle: SxProps<Theme> = {
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
};

export const actionButtonStyle: SxProps<Theme> = {
    minWidth: 'auto',
    padding: '0.5rem',
};

export const emptyStateStyle: SxProps<Theme> = {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: 'text.secondary',
};

export const errorAlertStyle: SxProps<Theme> = {
    marginBottom: '2rem',
};

export const loadingBoxStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
};

