import {sectionStyle, sectionTitleStyle} from "../../pages/JobDetails/styles.ts";
import {Box, Typography} from "@mui/material";
import type {JobOffer} from "../../common/types/jobOffer.types.ts";
import {formatWorkType} from "../../common/utils/genericUtils.ts";
import {detailIconStyle, detailItemStyle, detailLabelStyle, detailsGridStyle, detailValueStyle} from "./styles.ts";
import {LocationOn as LocationIcon, TrendingUp as ExperienceIcon, WorkOutline as WorkIcon,} from '@mui/icons-material';

interface JobDetailsSectionProps {
    jobOffer: JobOffer;
}

const JobOfferDetailsCard = ({jobOffer}: JobDetailsSectionProps) => {
    return (
        <Box sx={sectionStyle}>
            <Typography variant="h6" sx={sectionTitleStyle}>
                Job Details
            </Typography>
            <Box sx={detailsGridStyle}>
                <Box sx={detailItemStyle}>
                    <WorkIcon sx={detailIconStyle} />
                    <Box>
                        <Typography sx={detailLabelStyle}>Work Type</Typography>
                        <Typography sx={detailValueStyle}>
                            {formatWorkType(jobOffer.workType)}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={detailItemStyle}>
                    <LocationIcon sx={detailIconStyle} />
                    <Box>
                        <Typography sx={detailLabelStyle}>Location</Typography>
                        <Typography sx={detailValueStyle}>
                            {jobOffer.location}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={detailItemStyle}>
                    <ExperienceIcon sx={detailIconStyle} />
                    <Box>
                        <Typography sx={detailLabelStyle}>Experience Required</Typography>
                        <Typography sx={detailValueStyle}>
                            {jobOffer.yearsOfExperience} {jobOffer.yearsOfExperience === 1 ? 'year' : 'years'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default JobOfferDetailsCard;
