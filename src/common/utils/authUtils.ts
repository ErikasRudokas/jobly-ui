const BEARER_PREFIX = 'Bearer ';

export const formatAuthorizationHeader = (token: string): string => {
    return `${BEARER_PREFIX}${token}`;
}