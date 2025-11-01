import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: { xs: '1rem', md: '2rem' },
    marginTop: { xs: '5rem', md: '6rem' },
};

export const backButtonStyle: SxProps<Theme> = {
    marginBottom: '2rem',
    textTransform: 'none',
};

export const titleStyle: SxProps<Theme> = {
    fontWeight: 700,
    color: 'text.primary',
    marginBottom: '2rem',
};

export const formCardStyle: SxProps<Theme> = {
    padding: { xs: '1.5rem', md: '2rem' },
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
};

export const formFieldStyle: SxProps<Theme> = {
    marginBottom: '1.5rem',
};

export const buttonGroupStyle: SxProps<Theme> = {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
};

export const submitButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.75rem 2rem',
};

export const cancelButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.75rem 2rem',
};

export const errorAlertStyle: SxProps<Theme> = {
    marginBottom: '2rem',
};

