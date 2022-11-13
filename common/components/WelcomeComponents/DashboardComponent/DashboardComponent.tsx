import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useGetAllFarmsQuery } from "redux/api/v1/farm";

import { DashboardTable } from "./DashboardTable";
import SolarFarmIcon from "common/images/solarFarm.svg";
import { DashboardItem, DashboardItemProps } from "./DashboardItem";

export const DashboardComponent = () => {
  const { data, isSuccess } = useGetAllFarmsQuery("");

  const dashboardItems: DashboardItemProps[] = [
    { icon: SolarFarmIcon, subtitle: "Amount of solar farms", value: "0" },
    {
      icon: SolarFarmIcon,
      subtitle: "Your solar farms",
      value: data?.length ?? 0,
      isAddingAvailable: true,
    },
    { icon: SolarFarmIcon, subtitle: "Amount of solar farms", value: "0" },
    { icon: SolarFarmIcon, subtitle: "Amount of solar farms", value: "0" },
  ];

  return (
    <Grid
      display="flex"
      flexDirection="column"
      sx={{ height: "100%", p: "4rem" }}
      gap={2}
    >
      <Typography variant="h3" fontWeight="600">
        Dashboard
      </Typography>
      <Grid display="flex" alignItems="center" gap={4}>
        {dashboardItems.map((item, index) => (
          <DashboardItem {...item} key={index} />
        ))}
      </Grid>
      <DashboardTable rows={isSuccess ? data : []} />
    </Grid>
  );
};
