import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: { xs: '1rem', md: '2rem' },
    marginTop: { xs: '5rem', md: '6rem' },
};

export const backButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
};

export const paperStyle: SxProps<Theme> = {
    padding: { xs: '1.5rem', md: '2.5rem' },
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    marginBottom: '2rem',
};

export const headerSectionStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: { xs: 'flex-start', md: 'flex-end' },
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: '1rem', md: 0 },
    marginBottom: '2rem',
    borderBottom: '1px solid',
    borderColor: 'divider',
};

export const titleRowStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
};

export const titleStyle: SxProps<Theme> = {
    fontWeight: 700,
    color: 'primary.main',
};

export const salaryBoxStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    backgroundColor: 'primary.main',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 600,
};

export const companyNameStyle: SxProps<Theme> = {
    fontSize: '1.1rem',
    color: 'text.secondary',
    marginBottom: '1rem',
};

export const actionButtonsStyle: SxProps<Theme> = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
};

export const editButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
};

export const deleteButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
};

export const headerDetailsStyle: SxProps<Theme> = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
};

export const statusChipStyle: SxProps<Theme> = {
    fontWeight: 600,
};

export const sectionStyle: SxProps<Theme> = {
    marginBottom: '2rem',
};

export const sectionTitleStyle: SxProps<Theme> = {
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'text.primary',
};

export const descriptionTextStyle: SxProps<Theme> = {
    color: 'text.secondary',
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

export const contactBoxStyle: SxProps<Theme> = {
    padding: '1.5rem',
    backgroundColor: 'grey.50',
    borderRadius: '8px',
    marginTop: '1rem',
};

export const contactItemStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    '&:last-child': {
        marginBottom: 0,
    },
};

export const applicationCardStyle: SxProps<Theme> = {
    padding: '1.5rem',
    marginBottom: '1rem',
    borderLeft: '4px solid',
    borderColor: 'primary.main',
};

export const applicantNameStyle: SxProps<Theme> = {
    fontWeight: 600,
    color: 'text.primary',
};

export const applicationDateStyle: SxProps<Theme> = {
    color: 'text.secondary',
    fontSize: '0.9rem',
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

export const emptyApplicationsStyle: SxProps<Theme> = {
    textAlign: 'center',
    padding: '3rem 2rem',
    color: 'text.secondary',
    backgroundColor: 'grey.50',
    borderRadius: '8px',
};

export const downloadCvButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
};

export const dialogActionsStyle: SxProps<Theme> = {
    padding: '1rem 1.5rem',
};

