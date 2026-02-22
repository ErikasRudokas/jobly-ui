import type {SxProps, Theme} from '@mui/material';

export const formContainerStyle: SxProps<Theme> = {
    marginTop: '1.5rem',
};

export const itemsListStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginTop: '1rem',
};

export const itemCardStyle: SxProps<Theme> = {
    padding: '1rem',
    backgroundColor: 'background.paper',
    borderRadius: '12px',
    border: '1px solid',
    borderColor: 'divider',
    transition: 'all 0.2s ease',
    '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderColor: 'primary.light',
    },
};

export const deletedItemCardStyle: SxProps<Theme> = {
    padding: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '12px',
    border: '1px solid',
    borderColor: 'divider',
    opacity: 0.6,
};

export const statusBadgeStyle: SxProps<Theme> = {
    fontSize: '0.75rem',
    fontStyle: 'italic',
    color: 'text.secondary',
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

export const fieldLabelStyle: SxProps<Theme> = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'text.primary',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

export const fieldLabelWithIconStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem'
};

export const textFieldStyle: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'background.default',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
        },
        '&.Mui-focused': {
            backgroundColor: 'background.paper',
        }
    }
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

