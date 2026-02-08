export type SkillType = 'TECHNICAL' | 'SOFT';

export type SkillProficiency = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface Skill {
    id: number;
    name: string;
    type: SkillType;
}

export interface GetAllSkillsResponse {
    total: number;
    skills: Skill[];
}

export interface SkillWithProficiency {
    skillId: number;
    name: string;
    type: SkillType;
    proficiency: SkillProficiency;
}

