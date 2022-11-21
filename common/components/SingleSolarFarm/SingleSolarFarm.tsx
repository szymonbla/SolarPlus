import { Grid, Typography } from "@mui/material";
import { useLazyGetFarmByIdQuery } from "redux/api/v1/farm";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { LoadingSpinner } from "../Loading";
import { InputConfiguration } from "./InputConfiguration";
import { selectFarmState, setFarmConfiguration } from "redux/reducers";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export const SingleSolarFarm = () => {
  const { query, isReady } = useRouter();
  const [fetchFarmByIdTrigger] = useLazyGetFarmByIdQuery();
  const farmAttributes = useAppSelector(selectFarmState);
  const dispatch = useAppDispatch();

  const fetchFarmById = useCallback(async () => {
    const { farmId } = query;
    if (!isReady) {
      return;
    }
    const response = await fetchFarmByIdTrigger(Number(farmId));
    if (response.data) {
      const {
        farmName,
        location: { latitude, longitude },
        pvPanel: { loss, peakPower },
      } = response.data;
      dispatch(
        setFarmConfiguration({
          farmName,
          location: { latitude, longitude },
          pvPanel: { loss, peakPower },
        })
      );
    }
  }, [dispatch, fetchFarmByIdTrigger, isReady, query]);

  useEffect(() => {
    fetchFarmById();
  }, [fetchFarmById]);

  return (
    <Grid sx={{ p: "4rem" }}>
      {!query.farmId ? (
        <LoadingSpinner />
      ) : (
        <>
          <Typography variant="h1">{farmAttributes.farmName}</Typography>
          <InputConfiguration
            isReadOnly={true}
            farmAttributes={farmAttributes}
          />
        </>
      )}
    </Grid>
  );
};
