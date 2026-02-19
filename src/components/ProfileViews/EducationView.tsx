import {Box, Typography} from '@mui/material';
import {School as SchoolIcon} from '@mui/icons-material';
import type {UpdateUserEducation} from '../../common/types/profile.types.ts';
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
import {formatDateYearMonth} from "../../common/utils/genericUtils.ts";

interface EducationViewProps {
    education: UpdateUserEducation[];
}

const EducationView = ({education}: EducationViewProps) => {
    const visibleItems = education.filter(e => !e.delete);

    if (visibleItems.length === 0) {
        return (
            <Box sx={formContainerStyle}>
                <Box sx={emptyStateStyle}>
                    <Typography>No education entries added yet.</Typography>
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
                                <Typography sx={viewItemTitleStyle}>
                                    {item.degree || 'No degree'}
                                </Typography>
                            </Box>
                            {item.startDate && (
                                <Typography sx={viewItemDateStyle}>
                                    {formatDateYearMonth(item.startDate)} - {formatDateYearMonth(item.endDate ?? null)}
                                </Typography>
                            )}
                        </Box>

                        <Box sx={viewItemMetaContainerStyle}>
                            <SchoolIcon sx={viewItemMetaIconStyle}/>
                            <Typography sx={viewItemMetaTextStyle}>
                                {item.institutionName || 'No institution name'}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default EducationView;

