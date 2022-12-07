import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import {
  useLazyGetAllFarmsQuery,
  useLazyGetSummarizedFarmsResultsQuery,
} from "redux/api/v1/farm";
import { GridSelectionModel } from "@mui/x-data-grid";

import { DashboardTable } from "./DashboardTable";
import SolarFarmIcon from "common/images/solarFarm.svg";
import { DashboardItem, DashboardItemProps } from "./DashboardItem";
import { FarmModelI } from "types";

export const DashboardComponent = () => {
  const [allFarms, setAllFarms] = useState<FarmModelI[]>([]);
  const [fetchSolarFarmsTrigger, { data }] = useLazyGetAllFarmsQuery();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [
    fetchSummarizedFarmsResultsTrigger,
    { data: summarizedData, isSuccess },
  ] = useLazyGetSummarizedFarmsResultsQuery();

  const fetchAllSolarFarms = useCallback(async () => {
    const response = await fetchSolarFarmsTrigger("");
    response.data && setAllFarms(response.data);
  }, [fetchSolarFarmsTrigger]);

  const fetchSummarizedFarmsResults = useCallback(async () => {
    await fetchSummarizedFarmsResultsTrigger("");
  }, [fetchSummarizedFarmsResultsTrigger]);

  useEffect(() => {
    fetchAllSolarFarms();
    fetchSummarizedFarmsResults();
  }, [fetchAllSolarFarms, fetchSummarizedFarmsResults]);

  const dashboardItems: DashboardItemProps[] = [
    {
      icon: SolarFarmIcon,
      subtitle: "averagePVProduction",
      value: summarizedData?.averagePVProduction ?? 0,
    },
    {
      icon: SolarFarmIcon,
      subtitle: "Your solar farms",
      value: summarizedData?.amountOfFarms ?? 0,
      isAddingAvailable: true,
    },
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
