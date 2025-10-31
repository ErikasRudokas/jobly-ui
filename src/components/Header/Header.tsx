import {Box, Button, Typography} from "@mui/material";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {HeaderContainerStyle, HeaderNavButtonStyle, HeaderNavLinksStyle, SignInButtonStyle,} from "./styles";
import {ROUTES} from "../../common/constants/routes";
import {authService} from "../../common/services/authService";
import {ROLES} from "../../common/constants/roleConstants";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAdmin = authService.hasRole(ROLES.ADMINISTRATOR);
    const isEmployer = authService.hasRole(ROLES.EMPLOYER);
    const isUser = authService.hasRole(ROLES.USER);
    const isAuthenticated = authService.isAuthenticated();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const handleLogout = async () => {
        await authService.logout();
        navigate(ROUTES.LOGIN);
    };

    return (
        <Box component="header" sx={HeaderContainerStyle}>
            <Typography
                variant="h6"
                component="div"
                sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    fontSize: "1.5rem",
                }}
            >
                Jobly
            </Typography>
            <Box sx={HeaderNavLinksStyle}>
                <Button
                    component={RouterLink}
                    to={ROUTES.HOME}
                    className={isActive(ROUTES.HOME) ? "active" : ""}
                    sx={HeaderNavButtonStyle}
                    disableRipple
                >
                    Home
                </Button>
                <Button
                    component={RouterLink}
                    to={ROUTES.JOBS}
                    className={isActive(ROUTES.JOBS) ? "active" : ""}
                    sx={HeaderNavButtonStyle}
                    disableRipple
                >
                    Jobs
                </Button>
                {isEmployer && (
                    <Button
                        component={RouterLink}
                        to={ROUTES.MY_JOB_OFFERS}
                        className={isActive(ROUTES.MY_JOB_OFFERS) ? "active" : ""}
                        sx={HeaderNavButtonStyle}
                        disableRipple
                    >
                        My Job Offers
                    </Button>
                )}
                {isUser && (
                    <Button
                        component={RouterLink}
                        to={ROUTES.MY_APPLICATIONS}
                        className={isActive(ROUTES.MY_APPLICATIONS) ? "active" : ""}
                        sx={HeaderNavButtonStyle}
                        disableRipple
                    >
                        My Applications
                    </Button>
                )}
                {isAdmin && (
                    <Button
                        component={RouterLink}
                        to={ROUTES.CATEGORIES}
                        className={isActive(ROUTES.CATEGORIES) ? "active" : ""}
                        sx={HeaderNavButtonStyle}
                        disableRipple
                    >
                        Categories
                    </Button>
                )}
                {isAuthenticated && (
                    <Button
                        component={RouterLink}
                        to={ROUTES.PROFILE}
                        className={isActive(ROUTES.PROFILE) ? "active" : ""}
                        sx={HeaderNavButtonStyle}
                        disableRipple
                    >
                        Profile
                    </Button>
                )}
                {isAuthenticated ? (
                    <Button
                        variant="contained"
                        onClick={handleLogout}
                        sx={SignInButtonStyle}
                        startIcon={<LogoutIcon/>}
                        disableRipple
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to={ROUTES.LOGIN}
                        sx={SignInButtonStyle}
                        startIcon={<LoginIcon/>}
                        disableRipple
                    >
                        Sign In
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Header;
