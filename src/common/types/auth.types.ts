export interface DecodedToken {
    roles: string[];
    userId: number;
    token_type: string;
    sub: string;
    iat: number;
    exp: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

