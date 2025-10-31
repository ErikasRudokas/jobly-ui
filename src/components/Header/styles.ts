import type {SxProps} from "@mui/material";
import {lightTheme} from "../../common/themes/light-theme";

export const HeaderContainerStyle: SxProps = {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1100,
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
    height: "64px",
    borderBottom: `1px solid ${lightTheme.palette.border.light}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: { xs: "0 16px", md: "0 32px" },
};

export const HeaderNavLinksStyle: SxProps = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    height: "100%",
};

export const HeaderNavButtonStyle: SxProps = {
    color: lightTheme.palette.text.primary,
    fontWeight: 500,
    fontSize: "0.95rem",
    padding: "8px 20px",
    height: "100%",
    borderRadius: 0,
    position: "relative",
    transition: "color 0.3s ease",
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: "2px",
        backgroundColor: "#6b7280",
        transition: "width 0.3s ease",
    },
    "&:hover": {
        backgroundColor: "transparent",
        "&::after": {
            width: "100%",
        },
    },
    "&.active": {
        color: lightTheme.palette.primary.main,
        "&::after": {
            width: "100%",
            backgroundColor: lightTheme.palette.primary.main,
        },
    },
};

export const SignInButtonStyle: SxProps = {
    borderRadius: "6px",
    marginLeft: "24px",
    padding: "10px 24px",
    backgroundColor: "#2d2d2d",
    color: "#ffffff",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "background-color 0.3s ease",
    "& .MuiButton-startIcon": {
        marginRight: "8px",
    },
    "&:hover": {
        backgroundColor: lightTheme.palette.primary.main,
    },
};
