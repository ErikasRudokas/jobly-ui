import {Box, Typography} from '@mui/material';
import {AttachMoney as SalaryIcon, LocationOn as LocationIcon, WorkOutline as WorkTypeIcon,} from '@mui/icons-material';
import type {WorkType} from '../../common/types/jobOffer.types';
import {formatSalary, formatWorkType} from '../../common/utils/genericUtils';
import {
    detailIconStyle,
    detailItemStyle,
    detailLabelStyle,
    detailsGridStyle,
    detailValueStyle,
    sectionTitleStyle,
} from './styles';

interface ApplicationJobDetailsProps {
    salary: number;
    workType: WorkType;
    location: string;
}

const ApplicationJobDetails = ({salary, workType, location}: ApplicationJobDetailsProps) => {
    return (
        <Box>
            <Typography variant="h6" sx={sectionTitleStyle}>
                Job Details
            </Typography>
            <Box sx={detailsGridStyle}>
                <Box sx={detailItemStyle}>
                    <SalaryIcon sx={detailIconStyle} />
                    <Box>
                        <Typography sx={detailLabelStyle}>Salary</Typography>
                        <Typography sx={detailValueStyle}>{formatSalary(salary)}</Typography>
                    </Box>
                </Box>
                <Box sx={detailItemStyle}>
                    <WorkTypeIcon sx={detailIconStyle} />
                    <Box>
                        <Typography sx={detailLabelStyle}>Work Type</Typography>
                        <Typography sx={detailValueStyle}>{formatWorkType(workType)}</Typography>
                    </Box>
                </Box>
                <Box sx={detailItemStyle}>
                    <LocationIcon sx={detailIconStyle} />
                    <Box>
                        <Typography sx={detailLabelStyle}>Location</Typography>
                        <Typography sx={detailValueStyle}>{location}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ApplicationJobDetails;

