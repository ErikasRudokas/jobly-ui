import {Box, LinearProgress, Typography} from '@mui/material';
import type {JobOfferSkill} from '../../common/types/jobOffer.types';
import {
    progressBarStyle,
    skillHeaderStyle,
    skillItemStyle,
    skillNameStyle,
    skillProficiencyStyle,
    skillsContainerStyle,
    skillTypeGroupStyle,
    skillTypeHeaderStyle,
} from './styles';

interface SkillsSectionProps {
    skills: JobOfferSkill[];
}

const SkillsSection = ({skills}: SkillsSectionProps) => {
    const getProficiencyValue = (proficiency: string): number => {
        switch (proficiency) {
            case 'BEGINNER':
                return 25;
            case 'INTERMEDIATE':
                return 50;
            case 'ADVANCED':
                return 75;
            case 'EXPERT':
                return 100;
            default:
                return 0;
        }
    };

    const formatProficiency = (proficiency: string) => {
        return proficiency.charAt(0) + proficiency.slice(1).toLowerCase();
    };

    const groupSkillsByType = (skills: JobOfferSkill[]) => {
        const technical = skills.filter(skill => skill.type === 'TECHNICAL');
        const soft = skills.filter(skill => skill.type === 'SOFT');
        return {technical, soft};
    };

    if (!skills || skills.length === 0) {
        return null;
    }

    const {technical, soft} = groupSkillsByType(skills);

    return (
        <Box sx={skillsContainerStyle}>
            {technical.length > 0 && (
                <Box sx={skillTypeGroupStyle}>
                    <Typography sx={skillTypeHeaderStyle}>
                        Technical Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {technical.map((skill) => (
                            <Box key={skill.skillId} sx={skillItemStyle}>
                                <Box sx={skillHeaderStyle}>
                                    <Typography sx={skillNameStyle}>
                                        {skill.name}
                                    </Typography>
                                    <Typography sx={skillProficiencyStyle}>
                                        {formatProficiency(skill.proficiency)}
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={getProficiencyValue(skill.proficiency)}
                                    color={"primary"}
                                    sx={progressBarStyle}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
            {soft.length > 0 && (
                <Box sx={skillTypeGroupStyle}>
                    <Typography sx={skillTypeHeaderStyle}>
                        Soft Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {soft.map((skill) => (
                            <Box key={skill.skillId} sx={skillItemStyle}>
                                <Box sx={skillHeaderStyle}>
                                    <Typography sx={skillNameStyle}>
                                        {skill.name}
                                    </Typography>
                                    <Typography sx={skillProficiencyStyle}>
                                        {formatProficiency(skill.proficiency)}
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={getProficiencyValue(skill.proficiency)}
                                    color={"primary"}
                                    sx={progressBarStyle}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default SkillsSection;

