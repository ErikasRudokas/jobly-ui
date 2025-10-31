import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    marginTop: '6rem',
};

export const backButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
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

export const actionButtonsStyle: SxProps<Theme> = {
    display: 'flex',
    gap: '1rem',
};

export const editButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
};

export const deleteButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
    color: 'error.main',
    borderColor: 'error.main',
    '&:hover': {
        borderColor: 'error.dark',
        backgroundColor: 'error.light',
    },
};

export const detailsCardStyle: SxProps<Theme> = {
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
};

export const detailRowStyle: SxProps<Theme> = {
    marginBottom: '1.5rem',
};

export const detailLabelStyle: SxProps<Theme> = {
    fontWeight: 600,
    color: 'text.secondary',
    marginBottom: '0.5rem',
};

export const detailValueStyle: SxProps<Theme> = {
    color: 'text.primary',
};

export const loadingBoxStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
};

export const errorAlertStyle: SxProps<Theme> = {
    marginBottom: '2rem',
};

export const dialogActionsStyle: SxProps<Theme> = {
    padding: '1rem 1.5rem',
};

