export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    cvId?: number;
    createdAt?: string;
    updatedAt?: string;
}
