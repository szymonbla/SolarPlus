import { createTheme } from "@mui/material/styles";

const customHeaderFontSize = (fontSize: number) => ({
  fontSize,
  lineHeight: 1.1,
});

const customBodyFontSize = (fontSize: number) => ({
  fontSize,
  lineHeight: 1.4,
});

export const theme = createTheme({
  palette: {
    common: {
      black: "#161618",
      white: "#FFFFFF",
    },
    success: {
      main: "#008929",
    },
    info: {
      main: "#006ED4",
      "300": "#006ED475",
    },
    warning: {
      main: "#F98600",
      "300": "#F9860075",
    },
    error: {
      main: "#DA0027",
      "300": "#DA002775",
    },
    background: {
      default: "#1C1C3A",
    },
    action: {
      hover: "#FB8500",
      active: "#FFB703",
    },
    primary: {
      main: "#5661FF",
      "300": "#5661FF75",
    },
    divider: "#dcfaff",
    secondary: {
      main: "#FD79A1",
      "300": "#FD79A175",
    },
    text: {
      primary: "#161618",
    },
    grey: {
      800: "#454749",
      600: "#636363",
      200: "#F7F7F7",
    },
  },
  typography: {
    fontFamily: ["Nunito Sans", "Helvetica", '"Open Sans"', "sans-serif"].join(
      ","
    ),
    h1: customHeaderFontSize(58),
    h2: customHeaderFontSize(48),
    h3: customHeaderFontSize(42),
    h4: customHeaderFontSize(32),
    h5: customHeaderFontSize(24),
    h6: customHeaderFontSize(20),

    subtitle2: customBodyFontSize(18),

    body1: customBodyFontSize(20),
    body2: customBodyFontSize(18),
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          "& .MuiDialogActions-root": {
            "& .MuiButton-root": {
              color: "#001858",
            },
          },
        },
      },
    },
  },
});

theme.typography.h1 = {
  ...customHeaderFontSize(58),
  [theme.breakpoints.down("md")]: {
    ...customHeaderFontSize(48),
  },
};
