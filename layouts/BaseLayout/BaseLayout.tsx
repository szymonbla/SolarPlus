import { ReactNode } from "react";
import { Grid, SxProps } from "@mui/material";

interface BaseLayoutProps {
  children?: ReactNode;
  sx?: SxProps;
}

export const BaseLayout = ({ children, sx }: BaseLayoutProps) => {
  return (
    <Grid sx={{ width: "100vw", height: "100vh", margin: 0, ...sx }}>
      {children}
    </Grid>
  );
};
