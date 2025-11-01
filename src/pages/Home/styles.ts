import type {SxProps} from "@mui/material";
import {lightTheme} from "../../common/themes/light-theme";

export const HomeContainerStyle: SxProps = {
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: { xs: 2, md: 4 },
};

export const HomeContentWrapperStyle: SxProps = {
    display: "flex",
    alignItems: "center",
    gap: { xs: 4, md: 6 },
    flexWrap: "wrap",
    width: "100%",
};

export const HomeHeadingStyle: SxProps = {
    fontWeight: 700,
    textAlign: { xs: "center", md: "left" },
    marginBottom: 2,
};

export const HomeAccentTextStyle: SxProps = {
    color: lightTheme.palette.primary.main,
    position: "relative",
    "&::after": {
        content: '""',
        position: "absolute",
        left: "0",
        bottom: "-8px",
        height: "4px",
        backgroundColor: lightTheme.palette.primary.main,
        borderRadius: "2px",
        animation: "underlineSlide 2.5s ease-in-out infinite",
    },
    "@keyframes underlineSlide": {
        "0%": {
            width: "0%",
            left: "0",
        },
        "50%": {
            width: "100%",
            left: "0",
        },
        "100%": {
            width: "0%",
            left: "100%",
        },
    },
};

export const HomeSubheadingStyle: SxProps = {
    fontWeight: 400,
    lineHeight: 1.6,
    textAlign: { xs: "center", md: "left" },
    marginTop: 2,
};

export const HomeImageStyle: SxProps = {
    maxWidth: "100%",
    height: "auto",
    maxHeight: { xs: "300px", sm: "400px", md: "500px" },
    width: "100%",
    objectFit: "contain",
};
