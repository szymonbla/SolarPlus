import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useLazyGetAllFarmsQuery } from "redux/api/v1/farm";

import { DashboardTable } from "./DashboardTable";
import SolarFarmIcon from "common/images/solarFarm.svg";
import { DashboardItem, DashboardItemProps } from "./DashboardItem";
import { FarmModelI } from "types";
import { GridSelectionModel } from "@mui/x-data-grid";

export const DashboardComponent = () => {
  const [allFarms, setAllFarms] = useState<FarmModelI[]>([]);
  const [fetchSolarFarmsTrigger, { data }] = useLazyGetAllFarmsQuery();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const fetchAllSolarFarms = useCallback(async () => {
    const response = await fetchSolarFarmsTrigger("");
    response.data && setAllFarms(response.data);
  }, [fetchSolarFarmsTrigger]);

  useEffect(() => {
    fetchAllSolarFarms();
  }, [fetchAllSolarFarms, data, selectionModel]);

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
      <DashboardTable
        rows={allFarms}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
      <Link href={`/farms/${selectionModel[0]}`}>
        <Button>Open details</Button>
      </Link>
    </Grid>
  );
};
