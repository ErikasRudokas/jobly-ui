import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    marginTop: '2.5rem',
};

export const sectionTitleStyle: SxProps<Theme> = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    color: 'text.primary',
};

export const skillsListContainerStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
};

export const skillTypeGroupStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
};

export const skillTypeHeaderStyle: SxProps<Theme> = {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'text.primary',
    letterSpacing: '0.3px',
    marginBottom: '0.5rem',
};

export const skillItemStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
};

export const skillHeaderStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const skillNameStyle: SxProps<Theme> = {
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'text.primary',
};

export const skillProficiencyStyle: SxProps<Theme> = {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'text.secondary',
};

export const proficiencyBarContainerStyle: SxProps<Theme> = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
};

export const proficiencyBarStyle: SxProps<Theme> = {
    height: '8px',
    flex: 1,
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
};

export const proficiencyBarFilledStyle: SxProps<Theme> = {
    height: '8px',
    flex: 1,
    borderRadius: '4px',
    backgroundColor: 'primary.main',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        opacity: 0.9,
    },
};

export const removeButtonStyle: SxProps<Theme> = {
    minWidth: 'auto',
    padding: '0.25rem',
};

export const emptyStateStyle: SxProps<Theme> = {
    padding: '2rem',
    textAlign: 'center',
    color: 'text.secondary',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
    border: '1px dashed rgba(0, 0, 0, 0.12)',
};

export const deleteCheckboxStyle: SxProps<Theme> = {
    marginLeft: 0,
    marginRight: 0,
    '& .MuiCheckbox-root': {
        padding: '4px',
    },
    '& .MuiCheckbox-root.Mui-checked': {
        color: 'error.main',
    },
};

export const deletedSkillItemStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    opacity: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    padding: '0.75rem',
    borderRadius: '8px',
};

export const statusTextStyle: SxProps<Theme> = {
    fontSize: '0.75rem',
    fontStyle: 'italic',
    color: 'text.secondary',
    marginLeft: '0.5rem',
};
