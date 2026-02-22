import {Box, Paper, Typography} from '@mui/material';
import {Category as CategoryIcon, LocationOn as LocationIcon, Work as WorkIcon,} from '@mui/icons-material';
import type {JobOfferListObject} from '../../common/types/jobOffer.types';
import {formatSalary, formatWorkType} from '../../common/utils/genericUtils';
import {
    cardStyle,
    companyStyle,
    headerRowStyle,
    metaItemStyle,
    metaRowStyle,
    salaryStyle,
    separatorStyle,
    titleStyle,
} from './styles';

interface JobOfferCardProps {
    jobOffer: JobOfferListObject;
    onClick: (id: number) => void;
}

const JobOfferCard = ({jobOffer, onClick}: JobOfferCardProps) => {
    return (
        <Paper sx={cardStyle} onClick={() => onClick(jobOffer.id)} elevation={0}>
            <Box sx={headerRowStyle}>
                <Box sx={{flex: 1, minWidth: 0}}>
                    <Typography sx={titleStyle} noWrap>
                        {jobOffer.title}
                    </Typography>
                    <Typography sx={companyStyle}>
                        {jobOffer.companyName}
                    </Typography>
                </Box>
                <Typography sx={salaryStyle}>
                    {formatSalary(jobOffer.salary)}
                </Typography>
            </Box>

            <Box sx={metaRowStyle}>
                <Box sx={metaItemStyle}>
                    <WorkIcon sx={{fontSize: '0.95rem'}} />
                    <Typography sx={{fontSize: '0.85rem', color: 'text.secondary'}}>
                        {formatWorkType(jobOffer.workType)}
                    </Typography>
                </Box>
                <Box sx={separatorStyle} />
                <Box sx={metaItemStyle}>
                    <LocationIcon sx={{fontSize: '0.95rem'}} />
                    <Typography sx={{fontSize: '0.85rem', color: 'text.secondary'}}>
                        {jobOffer.location}
                    </Typography>
                </Box>
                <Box sx={separatorStyle} />
                <Box sx={metaItemStyle}>
                    <CategoryIcon sx={{fontSize: '0.95rem'}} />
                    <Typography sx={{fontSize: '0.85rem', color: 'text.secondary'}}>
                        {jobOffer.category.name}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default JobOfferCard;

