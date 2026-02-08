import {Box, Typography} from '@mui/material';
import {Category as CategoryIcon} from '@mui/icons-material';
import type {JobOffer} from '../../common/types/jobOffer.types';
import {formatSalary} from '../../common/utils/genericUtils';
import {
    bulletStyle,
    categoryIconStyle,
    companyNameStyle,
    companyRowStyle,
    headerSectionStyle,
    metaInfoRowStyle,
    metaTextStyle,
    postedByTextStyle,
    salaryTextStyle,
    statusTextStyle,
    titleStyle,
} from './styles';

interface JobDetailsHeaderProps {
    jobOffer: JobOffer;
}

const JobDetailsHeader = ({jobOffer}: JobDetailsHeaderProps) => {
    return (
        <Box sx={headerSectionStyle}>
            <Typography variant="h3" sx={titleStyle}>
                {jobOffer.title}
            </Typography>

            <Box sx={companyRowStyle}>
                <Typography variant="h6" sx={companyNameStyle}>
                    {jobOffer.companyName}
                </Typography>
                <Typography sx={bulletStyle}>•</Typography>
                <Typography sx={postedByTextStyle}>
                    Posted by {jobOffer.creator.firstName} {jobOffer.creator.lastName}
                </Typography>
            </Box>

            <Box sx={metaInfoRowStyle}>
                <Typography sx={metaTextStyle}>
                    <CategoryIcon sx={categoryIconStyle} />
                    {jobOffer.category.name}
                </Typography>
                <Typography sx={bulletStyle}>•</Typography>
                <Typography sx={statusTextStyle(jobOffer.offerStatus)}>
                    {jobOffer.offerStatus}
                </Typography>
                <Typography sx={bulletStyle}>•</Typography>
                <Typography sx={salaryTextStyle}>
                    {formatSalary(jobOffer.salary)}
                </Typography>
            </Box>
        </Box>
    );
};

export default JobDetailsHeader;

