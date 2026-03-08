import type { SxProps, Theme } from '@mui/material';

const getColor = (percent: number): { bg: string; text: string; border: string } => {
  if (percent >= 75) return { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7' };
  if (percent >= 40) return { bg: '#fff8e1', text: '#e65100', border: '#ffcc80' };
  return { bg: '#fce4ec', text: '#c62828', border: '#ef9a9a' };
};

export const badgeStyle = (percent: number): SxProps<Theme> => {
  const { bg, text, border } = getColor(percent);
  return {
    display: 'inline-flex',
    alignItems: 'center',
    px: '0.5rem',
    py: '0.2rem',
    borderRadius: '999px',
    backgroundColor: bg,
    color: text,
    border: `1px solid ${border}`,
    cursor: 'default',
  };
};
