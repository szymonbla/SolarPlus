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
      black: "#1A1A1A",
      white: "#FFFFFF",
    },
    success: {
      main: "#008929",
    },
    warning: {
      main: "#F98600",
    },
    error: {
      main: "#DA0027",
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
    },
    divider: "#dcfaff",
    secondary: {
      main: "#FD79A1",
    },
    text: {
      primary: "#FFFFFF",
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
