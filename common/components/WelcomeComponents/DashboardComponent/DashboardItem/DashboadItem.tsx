import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { DashboardTileLayout } from "common/components/Shared";

export interface DashboardItemProps {
  icon: string;
  value: number;
  title: string;
  subtitle?: string;
  unit?: string;
}

export const DashboardItem = ({
  icon,
  value,
  title,
  subtitle,
  unit,
}: DashboardItemProps) => {
  return (
    <DashboardTileLayout
      sx={{
        height: "100%",
        width: "50%",
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography variant="h6" fontWeight="600">
          {title}
        </Typography>
        <Image src={icon} width={60} height={60} alt="icon" />
      </Grid>
      <Grid display="flex" alignItems="center" gap={1}>
        <Typography variant="h4" fontWeight="900">
          {value}
        </Typography>
        {unit && <Typography variant="subtitle2">{unit}</Typography>}
      </Grid>
      {subtitle && <Typography variant="subtitle2">{subtitle}</Typography>}
    </DashboardTileLayout>
  );
};
