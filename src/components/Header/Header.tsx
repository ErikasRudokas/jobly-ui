import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import {
  HeaderContainerStyle,
  HeaderNavLinksStyle,
  HeaderNavButtonStyle,
  SignInButtonStyle,
} from "./styles";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
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
          to="/"
          className={isActive("/") ? "active" : ""}
          sx={HeaderNavButtonStyle}
          disableRipple
        >
          Home
        </Button>
        <Button
          component={RouterLink}
          to="/jobs"
          className={isActive("/jobs") ? "active" : ""}
          sx={HeaderNavButtonStyle}
          disableRipple
        >
          Jobs
        </Button>
        <Button
          component={RouterLink}
          to="/profile"
          className={isActive("/profile") ? "active" : ""}
          sx={HeaderNavButtonStyle}
          disableRipple
        >
          Profile
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to="/profile"
          sx={SignInButtonStyle}
          startIcon={<LoginIcon />}
          disableRipple
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
