export type SkillType = 'TECHNICAL' | 'SOFT';

export type SkillProficiency = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface SkillAlias {
  id: number;
  value: string;
}

export interface Skill {
  id: number;
  name: string;
  description: string;
  type: SkillType;
  aliases?: SkillAlias[];
}

export interface SkillAliasCreateRequest {
  value: string;
}

export interface SkillAliasUpdateRequest {
  id?: number;
  value?: string;
  delete?: boolean;
}

export interface SkillCreateRequest {
  name: string;
  description: string;
  type: SkillType;
  aliases?: SkillAliasCreateRequest[];
}

export interface SkillUpdateRequest {
  name: string;
  description: string;
  type: SkillType;
  aliases?: SkillAliasUpdateRequest[];
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
