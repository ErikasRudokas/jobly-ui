import type {SxProps, Theme} from '@mui/material';

export const cardStyle: SxProps<Theme> = {
    padding: '1.5rem',
    marginBottom: '1rem',
    borderLeft: '4px solid',
    borderColor: 'primary.main',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s ease, transform 0.1s ease',
    '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        transform: 'translateY(-1px)',
    },
};

export const applicantNameStyle: SxProps<Theme> = {
    fontWeight: 600,
    color: 'text.primary',
};

export const dateStyle: SxProps<Theme> = {
    color: 'text.secondary',
    fontSize: '0.9rem',
};

export const downloadCvButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
};

export const rejectButtonStyle: SxProps<Theme> = {
    minWidth: 'auto',
    padding: '6px 12px',
    backgroundColor: 'error.main',
    '&:hover': {
        backgroundColor: 'error.dark',
    },
};

