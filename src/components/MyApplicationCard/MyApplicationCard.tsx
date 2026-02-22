import {Box, Paper, Typography} from '@mui/material';
import {Category as CategoryIcon, LocationOn as LocationIcon, Work as WorkIcon,} from '@mui/icons-material';
import type {MyApplicationListObject} from '../../common/types/application.types';
import {formatDate, formatSalary, formatWorkType} from '../../common/utils/genericUtils';
import StatusBadge from '../StatusBadge/StatusBadge';
import {
    cardStyle,
    companyStyle,
    headerRowStyle,
    metaItemStyle,
    metaRowStyle,
    separatorStyle,
    titleStyle,
    updatedAtStyle,
} from './styles';

interface MyApplicationCardProps {
    application: MyApplicationListObject;
    onClick: (id: number) => void;
}

const MyApplicationCard = ({application, onClick}: MyApplicationCardProps) => {
    return (
        <Paper sx={cardStyle} onClick={() => onClick(application.id)} elevation={0}>
            <Box sx={headerRowStyle}>
                <Box sx={{flex: 1, minWidth: 0}}>
                    <Typography sx={titleStyle} noWrap>
                        {application.jobOffer.title}
                    </Typography>
                    <Typography sx={companyStyle}>
                        {application.jobOffer.companyName}
                    </Typography>
                </Box>
                <Typography sx={updatedAtStyle}>
                    {formatDate(application.updatedAt)}
                </Typography>
            </Box>

            <Box sx={{...metaRowStyle, justifyContent: 'space-between'}}>
                <Box sx={metaRowStyle}>
                    <Box sx={metaItemStyle}>
                        <WorkIcon sx={{fontSize: '0.95rem'}} />
                        <Typography sx={{fontSize: '0.85rem', color: 'text.secondary'}}>
                            {formatWorkType(application.jobOffer.workType)}
                        </Typography>
                    </Box>
                    <Box sx={separatorStyle} />
                    <Box sx={metaItemStyle}>
                        <LocationIcon sx={{fontSize: '0.95rem'}} />
                        <Typography sx={{fontSize: '0.85rem', color: 'text.secondary'}}>
                            {application.jobOffer.location}
                        </Typography>
                    </Box>
                    <Box sx={separatorStyle} />
                    <Box sx={metaItemStyle}>
                        <CategoryIcon sx={{fontSize: '0.95rem'}} />
                        <Typography sx={{fontSize: '0.85rem', color: 'text.secondary'}}>
                            {application.jobOffer.category.name}
                        </Typography>
                    </Box>
                    <Box sx={separatorStyle} />
                    <Typography sx={{fontSize: '0.85rem', color: 'text.secondary', fontWeight: 600}}>
                        {formatSalary(application.jobOffer.salary)}
                    </Typography>
                </Box>
                <StatusBadge status={application.applicationStatus} />
            </Box>
        </Paper>
    );
};

export default MyApplicationCard;
