import { Box } from '@mui/material';
import type { ApplicationStatus } from '../../common/types/application.types';
import { formatApplicationStatus } from '../../common/utils/genericUtils';
import { statusBadgeStyle } from './styles';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Box sx={statusBadgeStyle(status)}>{formatApplicationStatus(status)}</Box>;
};

export default StatusBadge;
