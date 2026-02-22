import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Tooltip, Typography } from '@mui/material';
import { deleteCheckboxStyle, statusBadgeStyle } from './styles';

interface FormItemActionControlsProps {
  isNew: boolean;
  isModified: boolean;
  isMarkedForDeletion: boolean;
  onRemove: () => void;
  disabled?: boolean;
}

const FormItemActionControls = ({
  isNew,
  isModified,
  isMarkedForDeletion,
  onRemove,
  disabled = false,
}: FormItemActionControlsProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {!isMarkedForDeletion && isNew && <Typography sx={statusBadgeStyle}>Added</Typography>}
        {!isMarkedForDeletion && !isNew && isModified && <Typography sx={statusBadgeStyle}>Modified</Typography>}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {!isNew && (
          <Tooltip title={isMarkedForDeletion ? 'Unmark deletion' : 'Mark for deletion'} arrow>
            <Checkbox
              checked={isMarkedForDeletion}
              onChange={onRemove}
              disabled={disabled}
              size="small"
              sx={deleteCheckboxStyle}
            />
          </Tooltip>
        )}
        {isNew && (
          <IconButton size="small" onClick={onRemove} disabled={disabled}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default FormItemActionControls;
