import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGetAllFarmsQuery } from "redux/api/v1/farm";
import { useAppDispatch } from "redux/hooks";
import { openModal } from "redux/reducers";

export const DashboardComponent = () => {
  const dispatch = useAppDispatch();

  const openCreationFarmModal = () => {
    dispatch(openModal());
  };
  const { data, isSuccess } = useGetAllFarmsQuery("");

  useEffect(() => {
    if (isSuccess) {
      console.log(data[0].farmName);
    }
  }, [data, isSuccess]);

  return (
    <Grid>
      <Typography>Dashboard</Typography>
    </Grid>
  );
};
