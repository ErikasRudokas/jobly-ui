import {createTheme} from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
        border: {
            main: string;
            light: string;
        };
        accent: {
            main: string;
            light: string;
            dark: string;
        };
    }

    interface PaletteOptions {
        border?: {
            main: string;
            light: string;
        };
        accent?: {
            main: string;
            light: string;
            dark: string;
        };
    }
}

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#0caa41",
            light: "#45c978",
            dark: "#0a8734",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#1861bf",
            light: "#4a8dd9",
            dark: "#134a99",
            contrastText: "#ffffff",
        },
        background: {
            default: "#f3f4f6",
            paper: "#ffffff",
        },
        text: {
            primary: "#2d2d2d",
            secondary: "#6b7280",
        },
        divider: "#e5e7eb",
        border: {
            main: "#d1d5db",
            light: "#e5e7eb",
        },
        accent: {
            main: "#0caa41",
            light: "#d1fae5",
            dark: "#065f2e",
        },
        success: {
            main: "#0caa41",
            light: "#45c978",
            dark: "#0a8734",
        },
        info: {
            main: "#1861bf",
            light: "#4a8dd9",
            dark: "#134a99",
        },
    },
    typography: {
        fontFamily: '"Oswald", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "3rem",
            fontWeight: 700,
            color: "#1f2937",
        },
        h2: {
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#1f2937",
        },
        h3: {
            fontSize: "2rem",
            fontWeight: 600,
            color: "#1f2937",
        },
        h4: {
            fontSize: "1.75rem",
            fontWeight: 600,
            color: "#1f2937",
        },
        h5: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#1f2937",
        },
        h6: {
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#1f2937",
        },
        body1: {
            fontSize: "1rem",
            color: "#4b5563",
        },
        body2: {
            fontSize: "0.875rem",
            color: "#6b7280",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    padding: "10px 24px",
                },
                contained: {
                    backgroundColor: "#0caa41",
                    color: "#ffffff",
                    boxShadow: "none",
                    "&:hover": {
                        backgroundColor: "#0a8734",
                        boxShadow: "0 2px 8px rgba(12, 170, 65, 0.3)",
                    },
                },
                outlined: {
                    borderColor: "#0caa41",
                    color: "#0caa41",
                    borderWidth: "2px",
                    "&:hover": {
                        borderColor: "#0a8734",
                        backgroundColor: "rgba(12, 170, 65, 0.08)",
                        borderWidth: "2px",
                    },
                },
                text: {
                    color: "#0caa41",
                    "&:hover": {
                        backgroundColor: "rgba(12, 170, 65, 0.08)",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
                },
                elevation1: {
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
                },
                elevation2: {
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                },
                elevation3: {
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        transform: "translateY(-2px)",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: "6px",
                    fontWeight: 500,
                },
                filled: {
                    backgroundColor: "#d1fae5",
                    color: "#065f2e",
                    "&:hover": {
                        backgroundColor: "#a7f3d0",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0caa41",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0caa41",
                            borderWidth: "2px",
                        },
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "#0caa41",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                        textDecoration: "underline",
                        color: "#0a8734",
                    },
                },
            },
        },
    },
    shape: {
        borderRadius: 8,
    },
});
