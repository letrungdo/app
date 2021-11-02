import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const hxStyle = {
    fontFamily: "Rubik, sans-serif",
    margin: "2rem 0",
    fontWeight: 700,
};
// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#FF4C60",
        },
        secondary: {
            main: "#333333",
        },
        text: {
            primary: "#1a1a1a",
            secondary: "#666666",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#fff",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorDefault: { backgroundColor: "#f5f0e7" },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    minHeight: "auto",
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    "&:focus": {
                        backgroundColor: "unset",
                    },
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    "&.Mui-focusVisible": {
                        backgroundColor: "unset",
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    outline: 0,
                    transition: "all 0.3s ease-in-out",
                    textDecoration: "none",
                    color: "var(--main-color)",
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltipPlacementBottom: {
                    marginTop: "0 !important",
                },
            },
        },
    },
    typography: {
        htmlFontSize: 10,
        fontSize: 16,
        fontFamily: [
            "Rubik",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "Oxygen",
            "Ubuntu",
            "Cantarell",
            "Fira Sans",
            "Droid Sans",
            "Helvetica Neue",
            "sans-serif",
        ].join(","),
        button: {
            textTransform: "none",
        },
        h1: {
            ...hxStyle,
            fontSize: "3.6rem",
        },
        h2: {
            ...hxStyle,
            fontSize: "2.8rem",
        },
        h3: {
            ...hxStyle,
            fontSize: "2.4rem",
        },
        h4: {
            ...hxStyle,
            fontSize: "1.8rem",
            fontWeight: 500,
        },
    },
});

export default theme;
