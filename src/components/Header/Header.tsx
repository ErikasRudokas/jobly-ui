import {Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import {HeaderContainerStyle, HeaderNavButtonStyle, HeaderNavLinksStyle, SignInButtonStyle,} from "./styles";
import {ROUTES} from "../../common/constants/routes";
import {authService} from "../../common/services/authService";
import {ROLES} from "../../common/constants/roleConstants";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuOpen(false);
    };

    const handleMobileNavigation = (path: string) => {
        navigate(path);
        setMobileMenuOpen(false);
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

            <IconButton
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    color: 'text.primary',
                }}
                onClick={toggleMobileMenu}
            >
                <MenuIcon />
            </IconButton>

            <Box sx={{
                ...HeaderNavLinksStyle,
                display: { xs: 'none', md: 'flex' },
            }}>
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

            <Drawer
                anchor="top"
                open={mobileMenuOpen}
                onClose={handleMobileMenuClose}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: '100%',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1.5rem' }}>
                        Jobly
                    </Typography>
                    <IconButton onClick={handleMobileMenuClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleMobileNavigation(ROUTES.HOME)}>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleMobileNavigation(ROUTES.JOBS)}>
                            <ListItemText primary="Jobs" />
                        </ListItemButton>
                    </ListItem>
                    {isEmployer && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleMobileNavigation(ROUTES.MY_JOB_OFFERS)}>
                                <ListItemText primary="My Job Offers" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {isUser && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleMobileNavigation(ROUTES.MY_APPLICATIONS)}>
                                <ListItemText primary="My Applications" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {isAdmin && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleMobileNavigation(ROUTES.CATEGORIES)}>
                                <ListItemText primary="Categories" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {isAuthenticated && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleMobileNavigation(ROUTES.PROFILE)}>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    <ListItem disablePadding sx={{ mt: 2 }}>
                        {isAuthenticated ? (
                            <ListItemButton
                                onClick={handleLogout}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    }
                                }}
                            >
                                <LogoutIcon sx={{ mr: 1 }} />
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        ) : (
                            <ListItemButton
                                onClick={() => handleMobileNavigation(ROUTES.LOGIN)}
                                sx={{
                                    backgroundColor: '#2d2d2d',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                    }
                                }}
                            >
                                <LoginIcon sx={{ mr: 1 }} />
                                <ListItemText primary="Sign In" />
                            </ListItemButton>
                        )}
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};

export default Header;
