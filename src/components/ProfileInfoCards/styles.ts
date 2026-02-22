import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledInfoGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const StyledInfoCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
}));
