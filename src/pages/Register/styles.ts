import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { HEADER_HEIGHT_PX } from '../../common/constants/localConstants';

export const StyledRegisterContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  boxSizing: 'border-box',
  paddingTop: `${HEADER_HEIGHT_PX}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

export const StyledFormBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));
