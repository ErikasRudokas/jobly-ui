import {type ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {authService} from '../../common/services/authService';
import {ROUTES} from '../../common/constants/routes';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string;
}

export default function ProtectedRoute({children, requiredRole}: ProtectedRouteProps) {
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace/>;
    }

    if (requiredRole && !authService.hasRole(requiredRole)) {
        return <Navigate to={ROUTES.HOME} replace/>;
    }

    return <>{children}</>;
}