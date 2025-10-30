import {Box, Typography, Button} from "@mui/material";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
    HeaderContainerStyle,
    HeaderNavLinksStyle,
    HeaderNavButtonStyle,
    SignInButtonStyle,
} from "./styles";
import {ROUTES} from "../../common/constants/routes.ts";
import {authService} from "../../common/services/authService";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const handleLogout = () => {
        authService.logout();
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
