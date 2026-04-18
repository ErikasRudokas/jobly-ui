import { ACCOUNT_ROLES } from '../constants/roleConstants.ts';

export interface DecodedToken {
  roles: string[];
  userId: number;
  token_type: string;
  sub: string;
  iat: number;
  exp: number;
}

export type AccountRole = (typeof ACCOUNT_ROLES)[keyof typeof ACCOUNT_ROLES];

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  role: AccountRole;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
