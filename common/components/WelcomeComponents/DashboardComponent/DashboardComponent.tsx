import { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useLazyGetAllFarmsQuery } from "redux/api/v1/farm";
import { useLazyGetTotalEnergyQuery } from "redux/api/v1/energy";

import { DashboardTable } from "./DashboardTable";
import SolarFarmIcon from "common/images/solarFarm.svg";
import { DashboardItem, DashboardItemProps } from "./DashboardItem";
import { FarmModelI } from "types";

export const DashboardComponent = () => {
  const [allFarms, setAllFarms] = useState<FarmModelI[]>([]);
  const [fetchSolarFarmsTrigger, { data }] = useLazyGetAllFarmsQuery();
  const [requestData] = useLazyGetTotalEnergyQuery();

  const fetchAllSolarFarms = useCallback(async () => {
    const response = await fetchSolarFarmsTrigger("");
    response.data && setAllFarms(response.data);
  }, [fetchSolarFarmsTrigger]);

  useEffect(() => {
    fetchAllSolarFarms();
  }, [fetchAllSolarFarms, data]);

  const dashboardItems: DashboardItemProps[] = [
    { icon: SolarFarmIcon, subtitle: "Amount of solar farms", value: "0" },
    {
      icon: SolarFarmIcon,
      subtitle: "Your solar farms",
      value: allFarms?.length ?? 0,
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
      <DashboardTable rows={allFarms} />
    </Grid>
  );
};
