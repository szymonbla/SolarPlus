import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGetAllFarmsQuery } from "redux/api/v1/farm";
import { DashboardItem, DashboardItemProps } from "./DashboardItem";
import SolarFarmIcon from "common/images/solarFarm.svg";

export const DashboardComponent = () => {
  const { data, isSuccess } = useGetAllFarmsQuery("");

  useEffect(() => {
    if (isSuccess) {
      console.log(data[0].farmName);
    }
  }, [data, isSuccess]);

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
    >
      <Typography variant="h3" fontWeight="600">
        Dashboard
      </Typography>
      <Grid display="flex" alignItems="center" gap={4}>
        {dashboardItems.map((item, index) => (
          <DashboardItem {...item} key={index} />
        ))}
      </Grid>
    </Grid>
  );
};
