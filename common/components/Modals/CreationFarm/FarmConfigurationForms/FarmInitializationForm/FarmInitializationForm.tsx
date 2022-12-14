import { useCallback } from "react";
import { Grid, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  setFarmConfiguration,
  selectFarmState,
  nextStep,
} from "redux/reducers";

import {
  FarmInitializationData,
  farmInitializationSchema,
} from "common/components/Modals/farmformTypes";
import { FormInputField } from "common/components/Form";

interface FarmInitializationFormProps {
  formId: string;
}

export const FarmInitializationForm = ({
  formId,
}: FarmInitializationFormProps) => {
  const dispatch = useAppDispatch();
  const actualState = useAppSelector(selectFarmState);

  const formMethods = useForm<FarmInitializationData>({
    mode: "onChange",
    resolver: zodResolver(farmInitializationSchema),
    defaultValues: {
      farmName: "",
      latitude: "",
      longitude: "",
    },
    reValidateMode: "onChange",
  });

  const handleSubmit = useCallback(
    ({ farmName, latitude, longitude }: FarmInitializationData) => {
      dispatch(
        setFarmConfiguration({
          ...actualState,
          farmName,
          location: {
            latitude: latitude,
            longitude: longitude,
          },
        })
      );
      dispatch(nextStep());
    },
    [actualState, dispatch]
  );

  return (
    <Grid sx={{ width: "100%" }}>
      <FormProvider {...formMethods}>
        <form id={formId} onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <Grid display="flex" flexDirection="column" gap={4}>
            <FormInputField
              label="Farm name"
              name="farmName"
              type="text"
              sx={{ width: "100%" }}
            />
            <Typography variant="h5" fontWeight="600" color="common.black">
              Localization
            </Typography>
            <Grid display="flex" gap={2}>
              <FormInputField label="Latitude" name="latitude" type="text" />
              <FormInputField label="Longitude" name="longitude" type="text" />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};
