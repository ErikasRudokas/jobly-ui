import type { SxProps } from "@mui/material";
import { lightTheme } from "../../common/themes/light-theme";

export const HomeContainerStyle: SxProps = {
  height: "calc(100vh - 64px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "24px",
};

export const HomeHeadingStyle: SxProps = {
  fontWeight: 700,
  textAlign: "center",
  maxWidth: "800px",
};

export const HomeAccentTextStyle: SxProps = {
  color: lightTheme.palette.primary.main,
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: "-8px",
    width: "100%",
    height: "4px",
    backgroundColor: lightTheme.palette.primary.main,
    borderRadius: "2px",
  },
};

export const HomeSubheadingStyle: SxProps = {
  maxWidth: "700px",
  fontWeight: 400,
  lineHeight: 1.6,
};

export const HomeButtonContainerStyle: SxProps = {
  marginTop: "16px",
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
  justifyContent: "center",
};

export const HomeButtonStyle: SxProps = {
  paddingLeft: "32px",
  paddingRight: "32px",
  paddingTop: "12px",
  paddingBottom: "12px",
};
