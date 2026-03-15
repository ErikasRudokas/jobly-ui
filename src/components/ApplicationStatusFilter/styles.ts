import type { SxProps, Theme } from '@mui/material';

export interface StatusToggleColors {
  bg: string;
  color: string;
  borderColor: string;
}

export const containerStyle: SxProps<Theme> = {
  marginBottom: '1.5rem',
};

export const statusToggleGroupStyle: SxProps<Theme> = {
  gap: '0.5rem',
  flexWrap: 'wrap',
  '& .MuiToggleButtonGroup-grouped': {
    border: '1px solid',
    borderRadius: '20px !important',
    px: 2,
    py: 0.6,
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'none',
    lineHeight: 1.4,
    transition: 'all 0.18s ease',
    '&:not(:first-of-type)': { marginLeft: 0 },
  },
};

export const statusToggleButtonStyle = (isSelected: boolean, colors: StatusToggleColors): SxProps<Theme> => ({
  color: isSelected ? colors.color : 'text.secondary',
  borderColor: isSelected ? colors.borderColor : 'divider',
  backgroundColor: isSelected ? colors.bg : 'transparent',
  '&:hover': {
    backgroundColor: colors.bg,
    borderColor: colors.borderColor,
    color: colors.color,
  },
  '&.Mui-selected': {
    color: colors.color,
    backgroundColor: colors.bg,
    borderColor: colors.borderColor,
    '&:hover': { backgroundColor: colors.bg },
  },
});
