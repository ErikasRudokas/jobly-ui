import {Close as CloseIcon} from '@mui/icons-material';
import {Box, IconButton, Typography} from '@mui/material';
import type {Skill, SkillProficiency, SkillWithProficiency} from '../../common/types/skill.types';
import SkillSearchBox from '../SkillSearchBox/SkillSearchBox';
import {
    emptyStateStyle,
    proficiencyBarContainerStyle,
    proficiencyBarFilledStyle,
    proficiencyBarStyle,
    removeButtonStyle,
    skillHeaderStyle,
    skillItemStyle,
    skillNameStyle,
    skillProficiencyStyle,
    skillsListContainerStyle,
    skillTypeGroupStyle,
    skillTypeHeaderStyle,
} from '../../common/styles/styles.skills';
import {
    formatProficiency,
    getProficiencyFromLevel,
    getProficiencyLevel
} from "../../common/utils/skillProficiencyUtils.ts";
import {containerStyle, sectionTitleStyle} from "./styles.ts";

interface CreateJobOfferSkillSectionProps {
    selectedSkills: SkillWithProficiency[];
    onSkillsChange: (skills: SkillWithProficiency[]) => void;
    disabled?: boolean;
}

const CreateJobOfferSkillSection = ({
    selectedSkills,
    onSkillsChange,
    disabled = false,
}: CreateJobOfferSkillSectionProps) => {
    const handleAddSkill = (skill: Skill) => {
        const newSkill: SkillWithProficiency = {
            skillId: skill.id,
            name: skill.name,
            type: skill.type,
            proficiency: 'BEGINNER',
        };

        onSkillsChange([...selectedSkills, newSkill]);
    };

    const handleRemoveSkill = (skillId: number) => {
        onSkillsChange(selectedSkills.filter(s => s.skillId !== skillId));
    };

    const handleProficiencyChange = (skillId: number, proficiency: SkillProficiency) => {
        onSkillsChange(
            selectedSkills.map(skill =>
                skill.skillId === skillId ? {...skill, proficiency} : skill
            )
        );
    };

    const groupSkillsByType = (skills: SkillWithProficiency[]) => {
        const technical = skills.filter(skill => skill.type === 'TECHNICAL');
        const soft = skills.filter(skill => skill.type === 'SOFT');
        return {technical, soft};
    };

    const {technical, soft} = groupSkillsByType(selectedSkills);

    const renderProficiencyBars = (skill: SkillWithProficiency) => {
        const currentLevel = getProficiencyLevel(skill.proficiency);
        return (
            <Box sx={proficiencyBarContainerStyle}>
                {[1, 2, 3, 4].map(level => (
                    <Box
                        key={level}
                        sx={level <= currentLevel ? proficiencyBarFilledStyle : proficiencyBarStyle}
                        onClick={() =>
                            !disabled && handleProficiencyChange(skill.skillId, getProficiencyFromLevel(level))
                        }
                    />
                ))}
            </Box>
        );
    };

    return (
        <Box sx={containerStyle}>
            <Typography sx={sectionTitleStyle}>Required Skills</Typography>

            <SkillSearchBox
                excludeSkillIds={selectedSkills.map(s => s.skillId)}
                onAddSkill={handleAddSkill}
                disabled={disabled}
            />

            {selectedSkills.length === 0 ? (
                <Box sx={emptyStateStyle}>
                    <Typography>No skills added yet. Search and add skills above.</Typography>
                </Box>
            ) : (
                <Box sx={skillsListContainerStyle}>
                    {technical.length > 0 && (
                        <Box sx={skillTypeGroupStyle}>
                            <Typography sx={skillTypeHeaderStyle}>Technical Skills</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                                {technical.map((skill) => (
                                    <Box key={skill.skillId} sx={skillItemStyle}>
                                        <Box sx={skillHeaderStyle}>
                                            <Typography sx={skillNameStyle}>{skill.name}</Typography>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                                <Typography sx={skillProficiencyStyle}>
                                                    {formatProficiency(skill.proficiency)}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemoveSkill(skill.skillId)}
                                                    disabled={disabled}
                                                    sx={removeButtonStyle}
                                                >
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        {renderProficiencyBars(skill)}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                    {soft.length > 0 && (
                        <Box sx={skillTypeGroupStyle}>
                            <Typography sx={skillTypeHeaderStyle}>Soft Skills</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                                {soft.map((skill) => (
                                    <Box key={skill.skillId} sx={skillItemStyle}>
                                        <Box sx={skillHeaderStyle}>
                                            <Typography sx={skillNameStyle}>{skill.name}</Typography>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                                <Typography sx={skillProficiencyStyle}>
                                                    {formatProficiency(skill.proficiency)}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemoveSkill(skill.skillId)}
                                                    disabled={disabled}
                                                    sx={removeButtonStyle}
                                                >
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        {renderProficiencyBars(skill)}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default CreateJobOfferSkillSection;

