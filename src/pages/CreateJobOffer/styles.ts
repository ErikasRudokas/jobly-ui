import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: { xs: '1rem', md: '2rem' },
    marginTop: { xs: '3rem', md: '4rem' },
};

export const paperStyle: SxProps<Theme> = {
    padding: { xs: '2rem', md: '3rem' },
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    borderRadius: '16px',
    border: '1px solid',
    borderColor: 'divider',
    marginTop: '1rem',
    backgroundColor: '#ffffff',
};

export const submitButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
    },
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
