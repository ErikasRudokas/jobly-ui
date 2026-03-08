import { Box, Tooltip, Typography } from '@mui/material';
import { badgeStyle } from './styles';

interface SkillMatchBadgeProps {
  /** Raw value between 0 and 1. Pass null/undefined to render nothing. */
  value: number | null | undefined;
  tooltip?: string;
}

const SkillMatchBadge = ({ value, tooltip = 'Skills match based on your profile' }: SkillMatchBadgeProps) => {
  if (value === null || value === undefined) return null;

  const percent = Math.round(value * 100);

  return (
    <Tooltip title={tooltip} placement="top" arrow>
      <Box sx={badgeStyle(percent)}>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, lineHeight: 1 }}>{percent}%</Typography>
      </Box>
    </Tooltip>
  );
};

export default SkillMatchBadge;
