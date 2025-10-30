import type { SxProps } from "@mui/material";
import { lightTheme } from "../../common/themes/light-theme";

export const FooterContainerStyle: SxProps = {
  paddingY: "32px",
  paddingX: "16px",
  marginTop: "auto",
  backgroundColor: lightTheme.palette.background.paper,
  borderTop: `1px solid ${lightTheme.palette.divider}`,
};

export const FooterTitleStyle: SxProps = {
  fontWeight: 600,
  marginBottom: "8px",
};
