import { Grid, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface DashboardTileLayouttProps {
  children?: ReactNode;
  sx?: SxProps;
}

export const DashboardTileLayout = ({
  children,
  sx,
}: DashboardTileLayouttProps) => {
  return (
    <Grid
      sx={{
        position: "relative",
        borderRadius: 3,
        backgroundColor: "common.white",
        p: "2rem",
        boxShadow: "-3px 9px 11px 1px rgba(238, 238, 247, 1);",
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
};
