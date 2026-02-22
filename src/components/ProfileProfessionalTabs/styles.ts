import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material';
import { Tab, Tabs } from '@mui/material';

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(3),
  width: '100%',
  '& .MuiTabs-flexContainer': {
    width: '100%',
  },
}));

export const StyledTab = styled(Tab)(() => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  flex: 1,
  maxWidth: 'none',
}));

export const tabPanelStyle: SxProps<Theme> = {
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
};
