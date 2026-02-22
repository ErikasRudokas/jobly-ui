import type { SxProps, Theme } from '@mui/material';
import { Button, CircularProgress } from '@mui/material';
import type { ReactNode } from 'react';
import { baseButtonStyle } from './styles';

interface AppButtonProps {
  children: ReactNode;
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'error' | 'success' | 'warning' | 'inherit';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
}

const AppButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  startIcon,
  size = 'medium',
  sx,
  fullWidth,
}: AppButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={18} color="inherit" /> : startIcon}
      size={size}
      fullWidth={fullWidth}
      sx={[baseButtonStyle, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      {children}
    </Button>
  );
};

export default AppButton;
