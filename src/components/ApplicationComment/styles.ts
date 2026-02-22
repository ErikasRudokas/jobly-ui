import type { SxProps, Theme } from '@mui/material';

export const commentBoxStyle: SxProps<Theme> = {
  padding: '1.5rem',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'divider',
};

export const commentTextStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontStyle: 'italic',
  lineHeight: 1.8,
  whiteSpace: 'pre-wrap',
  fontSize: '1rem',
};

export const sectionTitleStyle: SxProps<Theme> = {
  fontWeight: 600,
  marginBottom: '1.25rem',
  color: 'text.primary',
  fontSize: '1.25rem',
};
