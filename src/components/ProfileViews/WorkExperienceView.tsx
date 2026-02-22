import { Box, Typography } from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';
import type { UpdateUserWorkExperience } from '../../common/types/profile.types.ts';
import {
  emptyStateStyle,
  formContainerStyle,
  itemsListStyle,
  viewItemCardStyle,
  viewItemDateStyle,
  viewItemHeaderStyle,
  viewItemMetaContainerStyle,
  viewItemMetaIconStyle,
  viewItemMetaTextStyle,
  viewItemTitleContainerStyle,
  viewItemTitleStyle,
} from './styles.ts';
import { formatDateYearMonth } from '../../common/utils/genericUtils.ts';

interface WorkExperienceViewProps {
  workExperience: UpdateUserWorkExperience[];
}

const WorkExperienceView = ({ workExperience }: WorkExperienceViewProps) => {
  const visibleItems = workExperience.filter((we) => !we.delete);

  if (visibleItems.length === 0) {
    return (
      <Box sx={formContainerStyle}>
        <Box sx={emptyStateStyle}>
          <Typography>No work experience added yet.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={formContainerStyle}>
      <Box sx={itemsListStyle}>
        {visibleItems.map((item) => (
          <Box key={item.id} sx={viewItemCardStyle}>
            <Box sx={viewItemHeaderStyle}>
              <Box sx={viewItemTitleContainerStyle}>
                <Typography sx={viewItemTitleStyle}>{item.designation || 'No designation'}</Typography>
              </Box>
              {item.startDate && (
                <Typography sx={viewItemDateStyle}>
                  {formatDateYearMonth(item.startDate)} - {formatDateYearMonth(item.endDate ?? null)}
                </Typography>
              )}
            </Box>

            <Box sx={viewItemMetaContainerStyle}>
              <WorkIcon sx={viewItemMetaIconStyle} />
              <Typography sx={viewItemMetaTextStyle}>{item.companyName || 'No company name'}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WorkExperienceView;
