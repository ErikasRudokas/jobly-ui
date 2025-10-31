import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    marginTop: '6rem',
};

export const backButtonStyle: SxProps<Theme> = {
    marginBottom: '0',
    textTransform: 'none',
};

export const headerSectionStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
};

export const actionButtonsStyle: SxProps<Theme> = {
    display: 'flex',
    gap: '1rem',
};

export const editButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
};

export const cancelButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
    color: 'error.main',
    borderColor: 'error.main',
    '&:hover': {
        borderColor: 'error.dark',
        backgroundColor: 'error.light',
    },
};

export const paperStyle: SxProps<Theme> = {
    padding: '2.5rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    marginBottom: '2rem',
};

export const sectionStyle: SxProps<Theme> = {
    marginBottom: '2rem',
};

export const sectionTitleStyle: SxProps<Theme> = {
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'text.primary',
};

export const jobTitleStyle: SxProps<Theme> = {
    fontWeight: 700,
    color: 'primary.main',
    marginBottom: '0.5rem',
};

export const companyNameStyle: SxProps<Theme> = {
    color: 'text.secondary',
    fontSize: '1.1rem',
    marginBottom: '1rem',
};

export const statusChipStyle: SxProps<Theme> = {
    fontWeight: 600,
    marginBottom: '1.5rem',
};

export const commentBoxStyle: SxProps<Theme> = {
    padding: '1.5rem',
    backgroundColor: 'grey.50',
    borderRadius: '8px',
    marginTop: '0.5rem',
};

export const commentTextStyle: SxProps<Theme> = {
    color: 'text.secondary',
    fontStyle: 'italic',
    lineHeight: 1.7,
    whiteSpace: 'pre-wrap',
};

export const detailsGridStyle: SxProps<Theme> = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
};

export const detailItemStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
};

export const detailLabelStyle: SxProps<Theme> = {
    fontSize: '0.85rem',
    color: 'text.secondary',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
};

export const detailValueStyle: SxProps<Theme> = {
    fontSize: '1rem',
    color: 'text.primary',
    fontWeight: 500,
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

export const dialogActionsStyle: SxProps<Theme> = {
    padding: '1rem 1.5rem',
};

export const downloadCvButtonStyle: SxProps<Theme> = {
    marginTop: '1rem',
    textTransform: 'none',
};

