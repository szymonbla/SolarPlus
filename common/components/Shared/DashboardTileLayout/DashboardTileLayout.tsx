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
        p: "2rem",
        backgroundColor: "common.white",
        boxShadow: "-3px 15px 11px 1px rgba(238, 238, 247, 1);",
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
};
